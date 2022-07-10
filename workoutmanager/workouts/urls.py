from rest_framework import routers
from .api import ProfileViewSet, WorkoutViewSet, ExerciseViewSet, ExerciseTypeViewSet, ExerciseCategoryViewSet

router = routers.DefaultRouter()

router.register('profiles', ProfileViewSet, 'profiles')
router.register('workouts', WorkoutViewSet, 'workouts')
router.register('exercises', ExerciseViewSet, 'exercises')
router.register('exercisetypes', ExerciseTypeViewSet, 'exercisetypes')
router.register('exercisecategories', ExerciseCategoryViewSet, 'exercisecategories')

urlpatterns = router.urls