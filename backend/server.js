const app = require("./app")
const connectDB =require ("./db/db-connection.js")
require('dotenv').config();


//handling uncaught exceptions
process.on("uncaughtException", (err)=>{ 
    console.log(`Error :${err.message}`);
    console.log(`shutting down he server for handling uncaught exceptionss`);
    server.close(() => {
        process.exit(1); 
      }); 
})    

// Connect Database  
connectDB()

// create server 
const server = app.listen(8000, () => {
    console.log(
      `Server is running on a port no  http://localhost:8000`
    ); 
  }); 

 
  // unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });

