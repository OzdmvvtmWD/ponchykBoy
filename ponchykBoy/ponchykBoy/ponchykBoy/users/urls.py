from django import urls
from django.urls import include,path

from . import views


urlpatterns = [
    path('accounts/activate/<uid>/<token>', views.ActivateUser.as_view({'get': 'activation'}), name='activation'),
]