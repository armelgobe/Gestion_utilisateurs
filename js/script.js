// Ici on fait du Javascript simple côté server

const users = [{id:1, nom:"Jean", prenom:"Pierre", age:25}]; // Déclaration du tableau qui contiendra les nouvels utilisateurs ajouter
const validateButton = document.getElementById("valider"); //Recuperation du boutton dans le fichier index html en l'appelant par son nom cad "valider"
showAllUser();
validateButton.addEventListener("click", addUser); // Creation de la fonction addEventListener associée au boutton qui va detecter lorsque l'utisateur clique sur le boutton. Elle prend en paramètre click et une fonction addUser qui sera définie et appele lorsque l'utilisateur cliquera sur le boutton
updateOrDeleteUser();

function updateOrDeleteUser(){
  const deleteButtons = document.querySelectorAll('.Supprimer'); //On récupère tous les bouttons qui ont été crée au trauvers de queryselectAll en prenant en parametre .Supprimer: le . point désigner que c'est une class
  const editButtons = document.querySelectorAll('.Modifier');

  //Ajout d'un evenement sur chaque boutton qui aura été cliquer

  deleteButtons.forEach((button)=>
    //button.addEventListener('click', deleteUser(button.id)) //Ecrit ainsi cette fonction sera executer automatiquement sans que l'on ai a cliquer sur le button
    button.addEventListener('click', ()=> deleteUser(button.id))
  );
  editButtons.forEach((button)=>
    button.addEventListener('click', ()=> editUser)
  );
}
//Création de le fonction addUser qui sera appelée lorsque l'utilisateur cliquera sur le boutton
// const addUser = () => {}  //Arrow function donc l'equivalent est comme ci dessous:


//SAUVEGARDE DES INFORMATIONS PAR L'UTILISATEUR DANS "users=[...]"

//fonctionnalités : Action qui suivra après que l'utilisateur ai cliqué sur le boutton "Ajouter"
function addUser(event) {     // passage du parametre event à notre fonction
  event.preventDefault();     //Utilisation du parametre event pour eviter que la page ne s'actualise lorsqu'on clique sur le boutton

  const enteredUsersData= {   // Création d'une variable de type objet qui va pré-sauvegardé toutes les valeurs que l'utilisateur aura rentré dans le formulaire
    //Comme dans tout système de base de donnée. Chaque ensemble de base de donnée possède un numéro d'identification unique et doit être généré en interne automatiquement
    //génération de l'id d'un ensemble à sauvegarder par récupération du numéro  et incrémentation du dernier ensemble sauvegardé
    //id: users[users.length-1].id+1,  // cette commande n'est valable que si users est non nul

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
//FIN SAUVEGARDE DES INFORMATIONS PAR L'UTILISATEUR DANS "users=[...]"

//AFFICHAGE DES UTILISATEURS SAUVEGARDER DANS "users=[...]" AU NIVEAU DE NOTRE SITE
function showAllUser() {
  document.getElementById('allUsers').innerHTML=''; // Instruction pour vider le contenu de allUsers. En d'autre terme vider son balissage Par récuperation de son code html innerhtml
  users.forEach(user =>{                        //foreach cad on parcours le tableau users ligne par ligne et pour chaque utilisateur on crée :
    const newInputs = {                                                                          //- des inputs pour stocker le nom, prenom et age dans "user" sans s qui seront
      Nom: document.createElement('input'),
      Prenom:document.createElement('input'),
      Age:document.createElement('input'),
    }; // A la fin de ce forEach newInputs est un objet qui comporte toute les key : nom, prenom et age de notre table users et toute leurs valeurs associé jean, Pierre et 25
                                       
    const newButtons={
      Supprimer:document.createElement('input'),                                                //- Des bouttons pour le supprimer ou le modifier
      Modifier:document.createElement('input'),
    };
    const newDiv = document.createElement('div')                                               //- une div pour stocker tous ces elements generes

    //Typage des éléments generer ci-dessous et attribution de numéro unique de base
    for(const [key, value] of Object.entries(newInputs)){    //  Parcours de notre object newInputs on stockant dans "key" : nom, prenom ou age et dans "value":document.createElement("input") correspondant "of": de "Object.entries("newInputs")" l'object newInput
      value.setAttribute('type', 'text'); //pour chaque inputs nom prenom ou age, on va recuperer la value et on va lu attribuer un type
      value.setAttribute('id', `${key}ofUser${user.id}`); //attribuer un identifiant a chaque input
      //NomOfuser1, PrenomOfuser1, AgeOfUser1
      //NomOfuser2, PrenomOfuser2, AgeOfUser2
      key === 'Nom' && value.setAttribute('value', user.nom); // Interpretation: si la key est nom "&&": alors on met comme valeur de l#INPUT user.nom
      key === 'Prenom' && value.setAttribute('value', user.prenom);
      key === 'Age' && value.setAttribute('value', user.age);

      newDiv.appendChild(value); //appendchild pour ajouter un nouvel enfant dans la div en l'occurence "value" de la boucle for ou du moins value declarer dans la boucle for
      document.getElementById('allUsers').appendChild(newDiv); // recuperation de la div allUsers du code Html et affecter "newDiv.appendChild(value)" Comme son enfant

    }
    for(const [key, value] of Object.entries(newButtons)){
      value.setAttribute('type', 'button'); //interpretation cad le type de l'element est le button
      value.setAttribute('class', key); // definir class pour pouvoir appliquer de css
      value.setAttribute('id', user.id);
      value.setAttribute('value', key);
      newDiv.appendChild(value);
    }

  }); // instruction pour parcourir les elements de users de les sauvegarder en memoire tempo pour utilisatiion ulterieure

  updateOrDeleteUser();

 

}
//FIN AFFICHAGE DES UTILISATEURS SAUVEGARDER DANS "users=[...]" AU NIVEAU DE NOTRE SITE

//Creation de nos fonctions de modification et suppression
function deleteUser(id){
  users.forEach((user)=>{
    const userPositionInArray = users.indexOf(user);
    user.id === parseInt(id) && users.splice(userPositionInArray, 1);
  });
  showAllUser();

}

function editUser(id){
  const newInputs = {
    nom: document.getElementById(`NomOfUser${id}`).value,
    prenom: document.getElementById(`PrenomOfUser${id}`).value,
    age: document.getElementById(`AgeOfUser${id}`).value
  };
  users.forEach((user) => {
    if (user.id === parseInt(id)) {
      user.nom = newInputs.nom;
      user.prenom = newInputs.prenom;
      user.age = newInputs.age;
    }
  });


}