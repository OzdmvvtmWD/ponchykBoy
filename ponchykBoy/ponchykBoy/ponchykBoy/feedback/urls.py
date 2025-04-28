from django.urls import path,include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('feedbacks',views.FeedbackViewSet, basename = "feedbacks")

urlpatterns = [
    path('', include(router.urls)),

]
