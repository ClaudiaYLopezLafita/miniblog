var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/User')
var db = mongoose.connection;
const { body, validationResult } = require('express-validator');

// GET del listado de todos usuarios ordenados por fecha de creación
router.get('/', function(req, res, next) {
  // guion para orden decreciente
  User.find().sort('-creationdate').exec(function(err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});

// GET de un único usuario por su Id. ':' para identificar que es un parámetro
router.get('/:id', function(req, res, next) {
  //debemos de pasarle un parámetro
  User.findById(req.params.id, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(userinfo);
  });
});

// POST de un nuevo usuario
// router.post('/', function(req, res, next) {
//   //REQ.BODY si se le pasan las validaciones antes, es raro que
//   //te devuela un error
//   User.create(req.body, function(err, userinfo) {
//     if (err) res.status(500).send(err);
//     else res.sendStatus(200);
//   });
// });
/**
 * Esto verifica que haya al menos un carácter que no sea una letra, una letra minúscula, 
 * una letra mayúscula, una longitud mínima y que haya letras en la contraseña.
 */
router.post('/',
  // username must be an email
  body('email', 'Escrima un formato email correcto').isEmail(),
  // password must be at least 5 chars long
  body('password', 'La contraseña no es válida')
  .isString()
  .isLength({ min: 8 })
  .not()
  .isLowercase()
  .not()
  .isUppercase()
  .not()
  .isNumeric()
  .not()
  .isAlpha(),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create(req.body, function(err, userinfo) {
          if (err) res.status(500).send(err);
          else res.sendStatus(200);
    });
  },
);

// PUT de un usuario existente identificado por su Id
// si no tiramos de id dejamos vacio '/:id'
router.put('/:id', function(req, res, next) {
  /// dos parámetros, el id y lo que queremos cambiar
  User.findByIdAndUpdate(req.params.id, req.body, function(err,
  userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de un usuario existente identificado por su Id
router.delete('/:id', function(req, res, next) {
  User.findByIdAndDelete(req.params.id, function(err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

//POST para no pasarle en la username y password por la url

// Comprueba si el usuario existe
router.post('/signin', function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) res.status(500).send('¡Error comprobando el usuario!');
    // Si el usuario existe...
    if (user != null) {
    user.comparePassword(req.body.password, function(err,
    isMatch) {
    if (err) return next(err);
    // Si el password es correcto...
    if (isMatch)
      res.status(200).send({ message: 'ok', role:
      user.role, id: user._id });
    else
      res.status(200).send({ message: 'la password no coincide' });
    });
    } else res.status(401).send({ message: 'usuario no registrado'
    });
  });
});

router.post('/finduser', function(req, res, next){
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) res.status(500).send('¡Error comprobando el usuario!');
    // Si el usuario existe...
    if (user != null) {
      res.status(200).send({ message: 'ok', role:
      user.role, id: user._id });
    } else res.status(401).send({ message: 'usuarios no registrado con este role'
    });
  });
})

router.put('/', function(req, res, next){
  User.updateMany(req.body, function(err, user){
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  })
})

router.get('/:role',function(req, res, next){
  User.find(req.params.role,function(err, user) {
    if (err) res.status(500).send('¡Error comprobando el usuario!');
    // Si el usuario existe...
    if (user != null) {
      res.status(200).send({ message: 'ok', role:
      user.role, id: user._id });
    } else res.status(401).send({ message: 'usuario sin este role'
    });
  })
})

module.exports = router;
