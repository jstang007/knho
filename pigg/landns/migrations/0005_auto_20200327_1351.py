# Generated by Django 2.0 on 2020-03-27 13:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('landns', '0004_auto_20200327_1237'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ldns',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authorization.User'),
        ),
    ]
