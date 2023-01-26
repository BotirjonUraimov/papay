console.log("Web serverni boshlash");
const express = require("express");
const res = require("express/lib/response");
const app = express(); // expressning objectini ushlab olish uchun
const http = require("http");
const fs = require("fs");
const router = require("./router");

// 1 Kirish
app.use(express.static("public"));
app.use(express.static(__dirname + "public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2 - Session code

// 3 - Views code
app.set("views", "views");
app.set("view engine", "ejs");

//routing code
//app.use("/resto", router_bssr); //ananaviy usul yani ejs orqali
app.use("/", router); //modern or single page uslul ya'ni React JS

module.exports = app;
