from django.urls import path

from .views import *

urlpatterns = [

    path('upload/sap/', upload_sap),

    path('upload/utility/', upload_utility),

    path('sync/travel/', sync_travel),

    path('records/', records),

    path('approve/<int:pk>/', approve_record),

    path('reject/<int:pk>/', reject_record),
]
