from django.shortcuts import render
from rest_framework import  viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Product, Category
from .serializer import ProductSerializer, CategorySerializer
from .permissions import IsAdminUserOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):

    # queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        if not pk:
            return Product.objects.all()
        
        else:
            return Product.objects.filter(pk=pk)
        
    @action(detail=False, methods=['get'], url_path='category-products')
    def category_products(self, request):
        category_id = request.query_params.get('category', None)
        
        if category_id:
            products = Product.objects.filter(category__id=category_id)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "Category parameter is required."}, status=status.HTTP_400_BAD_REQUEST)




