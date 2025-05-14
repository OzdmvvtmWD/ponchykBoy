from rest_framework import serializers
from .models import Order,OrderItem,ShopFilial

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    class Meta:
        model = OrderItem
        fields = ['id', 'order','product','product_name', 'cost', 'number']

class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = ['id','shop','email','phone_number','name','surname','order_date','is_paid','user','items']

class ShopAdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopFilial
        fields = '__all__'
