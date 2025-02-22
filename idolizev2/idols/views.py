from rest_framework import generics, viewsets, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Idol
from .serializers import IdolSerializer, UserRegistrationSerializer

class IdolListCreateView(viewsets.ModelViewSet):
    queryset = Idol.objects.all()
    serializer_class = IdolSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['idol_name', 'nickname', 'birthplace', 'zodiac']

class IdolDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Idol.objects.all()
    serializer_class = IdolSerializer

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)