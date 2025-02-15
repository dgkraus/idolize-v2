from django.urls import path
from .views import IdolListCreateView, IdolDetailView

urlpatterns = [
    path('idols/', IdolListCreateView.as_view({"get": "list"}), name='idol-list'),
    path('idols/<int:pk>/', IdolDetailView.as_view(), name='idol-detail'),
]