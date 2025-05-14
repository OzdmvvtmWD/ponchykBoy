from django.urls import path,include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('product',views.ProductViewSet, basename = "product")
router.register('categories',views.CategoryViewSet, basename = "categories")
router.register('tags',views.TagViewSet, basename = "tags")

urlpatterns = [
    path('', include(router.urls)),
    # path('', include(router.urls)),

]
