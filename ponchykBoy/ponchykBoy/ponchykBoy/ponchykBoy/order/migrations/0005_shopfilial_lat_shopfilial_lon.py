# Generated by Django 5.1.6 on 2025-04-24 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0004_alter_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='shopfilial',
            name='lat',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='shopfilial',
            name='lon',
            field=models.FloatField(null=True),
        ),
    ]
