from django.shortcuts import render
from rest_framework import  viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Product, Category, Tag
from .serializer import ProductSerializer, CategorySerializer, TagSerializer
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

            for product in serializer.data:
                if 'image' in product and product['image']:
                    product['image'] = request.build_absolute_uri(product['image'])

            return Response(serializer.data)
        else:
            return Response({"detail": "Category parameter is required."}, status=status.HTTP_400_BAD_REQUEST)



class CategoryViewSet(viewsets.ModelViewSet):
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]


class TagViewSet(viewsets.ModelViewSet):
    
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    @action(detail=False, methods=['get'], url_path='category-tag')
    def category_products(self, request):
        category_id = request.query_params.get('category', None)
        
        if category_id:
            products = Tag.objects.filter(category__id=category_id)
            serializer = TagSerializer(products, many=True)

            return Response(serializer.data)
        else:
            return Response({"detail": "Category parameter is required."}, status=status.HTTP_400_BAD_REQUEST)