require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workout");

const app = express();

//middleware
app.use(express.json()); //to get access to a request body
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen to request
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db &listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

//go to server.js and add a dev data- "dev": "nodemon server.js then you can now run npm run dev"
