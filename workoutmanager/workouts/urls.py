from rest_framework import routers
from .api import ProfileViewSet, WorkoutViewSet, ExerciseViewSet, ExerciseTypeViewSet, ExerciseCategoryViewSet

router = routers.DefaultRouter()

router.register('api/profiles', ProfileViewSet, 'profiles')
router.register('api/workouts', WorkoutViewSet, 'workouts')
router.register('api/exercises', ExerciseViewSet, 'exercises')
router.register('api/exercisetypes', ExerciseTypeViewSet, 'exercisetypes')
router.register('api/exercisecategories', ExerciseCategoryViewSet, 'exercisecategories')

urlpatterns = router.urls