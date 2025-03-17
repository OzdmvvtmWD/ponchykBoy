from django.db import models

from app.models import Product
from users.models import CustomUser


class ShopFilial(models.Model):
    adress = models.CharField(max_length=255)

class Order(models.Model):

    shop = models.ForeignKey('ShopFilial',on_delete=models.PROTECT, null=False,related_name='shop')
    
    email = models.EmailField(max_length=255)
    phone_number = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    order_date = models.DateTimeField()

    is_paid = models.BooleanField(default=False)

    user = models.ForeignKey(CustomUser,related_name='orders',on_delete=models.PROTECT,null=True)

    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items',on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items',on_delete=models.PROTECT)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    number = models.PositiveIntegerField(default=1)


    def get_cost(self):
        return self.cost * self.number