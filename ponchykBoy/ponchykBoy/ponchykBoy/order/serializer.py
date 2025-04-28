import time 
from rest_framework import serializers
from .models import Order,OrderItem,ShopFilial

class OrderSerializer(serializers.ModelSerializer):

    # user = serializers.HiddenField(default=None)
    
    class Meta:
        model = Order
        fields = ['shop','email','phone_number','name','surname','order_date','is_paid','user']

class ShopAdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopFilial
        fields = '__all__'