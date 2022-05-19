const Users = require("../models/users");



exports.signup = async (req, res) => {
  let user = await Users.findOne(
    {
      email: req.body.data.email,
    },
    {
      password: 0,
      security: 0,
    }
  );
  if (user) {
    res.send({
      data: "user already exist",
    });
  } else {
    let newUser = Users({
      name: req.body.data.name,
      email: req.body.data.email,
      password: req.body.data.pass,
      profilePicUrl: "",
      gender: req.body.data.gender,
      country: "",
      dob: req.body.data.date,
      phoneNo: req.body.data.mobile,
      temporaryKey: "",
      points: 0,
    });
    newUser.save((err, resp) => {
      if (err) {
        res.send({
          error: "Something wrong happened please try again later",
        });
      } else {
        res.send({
          data: "user Registration Successfull",
        });
      }
    });
  }
};
