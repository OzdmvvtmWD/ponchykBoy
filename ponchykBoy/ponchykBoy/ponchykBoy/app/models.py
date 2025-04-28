from django.db import models

def upload_to(instance, filename):
    return f'image/{filename}'

class Product(models.Model):

    name = models.CharField(max_length=255)
    image = models.ImageField(blank= True,upload_to=upload_to)
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    units = models.IntegerField()
    calories = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    numbers_of_product = models.PositiveIntegerField()
    numbers_of_product_reservate = models.PositiveIntegerField(default=0)

    available = models.BooleanField(default=True)

    create_date = models.DateField(auto_now_add = True)
    update_date = models.DateField(auto_now = True)

    category = models.ForeignKey("Category", on_delete=models.PROTECT, null=False, related_name='product')
    # slug = models.SlugField(default="", null=False)

    


    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True, db_index=True)
    # slug = models.SlugField(default="", null=False, unique=True ,db_index=True)


    def __str__(self):
        return self.name