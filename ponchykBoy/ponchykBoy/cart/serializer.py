from rest_framework import serializers

class CartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField() 
    number = serializers.IntegerField(required=False,default = 1) 
    is_update_num = serializers.BooleanField(required=False, default=False) 