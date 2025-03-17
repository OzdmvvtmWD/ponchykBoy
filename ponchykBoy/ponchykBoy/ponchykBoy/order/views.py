from django.forms import ValidationError
from django.shortcuts import render
# from rest_framework.permissions import IsAuthenticated
import phonenumbers
from rest_framework import viewsets,status
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
from rest_framework.response import Response
from .models import OrderItem,Order
from .serializer import OrderSerializer
from .permission import IsOwnerOrReadOnly
from .celery_tasks import order_created
from cart.cart import Cart



def phone_validator(region,number):
    message = ("Enter a valid phone number.")
    code = "invalid"

    try:
        z = phonenumbers.parse(number, region)
                
    except phonenumbers.phonenumberutil.NumberParseException as e:
        raise ValidationError(message, code=code, params={"value": {"region":region,"number":number}})

    if not phonenumbers.is_valid_number(z) or not phonenumbers.is_possible_number(z):
        raise ValidationError(message, code=code, params={"value": {"region":region,"number":number}})
    
    return phonenumbers.format_number(z, phonenumbers.PhoneNumberFormat.E164)


class OrderViewSet(viewsets.ModelViewSet):

    permission_classes = [IsOwnerOrReadOnly]

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
    