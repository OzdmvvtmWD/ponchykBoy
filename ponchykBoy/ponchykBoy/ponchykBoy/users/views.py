from djoser.views import UserViewSet
from rest_framework.response import Response
from django.shortcuts import redirect

class ActivateUser(UserViewSet):
    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
 
        kwargs['data'] = {"uid": self.kwargs['uid'], "token": self.kwargs['token']}
 
        return serializer_class(*args, **kwargs)
 
    def activation(self, request, uid, token, *args, **kwargs):
        super().activation(request, *args, **kwargs)
        frontend_url = f"http://127.0.0.1:5173/activation-success/{uid}/{token}"
        return redirect(frontend_url)