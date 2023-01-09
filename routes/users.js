var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json({
    "users ": [
      {
        "id ": 123,
        "name": "Juan Perez ",
        "phones": {
          "home ": "999 999 888 ",
          "mobile": "666 555 444"
        },
        "email": [
          "jp@example.com ",
          "jp@example.org "
        ],
        "dateOfBirth": "1980-01-02T00:00:00.000Z",
        "registered": true
      },
      {
        "id ": 456,
        "name": "Jose Garcia",
        "phones": {
          "home ": "999 888 777",
          "mobile": "666 333 999"
          },
        "email": [
          "jg@example.com ",
          "jg@example.org"
        ],
        "dateOfBirth": "1983-01-09T00:00:00.000Z",
        "registered": false
      }
    ]
  });
});

// GET de un usuario por su id
router.get('/:id', function(req, res) {
  if (req.params.id == '123') {
    res.json({
      "id ": 123,
      "name": "Juan Perez ",
      "phones": {
        "home ": "999 999 888 ",
        "mobile": "666 555 444"
      },
      "email": [
        "jp@example.com ",
        "jp@example.org "
      ],
      "dateOfBirth": "1980-01-02T00:00:00.000Z",
      "registered": true
    });
  } else
    res.status(404).send('¡Lo siento, el ítem no se ha encontrado!');
});

// POST de un nuevo usuario
router.post('/', function(req, res) {
  var new_user = req.body;
  //ToDo (hacer algo con el nuevo usuario)
  res.status(200).send('Usuario ' + req.body.name + ' ha sido añadido satisfactoriamente');
});

// PUT de un usuario por su Id
router.put('/:id', function(req, res) {
  var updated_user = req.body;
  //ToDo (hacer algo con el usuario)
  res.status(200).send('Usuario con id ' + req.params.id + ' ha sido actualizado satisfactoriamente');
});

router.delete('/:id', function(req, res) {
  //ToDo (hacer algo con el usuario)
  res.status(200).send('Usuario con id ' + req.params.id + ' ha sido borrado satisfactoriamente');
});

module.exports = router;
