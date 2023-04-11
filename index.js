const { ApolloServer } = require("apollo-server");
// const mongoose = require("mongoose");
// const MONGODB = "mongodb+srv://dbUser:dbUser@cluster0.5xwhbin.mongodb.net/test";
const connect = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
connect();

// mongoose
//   .connect(MONGODB, { useNewUrlParser: true })
//   .then(() => {
//     console.log("db connected");
return server
  .listen({
    port: 5000,
  })
  .then((res) => {
    console.log(`server is running on ${res.url}`);
  });
