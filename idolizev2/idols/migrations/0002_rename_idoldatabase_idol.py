# Generated by Django 5.1.6 on 2025-02-15 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('idols', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='IdolDatabase',
            new_name='Idol',
        ),
    ]
