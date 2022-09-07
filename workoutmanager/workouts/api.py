from workouts.models import Profile, Workout, ExerciseType, ExerciseCategory, Exercise
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer, WorkoutSerializer, ExerciseSerializer, ExerciseTypeSerializer, ExerciseCategorySerializer

# Viewsets

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ProfileSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ExerciseSerializer
    def get_queryset(self):
        user = self.request.user
        return Exercise.objects.filter(user=user)

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = WorkoutSerializer
    def get_queryset(self):
        user = self.request.user
        return Workout.objects.filter(user=user)

class ExerciseTypeViewSet(viewsets.ModelViewSet):
    queryset = ExerciseType.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ExerciseTypeSerializer

class ExerciseCategoryViewSet(viewsets.ModelViewSet):
    queryset = ExerciseCategory.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ExerciseCategorySerializer

