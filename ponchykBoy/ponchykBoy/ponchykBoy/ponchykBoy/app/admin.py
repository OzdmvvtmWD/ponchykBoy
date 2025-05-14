from django import forms
from django.contrib import admin
from .models import Product,Category,Tag


class ProductAdmin(admin.ModelAdmin):

  filter_horizontal = ('tags',)
  list_display = ("name", "cost","category", "create_date","update_date",)

class CategoryAdmin(admin.ModelAdmin):
  list_display = ("name", )

class TagAdmin(admin.ModelAdmin):
  list_display = ("name", )

admin.site.register(Product,ProductAdmin )
admin.site.register(Category,CategoryAdmin)
admin.site.register(Tag,TagAdmin)
