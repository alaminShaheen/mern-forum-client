# MERN forum client

MERN forum client is the cleint side application of the MERN forum website. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
For styling, [reactstrap](https://reactstrap.github.io/) and [styled components](https://styled-components.com/) was used. JWT token authentication and refresh was implemented using [Axios](https://github.com/axios/axios) interceptors.

## Features used in this Repo

This Project is a Simple ReactJS Project which uses the following features
1. Entire project done using Typescript
2. Unprotected and protected routing with react-router-dom and auth guards
3. Making protected HTTP calls using axios and axios interceptors 
4. Using Bootstrap along with React

## Live Application URL

The Application is deployed in https://6140306ffb01644416880cb7--mern-forum-askme.netlify.app/


## Available User Interactions

The following user interactions are available in the app:

1. Users can sign up for an account
2. Users can login with the created account
3. Users can ask a question when they are logged in
4. Users can reply to their own or somebody else's question when they are logged in

## Cloning and Running the Application in local

**IMPORTANT NOTE - Please run the [MERN forum server](https://github.com/BlueGhost12/mern-forum-server) locally first before running this application.**
All server configs required for this app can be found in this project under [this](https://github.com/BlueGhost12/mern-forum-client/blob/main/src/Config/config.ts) directory.

Clone the project into local

Go into the project folder and type the following command to install necessary packages and dependencies. 

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000** by default



