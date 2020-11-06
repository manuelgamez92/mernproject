const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.userAuth = async (req, res) => {

    try{

        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    }catch(error){
        return res.status(500).json({error});

    }

}

exports.authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "The user doesnt exist, try with other email or sign up" });
    }

    const passCorrecto = await bcryptjs.compare(password, user.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    //if email and password are correct
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
      },
    };

    //firmar el jsonwebtoken
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        return res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
