from django.urls import path

from .views import Historys, HistoryAuthorization, HistoryBan


urlpatterns = [
    path('', Historys.as_view()),
    path('authorization/', HistoryAuthorization.as_view()),
    path('ban/<int:history_id>', HistoryBan.as_view()),
]
