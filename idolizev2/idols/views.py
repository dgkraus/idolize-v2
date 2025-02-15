from rest_framework import generics, viewsets, filters
from .models import Idol
from .serializers import IdolSerializer

class IdolListCreateView(viewsets.ModelViewSet):
    queryset = Idol.objects.all()
    serializer_class = IdolSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['idol_name', 'nickname', 'birthplace', 'zodiac']

class IdolDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Idol.objects.all()
    serializer_class = IdolSerializer