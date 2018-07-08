# Property management CRUD app

## Tech stack
### Backend
- Nodejs
- Express
- Mysql with Sequelize

### Frontend
- React
- Redux
- `redux-form`
- `rc-table`
- Other supporting libraries in React/Redux ecosystem.

## Architecture
Uses Web-Api architecture pattern.
Express app is used to handle API calls and serve static frontend files.
This approach is extandable, maintainable due to the nature of technologies and patterns used, however, it is not the most simple solution.

## Functionality
### API
Endoints:
- post `/${version}/properties` - creates a new property
- get `/${version}/properties` - returns a list of all properties
- patch `/${version}/properties/:id` - patches a single property
- get `/${version}/properties/:id` - returns a single property
- delete `/${version}/properties/:id` - deletes a single property (does not delete history data)
- get `/${version}/properties/:id/history` - returns history data of a property

Endpoints have business rules validated using `express-validator`.
Logic was split into files (layers):
- `routes.js` - handles route registering, applying validation rules and providing controller reference to the routes
- `./controllers/*` - contains controller logic. Handles response statuses, API to Model mappings and calls to `managers/*`
- `./managers/`*` - contains business logic and I/O handling (AirBnB validation, DB calls)

This design is followed in order to provide a foundation for a (potentally) mid-sized application. In theory (and practice :) ) it should scale.

### Frontend
- Property `CRUD`
- View history data of a property

Frontend components are stored in `./client/components` folder. Folders are split by business functionality (tables, forms etc.).

## Running the app
Prerequisites:
- Mysql
- Node 8+

- Install dependencies:
```
npm i
cd client && npm i
```
- Run the app:
Set env vars (or pass them to the node process)
```
DATABASE_USERNAME
DATABASE_PASSWORD
DATABASE_HOSTNAME
DATABASE_NAME
NODE_ENV
```
Run the server: `node app.js`.