from rest_framework import viewsets,status
from rest_framework.response import Response
from .models import OrderItem,Order,ShopFilial,Status
from .serializer import OrderSerializer,ShopAdressSerializer,StatusSerializer
from .permission import IsOwnerOrCreateOnly
from .celery_tasks import order_created
from cart.cart import Cart
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly




class OrderViewSet(viewsets.ModelViewSet):

    permission_classes = [IsOwnerOrCreateOnly]

    # queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Order.objects.filter(user=user)
        return Order.objects.none()
     

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

    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = ShopFilial.objects.all()
    serializer_class = ShopAdressSerializer


class StatusViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    