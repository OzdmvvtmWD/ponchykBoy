from django.forms import ValidationError
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
# from rest_framework.permissions import BasePermission,SAFE_METHODS
from rest_framework import viewsets,status
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
from rest_framework.response import Response
from .models import OrderItem,Order,ShopFilial
from .serializer import OrderSerializer,ShopAdressSerializer
from .permission import IsOwnerOrReadOnly
from .celery_tasks import order_created
from cart.cart import Cart




class OrderViewSet(viewsets.ModelViewSet):

    permission_classes = [IsOwnerOrReadOnly,IsAuthenticated]

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        cart = Cart(request)

        if cart.is_empty():
            return Response({"error": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        order_serializer = self.serializer_class(data=request.data)

        if request.user.is_authenticated:
            order_serializer.initial_data['user'] = request.user.id

        if order_serializer.is_valid(raise_exception=True):
            order = order_serializer.save()

            for item in cart:
                OrderItem.objects.create(
                    order=order,
                    product=item['product'],
                    cost=item['cost'],  
                    number=item['number'],
                )

            cart.clear()
            order_created.delay(order_id = order.id)

            return Response({'message':'Order succesfully created'}, status=status.HTTP_201_CREATED)

        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShopAdressViewSet(viewsets.ModelViewSet):

    permission_classes = [IsOwnerOrReadOnly]

    queryset = ShopFilial.objects.all()
    serializer_class = ShopAdressSerializer

    