from workouts.models import Profile, Workout, ExerciseType, ExerciseCategory, Exercise
from rest_framework import viewsets, permissions
from .serializers import ProfileSerializer, WorkoutSerializer, ExerciseSerializer, ExerciseTypeSerializer, ExerciseCategorySerializer

