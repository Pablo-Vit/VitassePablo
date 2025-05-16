// Elementos y datos
const btnTeam1 = document.getElementById("btnteam1");
const btnTeam2 = document.getElementById("btnteam2");
const btnFight = document.getElementById("btnfight");
btnFight.disabled = true;

let team1 = []
let team2 = []



// Funciones
function createTeam(id, pos) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
        let basePK = {
            id: data.id,
            name : data.name,
            attack : data.stats[1].base_stat,
            defense : data.stats[2].base_stat,
            img : data.sprites.other["official-artwork"].front_default
        };
        if (pos <= 3) {
            team1.push(basePK);
        } else {
            team2.push(basePK);
        }
        console.log(data);

        document.getElementById("pk"+pos).innerText = data.name;
    });
}








// eventos

btnTeam1.addEventListener("click", function () {
    for (let i = 1; i <= 3; i++) {
        let id = Math.floor(Math.random() * 1025)+1;
        createTeam(id, i);
    }
  });
btnTeam2.addEventListener("click", function () {
    for (let i = 4; i <= 6; i++) {
        let id = Math.floor(Math.random() * 1025)+1;
        createTeam(id, i);
    }
  });

/*fetch("api/check-log.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
    if (data.Logged == 0) {
        window.location.href = 'login/';
    }
    else {
        document.getElementById("username").innerText = "Conectado como: " + data.name;
        fetchGames();
        fetchOldGames();
        fetchFinishedGames();
    }
});*/