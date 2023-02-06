var express = require('express');
var router = express.Router();
// middleware que es específico a este router
router.use(function timeLog(req, res, next) {
console.log('Fecha actual: ', Date.now());
next();
});
// define la ruta de la página del home
router.get('/', function(req, res) {
res.send('Página inicial de los posts');
});
// define la ruta de la página about
router.get('/about', function(req, res) {
res.send('Acerca de los posts');
});

module.exports = router;