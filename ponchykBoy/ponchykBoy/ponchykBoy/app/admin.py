from django.contrib import admin
from .models import Product,Category


class ProductAdmin(admin.ModelAdmin):
  list_display = ("name", "cost","category", "create_date","update_date",)
#   prepopulated_fields = {"slug": ("name",)}

class CategoryAdmin(admin.ModelAdmin):
  list_display = ("name", )
#   prepopulated_fields = {"slug": ("name" ,)}

admin.site.register(Product,ProductAdmin )
admin.site.register(Category,CategoryAdmin)