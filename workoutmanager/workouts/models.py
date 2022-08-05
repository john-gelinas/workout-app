from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    height = models.DecimalField(decimal_places=1, max_digits=7)
    weight = models.DecimalField(decimal_places=1, max_digits=7)
    def __str__(self):
        return self.user.username

class Workout(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField()
    duration = models.DurationField(blank=True, null=True)
    def __str__(self):
        return self.name

class ExerciseCategory(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class ExerciseType(models.Model):
    name = models.CharField(max_length=100, unique=False)
    reps = models.BooleanField(default=False)
    weight = models.BooleanField(default=False)
    duration = models.BooleanField(default=False)
    distance = models.BooleanField(default=False)
    elevation = models.BooleanField(default=False)
    category = models.ForeignKey(ExerciseCategory, related_name='exercise_type', null=True, on_delete=models.SET_NULL)
    image = models.URLField(blank=True)
    def __str__(self):
        return self.name + " (" + self.category.name + ")"
    class Meta:
        unique_together = ['name', 'category']

class Exercise(models.Model):
    exercisetype = models.ForeignKey(ExerciseType, related_name='exercise', null=True, on_delete=models.SET_NULL)
    date = models.DateTimeField(default=datetime.now)
    reps = models.IntegerField(blank=True, null=True)
    weight = models.DecimalField(decimal_places=1, max_digits=7, blank=True, null=True)
    duration = models.DurationField(blank=True, null=True)
    distance = models.DecimalField(decimal_places=1, max_digits=7, blank=True, null=True)
    elevation = models.IntegerField(blank=True, null=True)
    workout = models.ForeignKey(Workout, related_name='exercise', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='exercise', on_delete=models.CASCADE)
    assisted = models.BooleanField(default=False)
    def __str__(self):
        return self.exercisetype.name + str(self.pk)
