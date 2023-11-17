from django.urls import path
from .views import item_list, item_detail, item_create, item_update, item_delete

urlpatterns = [
    path('items/', item_list, name='item_list'),
    path('items/<int:pk>/', item_detail, name='item_detail'),
    path('items/create/', item_create, name='item_create'),
    path('items/update/<int:pk>/', item_update, name='item_update'),
    path('items/delete/<int:pk>/', item_delete, name='item_delete'),
]
