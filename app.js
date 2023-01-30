console.log("Web serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express(); // expressning objectini ushlab olish uchun
const http = require("http");
const fs = require("fs");
const router = require("./router");
const router_bssr = require("./router_bssr");

const session = require("express-session");
const MongoDBSore = require("connect-mongodb-session")(session);
const store = new MongoDBSore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// 1 Kirish
app.use(express.static("public"));
app.use(express.static(__dirname + "public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2 - Session code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, //for 30 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// 3 - Views code
app.set("views", "views");
app.set("view engine", "ejs");

//routing code
app.use("/resto", router_bssr); //ananaviy usul yani ejs orqali
app.use("/", router); //modern or single page uslul ya'ni React JS

module.exports = app;
