from django.contrib import admin

from .models import Profile, Workout, ExerciseType, ExerciseCategory, Exercise

# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    list_display = ["user", "height", "weight"]

class WorkoutAdmin(admin.ModelAdmin):
    model = Workout
    list_display = ["name", "date", "duration"]

class ExerciseCategoryAdmin(admin.ModelAdmin):
    model = ExerciseCategory
    list_display = ["name"]

class ExerciseTypeAdmin(admin.ModelAdmin):
    model = ExerciseType
    list_display = ["name", "reps", "weights", "duration", "distance", "elevation", "category", "image"]

class ExerciseAdmin(admin.ModelAdmin):
    model = Exercise

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Workout, WorkoutAdmin)
admin.site.register(ExerciseCategory, ExerciseCategoryAdmin)
admin.site.register(ExerciseType, ExerciseTypeAdmin)
admin.site.register(Exercise, ExerciseAdmin)
