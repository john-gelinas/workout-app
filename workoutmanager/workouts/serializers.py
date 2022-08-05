from rest_framework import serializers
from workouts.models import Profile, Workout, ExerciseType, ExerciseCategory, Exercise

# Serializers


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'


class ExerciseTypeSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category', allow_null=True)

    class Meta:
        model = ExerciseType
        fields = '__all__'


class ExerciseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseCategory
        fields = '__all__'


class ExerciseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source='exercisetype.category.name', allow_null=True)
    type = serializers.CharField(
        source='exercisetype.name', allow_null=True)
    type_reps = serializers.BooleanField(
        source='exercisetype.reps', allow_null=True)
    type_weight = serializers.BooleanField(
        source='exercisetype.weight', allow_null=True)
    type_duration = serializers.BooleanField(
        source='exercisetype.duration', allow_null=True)
    type_distance = serializers.BooleanField(
        source='exercisetype.distance', allow_null=True)
    type_elevation = serializers.BooleanField(
        source='exercisetype.elevation', allow_null=True)
    type_image = serializers.BooleanField(
        source='exercisetype.image', allow_null=True)

    class Meta:
        model = Exercise
        fields = '__all__'
