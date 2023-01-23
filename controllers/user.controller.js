const { User } = require("../models/user.model");
const { Wallet } = require("../models/wallet.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../middlewares/sendMail");
const userController = {};

//ESPERAR A QUE SE DECIDAN LOS ENDPOINTS, (HABLAR CON LOS 2 EQUIPOS(?))
//Funciones Hexcode:
function generateHexCode() {
  return crypto.randomBytes(3).toString("hex");
}
function isHexCodeUnique(hex_code) {
  return User.findOne({
    where: { hex_code: hex_code },
  }).then((user) => {
    return user ? false : true;
  });
}

//Controllers:

userController.getAllUsers = async (req, res) => {
  const response = await User.findAll()
    .then((data) => {
      const res = { error: false, data: data };
      return res;
    })
    .catch((error) => {
      const res = { error: true, message: error };
      return res;
    });
  res.json(response);
};

// userController.getAllUsersActive = async (req, res) => {
//   const status = true;
//   const response = await User.findAll({
//       where:{status: status}
//     })
//     .then((data) => {
//       const res = { error: false, data: data };
//       return res;
//     })
//     .catch((error) => {
//       const res = { error: true, message: error };
//       return res;
//     });
//   res.json(response);
// };

userController.getUserByHexCode = async (req, res) => {
  try {
    const { hexCode } = req.params;
    const response = await User.findAll({
      where: { hex_code: hexCode },
    })
      .then((data) => {
        const res = { error: false, data: data };
        return res;
      })
      .catch((error) => {
        const res = { error: true, message: error };
        return res;
      });
    res.json(response);
  } catch (error) {
    console.log(err);
  }
};

userController.createUser = async (req, res) => {
  try {
    const modelData = {
      hex_code: "",
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      image: req.body.image,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      address: req.body.address,
      phone: req.body.phone,
      rol_id: 2,
    };
    let hex_code = generateHexCode();
    isHexCodeUnique(hex_code)
      .then(async (isUnique) => {
        if (isUnique) {
          modelData.hex_code = hex_code;
          const response = await User.create(modelData)
            .then((data) => {
              const res = {
                error: false,
                data: data,
                message: "Usuario creado",
              };
              return res;
            })
            .catch((error) => {
              const res = { error: true, message: error };
              return res;
            });

          const walletData = {
            hexacode_user: modelData.hex_code,
          };
          const aux = await Wallet.create(walletData)
            .then((data) => {
              const res = {
                error: false,
                data: data,
                message: "Billetera creada",
              };
              return res;
            })
            .catch((error) => {
              const res = { error: true, message: error };
              return res;
            });
          sendMail(req, res);
          res.json({ user: response, wallet: aux });
        } else {
          hex_code = generateHexCode();
          return isHexCodeUnique(hex_code);
        }
      })
      .then(() => {
        console.log("Usuario creado con exito");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

userController.deleteUserByHexCode = async (req, res) => {
  try {
    const { hexCode } = req.params;
    const deleteWallet = await Wallet.destroy({
      where: { hexacode_user: hexCode },
    })
      .then((data) => {
        const res = {
          error: false,
          message: "Wallet dada de baja",
        };
        return res;
      })
      .catch((err) => {
        const res = { error: true, message: err };
        return res;
      });
    const response = await User.destroy({
      where: { hex_code: hexCode },
    })
      .then((data) => {
        const res = {
          error: false,
          message: "Usuario dado de baja",
        };
        return res;
      })
      .catch((err) => {
        const res = { error: true, message: err };
        return res;
      });
    res.status(200).json({ user: response, wallet: deleteWallet });
  } catch (error) {
    console.log(error);
  }
};

userController.verifyAccount = async (req, res) => {
  try {
    const { email } = req.params;
    const response = await User.update(
      { verified_user: true },
      {
        where: { email: email },
      }
    )
      .then((data) => {
        const res = { error: false, data: data, message: "Usuario verificado" };
        return res;
      })
      .catch((err) => {
        const res = { error: true, message: err };
        return res;
      });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

userController.updateUserByHexCode = async (req, res) => {
  try {
    const { hexCode } = req.params;
    const modelData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      image: req.body.image,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone
    };
    if (req.body.password) {
      modelData = {
        ...modelData,
        ...{ password: bcrypt.hashSync(req.body.password, 10) },
      };
    }
    const response = await User.update(modelData, {
      where: { hex_code: hexCode },
    })
      .then((data) => {
        const res = {
          error: false,
          data: data,
          message: "Usuario actualizado",
        };
        return res;
      })
      .catch((err) => {
        const res = { error: true, message: err };
        return res;
      });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

userController.logInUser = async (req, res) => {
  try {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res.status(401).send({
          message: "El usuario o la contraseña no existe",
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ message: "El usuario o la contraseña no existe" });
      }
      const tokenAccess = jwt.sign(
        {
          hex_code: user.hex_code,
        },
        process.env.TOKENJSW,
        {
          expiresIn: 86400,
        }
      );
      user.token = tokenAccess;
      res.status(200).send({
        user,
        tokenAccess,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

userController.sendRecoverMail = async (req, res) => {
  try {
    if (req.body.link) {
      sendMail(
        req,
        res,
        `<p>Para recuperar la contraseña ingresa a: <a href=${req.body.link}>recuperar contraseña<a><p>`
      );
      res.json({ message: "Correo enviado" });
    } else {
      res.status(400).json("No hay un link ingresado");
    }
  } catch (error) {
    console.log(error);
  }
};

userController.recoverPassword = async (req, res) => {
  try {
    const { email } = req.params;

    const modelData = {
      password: bcrypt.hashSync(req.body.password, 10),
    };
    const response = await User.update(modelData, {
      where: { email: email },
    })
      .then((data) => {
        const res = { error: false, data: data };
        return res;
      })
      .catch((error) => {
        const res = {
          error: true,
          error: error,
          messsage: "Ah ocurrido un error al ingresar la nueva contraseña",
        };
        return res;
      });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
module.exports = userController;
