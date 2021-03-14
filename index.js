// Intégrer la librairie express dans notre fichier index.js:
const express = require('express');
const listeCourses = require('./listeCourses.json');
fs = require('fs');
const app = express();
// Configuration des options cors
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
// Envoi du fichier listeCourses vers le client
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
  // Mise à jour du status code de la réponse
  res.status(200);
  // Enregistrement dans le fichier listeCourses.json
  fs.writeFile('./listeCourses.json', JSON.stringify(listeData, null, 4), function (err) {
    if (err) throw err;
    res.status(201).send();
  });
  if (res.ok) {
    res.status(202).send();
    console.log('app.post')
  } else {
    res.status(400);
  }
});
// Serveur l’écoute avec la méthode listen avec app + le port 
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Serveur à l\'écoute');
});