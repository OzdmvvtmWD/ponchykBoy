from rest_framework import serializers
from .models import Order,OrderItem,ShopFilial,Status

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    class Meta:
        model = OrderItem
        fields = ['id', 'order','product','product_name', 'cost', 'number']

class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True, required=False)

    class Meta:
        model = Order
        fields = ['id','shop','email','phone_number','name','surname','order_date','user','items']

    def create(self, validated_data):
        if 'order_status' not in validated_data or validated_data['order_status'] is None:
            status_obj, created = Status.objects.get_or_create(name="Formed")
            validated_data['order_status'] = status_obj
        return super().create(validated_data)

class ShopAdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopFilial
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'
