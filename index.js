const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
let todayAddedTasks = [];
let workAddedTasks = [];
let state = 0;
const d = new Date();
const day = d.getDay();
const month = d.getMonth();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDay = days[day];

const currentDate = d.getDate();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentMonth = months[month];

const currentYear = d.getFullYear();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  state = 0;
  res.render("today.ejs", {
    state: state,
    day: currentDay,
    date: currentDate,
    month: currentMonth,
    year: currentYear,
  });
  todayAddedTasks = [];
  workAddedTasks = [];
});

app.get("/today", (req, res) => {
  state = 0;
  res.render("today.ejs", {
    state: state,
    day: currentDay,
    date: currentDate,
    month: currentMonth,
    year: currentYear,
    todayTasks: todayAddedTasks,
  });
});

app.get("/work", (req, res) => {
  state = 1;
  res.render("work.ejs", {
    state: state,
    day: currentDay,
    date: currentDate,
    month: currentMonth,
    year: currentYear,
    workTasks: workAddedTasks,
  });
});

app.post("/today", (req, res) => {
  todayAddedTasks.push(req.body.newTask);

  res.render("today.ejs", {
    state: state,
    day: currentDay,
    date: currentDate,
    month: currentMonth,
    year: currentYear,
    todayTasks: todayAddedTasks,
  });
});

app.post("/work", (req, res) => {
  workAddedTasks.push(req.body.newTask);

  res.render("work.ejs", {
    state: state,
    day: currentDay,
    date: currentDate,
    month: currentMonth,
    year: currentYear,
    workTasks: workAddedTasks,
  });
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
