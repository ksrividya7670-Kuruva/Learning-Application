from django.urls import path
from . import views

urlpatterns = [
    path('health', views.health, name='health'),
    path('auth/register', views.register, name='register'),
    path('auth/login', views.login_view, name='login'),
    path('courses', views.courses_list, name='courses'),
    path('courses/<str:course_name>', views.course_detail, name='course_detail'),
    path('courses/<str:course_name>/notes', views.course_notes, name='course_notes'),
    path('courses/<str:course_name>/certificate', views.course_certificate, name='course_certificate'),
    path('progress', views.save_progress, name='progress'),
    path('progress/<str:course_name>', views.progress_detail, name='progress_detail'),
    path('certificates/verify/<str:cert_id>', views.verify_certificate_detail, name='verify_certificate_detail'),
    path('code/run', views.execute_code_backend, name='execute_code_backend'),
    path('stats/live', views.live_system_stats, name='live_system_stats'),
    path('subscribe', views.subscribe, name='subscribe'),
]
