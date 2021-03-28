// Installer: sudo npm i -s express
// Installer: sudo npm i -s nodemon
// Installer: sudo npm i -s mongodb
// Installer: sudo npm i -s mongoose
// Installer: sudo npm i -s cors ????????
// installer: sudo npm install cors-express --save
// appel des modules Express-mongodb
const express = require('express');
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
// midleware express
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
// déclartion array local listeProduit
let listeProduits = [];
// Connexion database mongodb
const url = 'mongodb+srv://Marc:Calade@cluster0.v66ne.mongodb.net/liste?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// Vérification de la connexion à la database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db conected');
    // Définition du schéma
    const produitSchema = new mongoose.Schema({
        id: Number,
        categorie: String,
        produit: String,
        quantite: Number,
        achat: Boolean,
        classement: Number
    });
    // Définition du model
    const Produit = mongoose.model('Produit', produitSchema);
    // Requette http depuis le client
    app.get('/listeCourses', (req, res) => {
        Produit.find(function (err, produits) {
            if (err) return console.error(err);
            res.send(produits);
            console.log('res.send(produits) to client');
        })
    });
    // Enregistrement des données dans la database
    app.post('/listeCourses/', function (req, res) {
        // Lecture de la requette client
        listeProduits = req.body;
        nombreProduits = 0;
        console.log(nombreProduits);
        // Enregistrement dans la database
        listeProduits.forEach(function (reqProduit) {
            let myProduit = new Produit(reqProduit);
            Produit.findById(myProduit._id, function (err, produit) {
                if (err) throw err;
                produit.achat = myProduit.achat
                produit.save(function (err) {
                    if (err) throw err;
                    nombreProduits++  ;
                    if (listeProduits.length === nombreProduits){
                        console.log('mongodb updated succesfully');
                        res.send("ok");
                       }
                });
            });
        });
    });
});
// Serveur l’écoute avec la méthode listen avec app + le port 
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Serveur à l\'écoute');
});