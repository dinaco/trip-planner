# Irontrip Planner

<br>

## Description

App to help you schedule your trips in details with a calendar view and maps.

<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to log in and sign up, if I am logged in, this will redirect to my profile
- **sign up** - As a user I want to sign up on the web page so that I can work on planning my trips (store and plan them)
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **trip list** - As a user I want to see the list of my trips (past and upcoming trips) and delete them.
- **edit user** - As a user I want to be able to edit my profile and password (bonus: profile picture)
- **trip list** - As a user, in a form I can select the city and dates of my trip (as well as accomodation place <-bonus) and save it in my trip portfolio. I can see my other trips as cards if any.
  Once pressed "create trip", I am then rerouted to the "trip details page".
- **trip details page**: As a user I can see a map centered on the accomodation place in the city of my trip. I can use a search bar to find venues that I want to visit. Once I select a place it will zoom in to the place, drop a marker, open an info window and I am able to save this place in my trip.
  By default the day is the first day of the trip unless I click on other dates available below the map.
  Once I saved some venus it will be saved in the specific date of that trip.

Bonus:

-**directions walking distance (km & time)**:
Compute the distances between all the activities and display it to the user with some messages with suggestions. -**trip overview**:
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
  firstName: String,
  lastName: String,
  email: {type:String, unique:true},
  profileImage: {type:String, default:'tbd'}
  passwordHash: String,
  trips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }],
}

```

Trip model

```javascript
{
  cityName: String,
  cityId: String,
  startDate: Date.
  endDate: Date,
  location: {
    type: { type: String },
    coordinates: [Number],
  },

}

```

Trip details model (one Trip details element per day per trip)

```javascript
{
  tripId: [{ type: Schema.Types.ObjectId, ref: 'Trip' }],
  activityDate: Date,
  activities : [{name: String, location: {
    type: { type: String },
    coordinates: [Number],
  },}]

}

```

<br>

## API's

For the profile pic we will use cloudinary.

For this project we are using a range of google APIs:

- google maps
- geolocation
- autocomplete
- directions

We plan to use the rest countries API for hte overview page.
<br>

## Packages

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
