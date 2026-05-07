const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://USERNAME:PASSWORD@cluster0.ouonehn.mongodb.net/collegeDB?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  email: String
});

// Model
const Student = mongoose.model("Student", studentSchema);

// POST API
app.post("/students", async (req, res) => {

  const student = new Student(req.body);

  const savedStudent = await student.save();

  res.json(savedStudent);
});

// GET API
app.get("/students", async (req, res) => {

  const students = await Student.find();

  res.json(students);
});

// PUT API using BODY
app.put("/students", async (req, res) => {

  const updatedStudent = await Student.findOneAndUpdate(
    { email: req.body.email },
    {
      name: req.body.name,
      course: req.body.course
    },
    { new: true }
  );

  res.json(updatedStudent);
});

// DELETE API using BODY
app.delete("/students", async (req, res) => {

  const deletedStudent = await Student.findOneAndDelete({
    email: req.body.email
  });

  res.json(deletedStudent);
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});








// docker run -d -p 27017:27017 --name mongodb mongo

// mongodb://admin:password@localhost:27017

// version: '3'

// services:
//   mongodb:
//     image: mongo
//     container_name: mongodb
//     ports:
//       - "27017:27017"
//     environment:
//       MONGO_INITDB_ROOT_USERNAME: admin
//       MONGO_INITDB_ROOT_PASSWORD: password
//     volumes:
//       - mongo-data:/data/db

// volumes:
//   mongo-data:
