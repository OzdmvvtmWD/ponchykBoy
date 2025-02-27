from django.shortcuts import render
from rest_framework import  viewsets
from .models import Product
from .serializer import ProductSerializer
from .permissions import IsAdminUserOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUserOrReadOnly]