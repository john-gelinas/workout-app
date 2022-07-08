from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    height = models.DecimalField
    weight = models.DecimalField

class Workout(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField
    duration = models.DurationField

class ExerciseCategory(models.Model):
    name = models.CharField(max_length=100)

class ExerciseType(models.Model):
    name = models.CharField(max_length=100)
    repsincluded = models.BooleanField
    weightsincluded = models.BooleanField
    durationincluded = models.BooleanField
    distanceincluded = models.BooleanField
    elevationincluded = models.BooleanField
    category = models.ForeignKey(ExerciseCategory, related_name='exercise_type', null=True, on_delete=models.SET_NULL)
    image = models.URLField(blank=True)

class Exercise(models.model):
    exercisetype = models.ForeignKey(ExerciseType, related_name='exercise', null=True, on_delete=models.SET_NULL)
    reps = models.IntegerField
    weight = models.DecimalField
    duration = models.DurationField
    distance = models.DecimalField
    elevation = models.DecimalField
    workout = models.ForeignKey(Workout, related_name='exercise')
    user = models.ForeignKey(User, related_name='exercise')
    assisted = models.BooleanField