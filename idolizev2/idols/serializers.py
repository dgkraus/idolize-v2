from rest_framework import serializers
from .models import Idol

class IdolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idol
        fields = '__all__'