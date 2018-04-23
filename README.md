# Phoenix Parts Backend API Server

## Motivation for Startup
To provide a centralized API Server for the Phoenix Parts Angular Application.  Phoenix Parts is a centralized Parts Management Server specifically designed for managing the lifecycle of a FIRST robot.

The main objectives for the Phoenix Parts Backend are:

1.  Team Login System
  A full registration system and user profile allows an administrator to oversee the progress of each teammate. Team members are also able to communicate in real time with each other. Also, this system integrates directly into Slack, the team's primary form of communication.
  
2.  Parts Management System
  This is the core functionality of the application, where the details for a robot part are stored. Details include: Part Status, Raw Materials, and Machine availability.

3.  Resource Utilization
  This is a side function of the application, where resource availabilities (materials, machines, etc...) can be viewed and allocated to maximize resource Utilization and decrease resource downtime.

## Overall Software Architecture (Node.js Backend)
The Node.js server is built with Composabilitity and Modularity in mind.  The overarching goal is to design a server as a composition of logically separated modules.  The rest of this readme will be focused around explaining the rationale for the separation of concerns chosen.

## General Module Architecture
As one of the main priorities is designing with Modularity in mind, a standardized module structure was deemed necessary.  

Inspiration was taken from Angular's Style of Dependency Injection, whereby a module's specific implementation should be abstracted away from any of it's consumers.  More details about can be found at the link: https://goo.gl/8sL2u5.  Research led to three different ways do modularize a javascript codebase without typescript support.  The three options ar summarized by Krzysztof Sztompka in the Stack Overflow article: https://goo.gl/9N6Hpm.

Due to cleanliness, a modularization system was chosen to work as follows.

```javascript
// Module.js
module.exports = function(app) {
  // app represents Express.js server.  Thus, perform all related work in this module.
};
```

Once the module is created, it is then incorporated into the top-level application in the following manner.
```javascript
var moduleName = require('<./path/to/module>');
moduleName(app);
```

That's it!  With one line of code, the module is incorporated into the main application.  This method of modularity proved to be the cleanest implementation, and thus is the standard for use in this application.

## Routing Module

The core functionality of an API backend is to listen to routes and serve corresponding API responses.  Two primary areas of concern are important to the routing layer:

1.  Control of route endpoint names
2.  Implementation of correct route behavior

While most Express.js tutorials combine these two listed goals into one file, a cleaner implementation was suggested by: https://goo.gl/eB7dmZ, which splits these into two further modularized concepts.

The Routing module is designed as follows:

```javascript
// user.route.js
module.exports = function(app) {

	app.route('/login')
		.post(usersController.authenticateUser);
	app.route('/register')
		.post(usersController.registerUser);
	app.route('/me')
		.post(auth, usersController.me);
};
```

As you can see, the top level of this module provides a very clean implementation of the routing logic, with specific functional implementation given over to the controller.  This provides for a very clean and intuitive routing implementation.  It is then the responsibility of the controller to handle database calls and forming the API response.  One route module is created per resource entity, as dictated by business logic (ie: Users, Parts, Machines, etc...).

## Mongdb Module

### Background
Integral to the functioning of this application is a persistant database.  When deciding on a way to persist data, there are many choices to be made.  The highest-level choice is between Relational databases(RDBs) and Non-relational databases.  While this is a large topic in it's own right, two primary ways to start the choice process is by modeling the data interaction via an [Entity-Relationship model(ER)](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model).  This helps to arrive at a solid understanding of the data being stored, and is a great place to start.

//TODO: Add my ER model here.

