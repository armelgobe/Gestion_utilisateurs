// Ici on fait du Javascript simple côté server

const users = [{id:1, nom:"Jean", prenom:"Pierre", age:25}]; // Déclaration du tableau qui contiendra les nouvels utilisateurs ajouter
const validateButton = document.getElementById("valider"); //Recuperation du boutton dans le fichier index html en l'appelant par son nom cad "valider"

validateButton.addEventListener("click", addUser); // Creation de la fonction addEventListener associée au boutton qui va detecter lorsque l'utisateur clique sur le boutton. Elle prend en paramètre click et une fonction qui par nous en l'occurence addUser qui est la fonction qui sera appele lorsque l'utilisateur clique sur le boutton

//Création de le fonction addUser qui sera appelée lorsque l'utilisateur cliquera sur le boutton
// const addUser = () => {}  //Arrow function donc l'equivalent est comme ci dessous:


//fonctionnalités : Action qui suivra après que l'utilisateur ai cliqué sur le boutton "Ajouter"
function addUser(event) {     // passage du parametre event à notre fonction
  event.preventDefault();     //Utilisation du parametre event pour eviter que la page ne s'actualise lorsqu'on clique sur le boutton

  const enteredUsersData= {   // Création d'une variable de type objet qui va pré-sauvegardé toutes les valeurs que l'utilisateur aura rentré dans le formulaire
    //Comme dans tout système de base de donnée. Chaque ensemble de base de donnée possède un numéro d'identification unique et doit être généré en interne automatiquement
    //génération de l'id d'un ensemble à sauvegarder par récupération du numéro  et incrémentation du dernier ensemble sauvegardé
    id: users[users.length-1].id+1,  // cette commande n'est valable que si users est non nul

    //commande plus complète au cas users est nul de la génération de l'id automatiquement
    id: users.length !==0 ? users[users.length-1].id +1 : 1, // "users.length !==0 " (si la longueur du tableau est différent de 0),  "? users[users.length - 1].id + 1" (si c'est le cas "?"alors incrémente l'id du dernier ensemble du tableau de +1), ":"(sinon(else) id = 1)
    
    //Recuperation des valeurs rentrées par l'utilisateur
    nom:document.getElementById('nom').value, 
    prenom:document.getElementById('prenom').value,
    age:document.getElementById('age').value,
 };

   //contrôle des champs nom , prenom & age avant enregistrement : vérifier qu'il ne sont pas vide
  if(enteredUsersData.nom!=="" &&             // en gros s'il ne sont pas vide
   enteredUsersData.prenom!=="" && 
   enteredUsersData.age!==""
   ){ 
    //alors
    users.push(enteredUsersData); // Sauvegarde definitive dans users des données rentrées par l'utilisateur.
    console.log(users); // pour voir les modifications....
    showAllUser(); // fonction appelé qui va afficher tous les utilisateurs enregistrés dans users

   }
}

function showAllUser() {
  document.getElementById('allUsers').innerHTML=''; // innerHTML: récuperer le code html de allUsers / ='' : l'initialiser


}