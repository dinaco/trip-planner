# [Irontrip Planner](https://ih-tripplanner.cyclic.app/)

<br>

## Description

This project is our second project for the Ironhack Bootcamp, realized in week 6.
<br> In a few words, our project is an app to help you schedule your trips in details where you can add activities for each day of the trip on the chosen city that you want to visit including a map that calculates the routes with distance and duration.

<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to log in and sign up, if I am logged in, this will redirect to the "My Trips" page
- **sign up** - As a user I want to sign up on the web page so that I can work on planning my trips (store and plan them)
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **edit user** - As a user I want to be able to edit your profile picture and delete your own account.
- **trip list** - As a user, a list of my trips (past and upcoming trips) that I can add activities ordelete them if there is any. There's a form I can select the city and dates of my trip as well as accomodation and save it in my trip portfolio.
- **trip details page**: As a user I can see a map centered on chosen city and there's going to be an custom icon showing the accomodation location. I can use a search bar to find venues that I want to visit. Once I select a place it will zoom in to the place, drop a marker, open an info window with a few details of it and I am able to save this place in my trip.I can save activities for each day of the trip and the app will route your activities and display how long (time/distance) its going to take to visit all these places.
  By default the day is the first day of the trip unless I click on other dates available below the map.
  Once I saved some venues it will be saved in the specific date of that trip.

<br>

## Server Routes (Back-end):

| **Method** | **Route**                    | **Description**                                               | Request - Body                                           |
| ---------- | ---------------------------- | ------------------------------------------------------------- | -------------------------------------------------------- | --- | --- |
| `GET`      | `/`                          | Main page route. Renders home `index` view with a login form. |                                                          |     |     |
| `POST`     | `/login`                     | Sends Login form data to the server.                          | { email, password }                                      |
| `GET`      | `/signup`                    | Renders `signup` form view.                                   |                                                          |
| `POST`     | `/signup`                    | Sends Sign Up info to the server and creates user in the DB.  | { email, password }                                      |
| `GET`      | `/profile`                   | Private route. Renders `profile` view.                        |                                                          |
| `PUT`      | `/profile/edit`              | Private route. Updates usere profile picture.                 | { email, password, [firstName], [lastName], [imageUrl] } |
| `DELETE`   | `/profile/delete`            | Private route. Deletes user account.                          |
| `GET`      | `/trips`                     | Private route. Render the `trips` view.                       |                                                          |
| `POST`     | `/trips`                     | Private route. Adds a new trip.                               | {tbd}                                                    |     |
| `DELETE`   | `/trips`                     | Private route. Deletes chosen trip.                           |
| `GET`      | `/trips/trip-details`        | Private route. Render the `trip-details` view.                |                                                          |
| `POST`     | `/trips/trip-details`        | Private route. Adds a new activity to the trip.               | {tbd}                                                    |
| `DELETE`   | `/trips/trip-details/delete` | Private route. Can delete an activity.                        |

## Models

User model

```javascript
{
    firstName: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    lastName: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    email: { type: String, unique: true },

    profileImage: {
      type: String,
      default:
        "https://res.cloudinary.com/dinaco/image/upload/v1652452983/trip-planner-project/no-pic_d1kqun.jpg",
    },
    passwordHash: { type: String },

    trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }

```

Trip model

```javascript
  {
    cityName: { type: String, required: true },
    startDate: { type: Date, required: true },
    formatStartDate: String,
    endDate: { type: Date, required: true },
    formatEndDate: String,
    accomodation: {
      name: { type: String },
      type: { type: String },
      coordinates: [Number],
    },
    cityLocation: {
      type: { type: String },
      coordinates: [Number],
    },
    photoUrl: { type: String },
    days: [{ type: Schema.Types.ObjectId, ref: "Day" }],
  },
  {
    timestamps: true,
  }

```

Day model

```javascript
  {
    date: { type: Date, required: true },
    formatDate: String,
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
  },
  {
    timestamps: true,
  }

```

Activity model

```javascript
 name: String,
  date: Date,
  formatDate: String,
  location: {
    type: { type: String },
    coordinates: [Number],
  }

```

<br>

## API's

For the profile picture we will use cloudinary.

For this project we are using a range of google APIs:

- maps javascript API
- directions API
- places API

<br>

## Packages

we are using:

- moment
- multer-storage-cloudinary
- multer

<br>

## Backlog

[See the Trello board.](https://trello.com/b/jGq8LQpx/project-2-chloe-and-dino)

<br>

## Links

### Live version

[Deploy Link](https://ih-tripplanner.cyclic.app/)

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/dinaco/trip-planner)

<br>

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1DhmMazw1mIWSqo6f-XONlO3093hvUjTPUwPq8enHHGs/edit?usp=sharing)

### Contributors

Developement:

Dino Marchiori - [`<dinaco>`](https://github.com/dinaco) - [`<linkedin - Dino`](https://www.linkedin.com/in/dino-marchiori/)

Chloé Faurie- [`<chloe4E>`](https://github.com/chloe4E) - [`<linkedin - Chloé>`](https://www.linkedin.com/in/chlo%C3%A9-faurie/)