While an ER model is formally used for relational databases, due to connections in the ER diagram translating directly to primary/foreign keys in the RDBs, it is also very convenient even if a non-relational database is chosen.  This is because, there are two ways for a Non-relational database to be implemented.  In fact, a proper implementation of a non-relational database can have both types of implementations: Embedded vs. Reference.  A full coverage of the advantages/tradeoffs of each can be found in this [Microsoft Talk](https://goo.gl/grasnP).

In my project, I made the decision to use the Non-relational database known as MongoDb.  My choice of using MongoDb is for the added flexibility that MongoDb provides a developer in data-modeling.  There is a big misconception that MongoDb is `Schema-less`.  While it is true that, at the database layer, MongoDb does not enforce a particular schema, it is a best-practice for a developer to enforce a schema at the application-layer.  This ensures consistency across documents in a collection.

To achieve this, a widely popular Object Document Modeling npm package known as [Mongoose](http://mongoosejs.com/) is used.

### MongoDb Module Implementation

Again, the same Module implementation is used, as detailed in the above section.

//TODO: Create reference link to the above section.


Below is the architecture of the backend system that I designed, coded, and deployed to support the engineering efforts.  Much effort was made to establish a clear separation of concerns as well as establishing modularity to make scaling and future expansions at the database layer trivial.
<img src="https://github.com/adamgarcia4/Take-Sessions-GraphQL-Server/blob/adamgarcia4-patch-1/systemDesign.jpg?raw=true" alt="alt text" width="700">

## Database Layer
For technical and cost reasons, a decision was made to utilize two databases.  Therefore, a need arose to develop database abstractions.

### DynamoDB (https://goo.gl/qF57Lu)
Leveraged Facebook's DataLoader node.js module to front the DynamoDB layer by adding smart Batching & Caching techniques.
The Caching Layer proved valuable so as to deliver data quickly without having to expend a round-trip request to AWS.

The database was designed to be a fully Promise-based solution.  This further abstracted async complexities.  I designed the CRUD functionalities as the application implementation required.

### MongoDB (https://goo.gl/9jvtQR)
Created MongoDB wrapper to obscure any low-level API database calls.  Also, this database wrapper complies to a promise implementation.

## Technology Used

    "apollo-server": "^0.3.2",
    "aws-sdk": "^2.6.6",
    "bluebird": "^3.4.6",
    "body-parser": "^1.15.2",
    "cors": "^2.8.1",
    "dataloader": "^1.2.0",
    "dotenv": "^2.0.0",
    "express": "^4.14.0",
    "express-graphql": "^0.5.4",
    "graphql": "^0.7.1",
    "graphql-tools": "^0.7.2",
    "lodash": "^4.16.4",
    "mongoose": "^4.6.5",
    "node-uuid": "^1.4.7"


- Backend
  - Node.js Programming Language
  - Express.js Web Application Framework
- Frontend
  - Jquery for Single Page Application functionality
  - Bootstrap CSS framework

## Technologies
- NodeJS/ Express JS backend
- Handlebars Templating
- Passport.js User Authentication
- Socket.io Session Handling for real-time chatroom online status
- AWS S3 storage for all media uploads
- Speechmatics API usage for Conversation analysis
- Heroku hosting

https://12factor.net/config
https://stackoverflow.com/questions/18880142/access-app-variable-inside-of-expressjs-connectjs-middleware
https://expressjs.com/en/guide/writing-middleware.html
https://stackoverflow.com/questions/34468395/express-call-a-middleware-from-another-middleware



https://www.npmjs.com/package/performant-array-to-tree
https://stackoverflow.com/questions/22367711/construct-hierarchy-tree-from-flat-list-with-parent-field
https://stackoverflow.com/questions/6232753/convert-delimited-string-into-hierarchical-json-with-jquery
https://gist.github.com/lineus/99c9e574fdefc2c84b932b6e949c7c8e


https://docs.mongodb.com/ecosystem/use-cases/storing-comments/
http://blog.ijasoneverett.com/2013/11/getting-started-with-mongoose-and-node-js-a-sample-comments-system/
https://www.mongodb.com/blog/post/thinking-documents-part-1?jmp=docs&_ga=2.218000982.134088568.1521985698-1047311511.1521985698

https://docs.mongodb.com/ecosystem/use-cases/storing-comments/
https://stackoverflow.com/questions/46019926/updating-slug-with-mongoose-presave

https://stackoverflow.com/questions/3923015/remove-leading-comma-from-a-string



This is how I set up my JWT auth system:
https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
