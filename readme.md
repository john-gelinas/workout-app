This application leverages the Django python framework to host a workout website in two main appllications. 

The first is the backend, which holds the models for the workouts, exercises, users, and other data tables needed for saving data and authenticating users. This backend uses the Django Rest Framework (DRF) to expose several APIs, allowing the frontend to gain access to the user's workout and exercise data. Additionally, Django Rest Knox provides token authentication upon user login. This authentication is superior to standard DRF tokens as mulitple tokens can be generated per user, tokens are encrypted, and tokens can be set to expire.

The second is the ReactJS frontend, which is transpiled using Webpack and Babel, also hosted as a separate app as a single page frontend application on the Django project. This React app is created primarily through Material UI components for a consistent and recognizable style. The global state is managed through Redux, and more specifically, the modern Redux Toolkit. While this application may not be of a large enough size or complexity to warrant a state-management framework, it was still a great learning opportunity that made global state simple to manage (dark mode for example) as well as easy to write but robust API calls with RTK Query. In hindsight, writing the frontend in Typescript would have been a great choice, but thankfully as a sole developer on this project I did not run into too many type issues.

Other features:
   - Private routes with "from page" redirect
   - Light / Dark mode button in footer
   - Dynamic navbar
   - Click-away listeners on UI elements (e.g. new workout, delete confirmations)
   - Collapsable exercise categories in workout

## Example Video
![Workout App Demonstration](/workoutAppDemo.gif)

### Future features:
- Accessibility links for skipping to main content
- Accessibility text for more components
- Personal Records Page:
    - List personal records for each lift and exercise
    - Graph progress over time in each exercise
    - Set goals and plan workouts
- Profile page with other health information / goals
- Edit exercises in workout
- Mobile-friendly exercise display

# To run site locally
## Dev Server
Assumes node and npm are installed
### Terminal to install python and node dependencies:
`pip install -r requirements.txt`

`npm install`

to ensure you also install the dev dependencies, you can add the flag `--production=false`

`npm run dev`

### New Terminal For Django Hot Reload:
`python manage.py livereload`

### New Terminal to Run Django Server:
`python manage.py runserver`


## Build
### Terminal:
`npm run build`

### New Terminal:
`python manage.py runserver`


## Tutorials and Documentation used
Redux API queries using Redux Toolkit an RTK Query
https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#refreshing-cached-data

Webpack configuration, React/Django integration steps
https://www.youtube.com/watch?v=Uyei2iDA4Hs&list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60&index=2

Development Server: live reload
https://github.com/tjwalch/django-livereload-server

Three Dot Spinner
https://github.com/n3r4zzurr0/svg-spinners/blob/main/svg/3-dots-bounce.svg?short_path=6bfc532

Associate User with New data
https://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/

Dynamic Queryset in Model ViewSet
https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset

Serializers (incl. Write only fields, serializer validation)
https://www.django-rest-framework.org/api-guide/serializers/#modelserializer

Knox Token authentication boilerplate:
https://www.youtube.com/watch?v=0d7cIfiydAc&list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60&index=7
https://github.com/bradtraversy/lead_manager_react_django

Private Routes in React Router v6:
https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

React Router Login Redirect
https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx

Navbar and Styling via Material UI
https://mui.com

## TODO:
- PRs api calls and logic
- Improved alert system - manage alerts via redux
- Display PRs in current workouts
- Profile page
- Edit exercise set
- Make exercise cards / tables mobile friendly
