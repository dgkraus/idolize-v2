from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.urls import reverse

User = settings.AUTH_USER_MODEL

class Idol(models.Model):
    idol_name = models.CharField(max_length=50, unique=True)
    nickname = models.CharField(max_length=50)
    birthdate = models.CharField(max_length=50)
    birthplace = models.CharField(max_length=50)
    zodiac = models.CharField(max_length=50)
    height = models.CharField(max_length=50)
    sns = models.JSONField(default=list)
    
    def __str__(self):
        return self.idol_name

class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        profile_id = self.id

        super().save(*args,**kwargs)