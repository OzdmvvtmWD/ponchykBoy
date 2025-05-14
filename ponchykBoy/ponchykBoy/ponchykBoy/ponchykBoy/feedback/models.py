from django.db import models

from users.models import CustomUser

class Feedback(models.Model):
    
    email = models.EmailField(max_length=255)
    phone_number = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    rating = models.IntegerField(default=0)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(CustomUser,related_name='feedback',on_delete=models.PROTECT,null=True)

  