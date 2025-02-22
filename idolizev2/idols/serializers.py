from rest_framework import serializers
from .models import Idol
from django.contrib.auth import get_user_model

class IdolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idol
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = get_user_model().obects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user