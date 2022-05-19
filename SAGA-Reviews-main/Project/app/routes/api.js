const express = require("express");
const app = express();
var fs = require("fs");
const passport = require("passport");
const Users = require("../models/users");
const Comments = require("../models/comments");
const controller = require("../controller/controller");
var jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.get("/", (req, res) => {
  res.send("api works");
});
app.post("/login", (req, res) => {
  let result = Users.findOne(
    {
      email: req.body.data.email,
      password: req.body.data.pass,
    },
    { password: 0 },
    (err, resp) => {
      if (err) {
        res.send({
          data: "",
        });
      } else {
        if (resp == null)
          res.send({
            data: "",
          });
        else {
          var token = jwt.sign({ data: resp }, "MyS3cr3tK3Y", {
            expiresIn: 60480,
          });
          res.send({
            data: resp,
            token: `Bearer ${token}`,
          });
        }
      }
    }
  );
});

app.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    // console.log(req.headers);
    console.log("xyz");
    res.send({ data: "xyzsafd" });
  }
);
app.post("/signup", controller.signup);

app.post("/saveComment", (req, res) => {
  console.log(res);
  console.log(res.body);
  let data = {
    content_id: req.body.content_id,
    name: req.body.name,
    comment: req.body.comment
  }
  new Comments(data).save()
    .then(() => {
      console.log("data saved into db");
    }).catch(err => {
      console.log(err);
    })
})

app.get("/getComments", (req, res) => {
  Comments.find({}, (err, response) => {
    res.send(response);
  });
});

app.post("/saveWatchList", (req, res) => {
  let data = {
    user_id: req.body.user_id,
    content_id: req.body.content_id,
    name: req.body.name,
    title: req.body.title
  }
  new WatchList(data).save()
    .then(() => {
      console.log("data saved into db");
    }).catch(err => {
      console.log(err);
    })
})

app.get("/getWatchList", (req, res) => {
  WatchList.find({}, (err, response) => {
    res.send(response);
  })
})
const request = require('request');
const WatchList = require("../models/watchlist");

module.exports = app;

