from workouts.models import Profile, Workout, ExerciseType, ExerciseCategory, Exercise
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer, WorkoutSerializer, ExerciseSerializer, ExerciseTypeSerializer, ExerciseCategorySerializer

# Viewsets

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfileSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExerciseSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WorkoutSerializer

class ExerciseTypeViewSet(viewsets.ModelViewSet):
    queryset = ExerciseType.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExerciseTypeSerializer

class ExerciseCategoryViewSet(viewsets.ModelViewSet):
    queryset = ExerciseCategory.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExerciseCategorySerializer

