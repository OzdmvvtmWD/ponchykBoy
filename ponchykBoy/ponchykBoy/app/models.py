from django.db import models

class Product(models.Model):

    name = models.CharField(max_length=255)
    cost = models.FloatField()

    units = models.FloatField()
    weight = models.FloatField()
    description = models.TextField()
    numbers_of_product = models.IntegerField()

    create_date = models.DateField(auto_now_add = True)
    update_date = models.DateField(auto_now = True)

    category = models.ForeignKey("Category",on_delete=models.PROTECT,null=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name