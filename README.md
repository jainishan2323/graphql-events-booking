# Events Booking App - Using GraphQL MERN stack

An event booking app leveraging GraphQL, MongoDB, React and NodeJS

## Getting Started
Backend can be deployed using `now` command. Which leverages [zeit](https://zeit.co/).

### Prerequisites
Project requirements

```
1. NodeJS
2. MongoDB and Mongoose
3. React
4. Apollo client and server
5. GraphQL
6. Webpack
7. Typescript
```

### Installing

A step by step series of examples that tell you how to get a development env running

#### Server
You need not start server. Server is deployed [here](https://server.jainishan2323.now.sh). In case you want to start server run following commands.

```
npm i
npm run watch
```
Server will start running at port `http://localhost:4000/graphql`
#### Client
In order to start client, go to client folder and run.
```
npm i
npm start
```
Server will start running at prot `http://localhost:8080` by default.

## Connecting the Database
- In case you want to connect the local server. Go to `client/src/index.tsx` and change the uri to local.
- Add your DB config by overriding `env` const in `server/index.js`.

Current DB in use is Cloud Atlas by [MongoDb](https://cloud.mongodb.com/)


## Deployment

Server can be deployed using `now` command. You can modify `serevr/now.json` accordingly.

## Built With

* [GraphQL](https://graphql.org/) - Query Language for API
* [Apollo](https://www.apollographql.com/) - GraphQL Server and Client for e2e Graphql.
* [React](https://reactjs.org/) - React JS for client
* [Typescript](https://www.typescriptlang.org/) - Typescript
* [Webpack](https://webpack.js.org/) - for client build

## Authors

* **Ishan Jain**  - [jainishan2323](https://github.com/jainishan2323)
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Special thanks to [FreeCodeCamp](https://www.youtube.com/watch?v=ed8SzALpx1Q&t=101s) for a wonderful tutorial on GraphQL
