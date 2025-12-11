async function afficherUsers() {
    const reponse = await fetch("./users.json");
    const users = await reponse.json();
    console.log(users);
}

