from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, viewsets,status
from rest_framework.response import Response

from app.models import Product
from .serializer import CartSerializer
from .cart import Cart

class CartView(APIView):
    def get(self, request):
        cart = Cart(request)
        return Response(cart.get_all())
    
    def post(self, request):

        serializer = CartSerializer(data = request.data)

        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            number = serializer.validated_data['number']
            is_update_num = serializer.validated_data['is_update_num']

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response({"error": "Product dont found"}, status=status.HTTP_404_NOT_FOUND)

            cart = Cart(request)
            cart.add(product=product, number=number, is_update_num=is_update_num)

            return Response({"message": "Product succesfully added in cart"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        cart = Cart(request)
        try:
            cart.clear()
        except Exception:
            return Response({"error": "Dont deleted"})

        return Response({"message": "cart succesfully deleted"})
    



