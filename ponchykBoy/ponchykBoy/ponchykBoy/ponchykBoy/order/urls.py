from django.urls import path,include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('orders',views.OrderViewSet, basename = 'orders')
router.register('shops',views.ShopAdressViewSet)

urlpatterns = [
    path('', include(router.urls))
]
