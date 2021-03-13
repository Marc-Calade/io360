// Intégrer la librairie express dans notre fichier index.js:
const express = require('express');
const listeCourses = require('./listeCourses.json');
fs = require('fs');
const app = express();

const cors = require('cors-express');
options = {
    allow: {
        origin: '*',
        methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
        headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
    }
};

// Middleware pour faire un post
app.use(express.json());
app.use(cors('*'));

// Ouvre le fichier HTML
app.get('/', function (req, res) {
  res.sendFile('/app.html');
});

// Renvoi le fichier listeCourses
app.get('/listeCourses', (req, res, next) => {
 console.log('app.get')
    res.send(listeCourses);
});

// Enregistre les données dans le fichier
app.post('/listeCourses/:id', (req, res, next) => {  
    // id from url
    const produitId = req.params.id;
    //update data
    const listeData = req.body;
    //res.status(200).json(produitData);
    res.status(200);
    console.log('app.post: params.id = ' + produitId);
    // Enregistrement dans le fichier listeCourses.json
    //fs.writeFile('./parkings.json', JSON.stringify(parkings, null, 4), function (err) {
    fs.writeFile('./listeCourses.json', JSON.stringify(listeData, null, 4), function (err) {  
    if (err) throw err;
      console.log('Saved!');
  }); 
    if (res.ok) {
      res.status(201).send();
      console.log('reponse ok: ');
    } else {
      res.status(400);
    }
  });

  // Serveur l’écoute avec la méthode listen avec app + le port 
app.listen(5000, () => {
    console.log('Serveur à l\'écoute');
});