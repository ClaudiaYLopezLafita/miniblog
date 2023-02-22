var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const { body, validationResult } = require('express-validator');

//MODELS
var Post = require('../models/Post.js')
var User = require('../models/User.js')
var db = mongoose.connection

// GET del listado de posts ordenados por fecha de publicación
router.get('/', function(req, res, next) {
    //populate (nombre que tiene en el ej que lo referencia)
    //cuando hga una ruta raiz de post sobre post nos hace un find 
    //lo ordena decrecientemenre
    //traemos todos los usarios
    //tras user ponemos  -> proyeccion {_id:0,fullname:1}
    Post.find().sort('-publicationdate').populate('user',{_id:0,fullname:1}).exec(function(err
    , posts) {
        if (err) res.status(500).send(err);
        else res.status(200).json(posts);//tendo todos los post con el user completo
    });
});

// GET de todos los posts de un usuario dado (identificado por su Id)
router.get('/all/:id', function(req, res, next) {
    Post.find({ 'user': req.params.id
    }).sort('-publicationdate').populate('user').exec(function(err, posts)
        {
        if (err) res.status(500).send(err);
        else res.status(200).json(posts);
        });
});

// POST de un nuevo post o entrada
router.post('/', 
    body('description', 'Escrima un formato email correcto').isLength({min:10, max:20}),
    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        
        User.findById(req.body.iduser, function(err, userinfo) {
            if (err) res.status(500).send(err);
            else {
            // crear la instancia Post
                var postInstance = new Post({
                    user: req.body.iduser,
                    title: req.body.title,
                    description: req.body.description
                });
                // añadir postInstance al array de posts del usuario
                userinfo.posts.push(postInstance);
                // salvar el post en las colecciones users y posts
                userinfo.save(function(err) {
                    if (err) res.status(500).send(err);
                    else {
                        postInstance.save(function(err) {
                        if (err) res.status(500).send(err);
                        res.sendStatus(200);
                        });
                    }
                });
            }
        });
});

// PUT de un post existente (identificado por su Id)
router.put('/:id', function(req, res, next) {
    Post.findByIdAndUpdate(req.params.id,req.body, function(err,  postinfo) {
        if (err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

// DELETE de un post existente (identificado por su Id)
router.delete('/:id', function(req, res, next) {
    Post.findByIdAndDelete(req.params.id, function(err, postinfo) {
        if (err) res.status(500).send(err);
        else {
            User.findByIdAndUpdate(postinfo.user, { $pull: { posts: postinfo._id } }, 
                function(err, userinfo) {
                    if (err) res.status(500).send(err);
                    else {
                    res.sendStatus(200);
                    }
                });
        }
    });
});


module.exports = router;