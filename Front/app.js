// Affichge des informations sur la page HTML
const info = document.querySelector('.info');
// Déclaration d'une structure de données locale
let listeCoursesMemoire;
let paramsId = 999;

// Lecture des donées listeCourses.json depuis node.js
async function lectureData() {
    let url = 'http://127.0.0.1:5000/listeCourses/';
    let res = await fetch(url);
    if (res.ok) {
        let reponseData = await res.json();
        // Copie des donneés coté navigateur
        listeCoursesMemoire = reponseData;
        return reponseData;
    } else {
        return `HTTP error: ${res.status}`;
    }
}
// Appel direct fonction de lecture des données
lectureData().then(data => {
    //   info.textContent = JSON.stringify(data);
    // Liste le numéro des objets de data (json response parkings)
    numObjectListeCourses = Object.keys(listeCoursesMemoire);
    // liste les propriétés (items) de chaque objet
    numObjectListeCourses.forEach(function (objectListeCourses) {
        let items = Object.keys(listeCoursesMemoire[objectListeCourses]);
        // Liste la valeur de chaque propriété des objets de parkings
        items.forEach(function (item) {
            let value = listeCoursesMemoire[objectListeCourses][item];
            // Afficher les produits
            if (item === 'produit') {
                let checkbox = document.createElement('input');
                let label = document.createElement('label');
                let br = document.createElement('br');
                let container = document.getElementById('container');
                // Vérifier si la checbox est checked
                checkbox.type = 'checkbox';
                if (JSON.stringify(listeCoursesMemoire[objectListeCourses].achat) === 'true') {
                    checkbox.checked = true;
                }
                checkbox.class = 'choix';
                checkbox.id = JSON.stringify(listeCoursesMemoire[objectListeCourses].id)
                // Affiche le label de la  checkbox
                label.appendChild(document.createTextNode(' - ' + value));
                // Transfert à la page html: index.htlm
                container.appendChild(checkbox);
                container.appendChild(label);
                container.appendChild(br);
            }
        });
    });
});

// Lecture de la liste des courses affichée sur HTML
const postBp = document.querySelector('.postBp');
postBp.addEventListener('click', mySelection);
// Prise en compte des données selectionnées
function mySelection() {
    // lecture des inputs checkbox HTML
    let myCheckbox = document.querySelectorAll("input");
    // Convertir en array
    let myCheckboxArray = Array.prototype.slice.call(myCheckbox);
    // Lecture de chaque élément array
    myCheckboxArray.forEach(function (elem) {
        //Mise à jour des données achat true/false
        if (elem.checked === true) {  
            listeCoursesMemoire[elem.id].achat = true; 
        } else{
            listeCoursesMemoire[elem.id].achat = false; 
        };
    });

    //Appel de la fonction POST
    envoiData();
};

// Enregistre la liste des courses
function enregistreData(){
fs.writeFile('./listeCourses.json', JSON.stringify(listeCoursesMemoire, null, 4), function (err) {  
    if (err) throw err;
      console.log('Saved!');
  }); 
};

