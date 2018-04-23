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

## Routing Layer
The core functionality of an API backend is to listen to routes and serve corresponding API responses.  However,



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
