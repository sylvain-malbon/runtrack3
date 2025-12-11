async function afficherUsers() {
    const reponse = await fetch("./users.json");
    const users = await reponse.json();

    return users;
}

const users = afficherUsers();

// X console.log(users);

// X users.then(result => console.log(result));
// Pour utiliser plusieurs actions dans la fonction callback, on utilise les accolades :
users.then(result => {
    console.log("ok");
    console.log(result);
});