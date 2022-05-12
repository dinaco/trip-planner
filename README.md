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
- **city list** - As a user I want to see the list of my cities (past and upcoming trips in those cities) and delete them.
- **edit user** - As a user I want to be able to edit my profile and password (bonus: profile picture)
- **city homepage** - I can select the city and dates of my trip and save it in my trip portfolio. I am then rerouted to the homepage of the trip.
- **homepage of the trip**: As a user once I save my trip and go on it, I arrive on the landing on the map centered on the city with a search bar on the right side. In the heading it says " trip to city X from X to X".
- **search and results** - As a user I want to be able to search for places in the city where I am going to travel. When the place is found it drops a marker with the info window open asking the user to save the place to the trip todos. The place is saved to the trip. Bonus: we have different markers for different types of activities.
- **calendar vision** - As a User my activities are saved in my calendar, I can change the order and compute the walking distance every day.

<br>

## Server Routes (Back-end):

| **Method** | **Route**                          | **Description**                                                          | Request - Body                                           |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route. Renders home `index` view.                              |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                               |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                                     | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                              |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB.             | { email, password }                                      |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.                         |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                              |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.                 | { name, cuisine, city, }                                 |
| `DELETE`   | `/private/favorites/:restaurantId` | Private route. Deletes the existing favorite from the current user.      |                                                          |
| `GET`      | `/restaurants`                     | Renders `restaurant-list` view.                                          |                                                          |
| `GET`      | `/restaurants/details/:id`         | Renders `restaurant-details` view for the particular restaurant.         |                                                          |

## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  cities: [cities], //tbc
}

```

Trip model

```javascript
{
  userId: ObjectId,
  cityName: String,
  startDate: Date,
  enDate: Date,
  location: [lat, lng]
}

```

Day model

```javascript
{
  tripId: ObjectId,
  duration: 3
  activities: [{placename: museum, location: [lat, lng]}, ]
}

```

<br>

## API's

<br>

## Packages

<br>

## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)

<br>

## Links

### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()

<br>

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors

FirstName LastName - [`<github-username>`](https://github.com/person1-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

FirstName LastName - [`<github-username>`](https://github.com/person2-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)
