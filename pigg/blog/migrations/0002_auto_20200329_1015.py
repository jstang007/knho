# Generated by Django 2.0 on 2020-03-29 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='title',
            field=models.TextField(max_length=128),
        ),
    ]
