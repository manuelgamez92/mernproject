const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    user = new User(req.body);

    //hasehar password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    await user.save();
    //crear y firmar el json webtoken

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

    // res.status(200).json({ msg: "El usuario se agrego correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error" + error);
  }
};
