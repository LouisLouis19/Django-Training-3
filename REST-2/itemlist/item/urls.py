from rest_framework.routers import DefaultRouter
from .views import ItemViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='item')
urlpatterns = router.urls


# What are my available URLs?
for url in router.urls:
    print(url, '\n')
