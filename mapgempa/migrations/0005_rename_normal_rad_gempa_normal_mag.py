# Generated by Django 3.2.10 on 2022-05-10 09:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mapgempa', '0004_auto_20220510_1633'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gempa',
            old_name='normal_rad',
            new_name='normal_mag',
        ),
    ]
