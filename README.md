# Irontrip Planner

<br>

## Description

This project is our second project for the Ironhack Bootcamp, realized in week 6.
<br> In a few words, our project is an app to help you schedule your trips in details with a calendar view and maps.

<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to log in and sign up, if I am logged in, this will redirect to my profile
- **sign up** - As a user I want to sign up on the web page so that I can work on planning my trips (store and plan them)
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **trip list** - As a user I want to see the list of my trips (past and upcoming trips) and edit/delete them.
- **edit user** - As a user I want to be able to edit my profile
- **trip list** - As a user, in a form I can select the city and dates of my trip (as well as accomodation place <-bonus) and save it in my trip portfolio. I can see my other trips as cards if any.
  Once pressed "create trip", I am then rerouted to the "trip details page".
- **trip details page**: As a user I can see a map centered on the accomodation place in the city of my trip. I can use a search bar to find venues that I want to visit. Once I select a place it will zoom in to the place, drop a marker, open an info window and I am able to save this place in my trip.
  By default the day is the first day of the trip unless I click on other dates available below the map.
  Once I saved some venus it will be saved in the specific date of that trip.

Bonus:

- **directions walking distance (km & time)**:
  Compute the distances between all the activities and display it to the user with some messages with suggestions.
- **trip overview**:
  export to email / calendar and have a nice display of the activities

<br>

## Server Routes (Back-end):

| **Method** | **Route**              | **Description**                                                     | Request - Body                                           |
| ---------- | ---------------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| `GET`      | `/`                    | Main page route. Renders home `index` view.                         |                                                          |
| `GET`      | `/login`               | Renders `login` form view.                                          |                                                          |
| `POST`     | `/login`               | Sends Login form data to the server.                                | { email, password }                                      |
| `GET`      | `/signup`              | Renders `signup` form view.                                         |                                                          |
| `POST`     | `/signup`              | Sends Sign Up info to the server and creates user in the DB.        | { email, password }                                      |
| `GET`      | `/profile`             | Private route. Renders `profile` view.                              |                                                          |
| `PUT`      | `/profile/edit`        | Private route. Sends profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/trips`               | Private route. Render the `trips` view.                             |                                                          |
| `POST`     | `/trips`               | Private route. Adds a new trip.                                     | {tbd}                                                    |
| `PUT`      | `/trips`               | Private route.Can update trip infos.                                |
| `DELETE`   | `/trips`               | Private route. Can update a trip.                                   |
| `GET`      | `/trips/trip-details`  | Private route. Render the `trip-details` view.                      |                                                          |
| `POST`     | `/trips/trip-details`  | Private route. Adds a new details (activity) to the trip.           | {tbd}                                                    |
| `PUT`      | `/trips/trip-details`  | Private route.Can update activity infos.                            |
| `DELETE`   | `/trips/trip-details`  | Private route. Can delete an activity.                              |
| `GET`      | `/trips/trip-overview` | Private route. Render the `trip-overview` view.                     |

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
}

```

Day model

```javascript
{
      date: { type: Date, required: true },
    formatDate: String,
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],

}

```

<br>

## API's

For the profile picture we will use cloudinary.

For this project we are using a range of google APIs:

- google maps
- geolocation
- autocomplete
- directions

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

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/dinaco/trip-planner)

[Deploy Link](https://ironhack-trip-planner.herokuapp.com/)

<br>

### Slides

The url to your presentation slides

[Slides Link]()

### Contributors

Developement:

Dino Marchiori - [`<dinaco>`](https://github.com/dinaco) - [`<linkedin - Dino`](https://www.linkedin.com/in/dino-marchiori/)

Chloé Faurie- [`<chloe4E>`](https://github.com/chloe4E) - [`<linkedin - Chloé>`](https://www.linkedin.com/in/chlo%C3%A9-faurie/)

UI/UX:

Potential collaboration
