// Elementos y datos
const btnTeam1 = document.getElementById("btnteam1");
const btnTeam2 = document.getElementById("btnteam2");
const btnFight = document.getElementById("btnfight");
const dadoTeam1 = document.getElementById("dadoteam1");
const dadoTeam2 = document.getElementById("dadoteam2");
let primerDado = false;


let team1 = []
let team1At = 0;
let team1De = 0;
let team1tiros = 0;
let team1dados = 0;
let team1Bool = false;

let team2 = []
let team2At = 0;
let team2De = 0;
let team2tiros = 0;
let team2dados = 0;
let team2Bool = false;

// Variables de testeo
let btn1 = false;
let btn2 = false;

// Funciones
function getPokemon(id, pos) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            let basePK = {
                id: data.id,
                name: data.name,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                img: data.sprites.other["official-artwork"].front_default
            };
            if (pos <= 3) {
                team1.push(basePK);
                team1At += data.stats[1].base_stat;
                team1De += data.stats[2].base_stat;
            } else {
                team2.push(basePK);
                team2At += data.stats[1].base_stat;
                team2De += data.stats[2].base_stat;
            }
            drawCard(basePK, pos)
        });
}

function drawCard(info, pos) {
    const td = document.getElementById('pk'+pos);
    td.innerHTML = `<img src="${info.img}" alt="${info.name} photo" class="avatar">
                        <div class="info">
                            <p>${info.name}</p>
                            <p>Attack: ${info.attack}</p>
                            <p>Defense: ${info.defense}</p>
                        </div>`
}

function drawWinner(winner) {
    let isteam1 = winner == 1;
    console.log(isteam1)
    // Resaltar en verde al ganador
    document.getElementById('team'+ (isteam1 ? 1 : 2)).style = 'background-color: #33FF33;';
    // Resaltar en rojo al perdedor
    document.getElementById('team'+ (isteam1 ? 2 : 1)).style = 'background-color: red;';
    
}

function fight() {
    if (team2Bool && team1Bool) {
        if (team1At - team2De > team2At - team1De) {
            drawWinner(1);
        } else if (team2At - team1De > team1At - team2De) {
            drawWinner(2);
        } else {
            if (team1dados > team2dados) {
                drawWinner(1);
            } else if (team2dados > team1dados) {
                drawWinner(2);
            } else {
                alert(`Nueva ronda de dados por empate \n1:${team1dados} y 2:${team2dados}`);
                while (team1dados == team2dados) {
                    primerDado = false;
                    team1tiros++;
                    team1dados = 0;
                    let resDado = Math.floor(Math.random() * 5) + 1;
                    team1dados += resDado;
                    dados(1, resDado);
                    resDado = Math.floor(Math.random() * 5) + 1;
                    team1dados += resDado;
                    dados(1, resDado);
                    primerDado = false;
                    team2tiros++;
                    team2dados = 0;
                    resDado = Math.floor(Math.random() * 5) + 1;
                    team2dados += resDado;
                    dados(2, resDado);
                    resDado = Math.floor(Math.random() * 5) + 1;
                    team2dados += resDado;
                    dados(2, resDado);
                }
                fight();
            }
        }
    } else {
        alert('Asegurese de generar ambos equipos antes de luchar.')
    }
}

function dados(dado, valor) {
    if (!primerDado) {
        document.getElementById(`dado${dado}`).innerHTML = `<img src="imgs/d${valor}.png" alt="dado">`;
        primerDado = true;
    } else {
        document.getElementById(`dado${dado}`).innerHTML += `<img src="imgs/d${valor}.png" alt="dado">`
    }
}



// eventos

btnTeam1.addEventListener("click", function () {
    document.getElementById('team1').style = 'background-color: #FFFF99AA;';
    document.getElementById('team2').style = 'background-color: #FFFF99AA;';
    team1Bool = true;
    team1.length = 0;
    team1At = 0;
    team1De = 0;
    for (let i = 1; i <= 3; i++) {
        let id = Math.floor(Math.random() * 1025) + 1;
        getPokemon(id, i);
    }
});

btnTeam2.addEventListener("click", function () {
    document.getElementById('team1').style = 'background-color: #FFFF99AA;';
    document.getElementById('team2').style = 'background-color: #FFFF99AA;';
    team2Bool = true;
    team2.length = 0;
    team2At = 0;
    team2De = 0;
    for (let i = 4; i <= 6; i++) {
        let id = Math.floor(Math.random() * 1025) + 1;
        getPokemon(id, i);
    }

});

btnFight.addEventListener("click", fight);
btnFight.disabled = true;

dadoTeam1.addEventListener("click", function () {
    let aux = team1dados;
    primerDado = false;
    team1tiros++;
    team1dados = 0;
    let resDado = Math.floor(Math.random() * 5) + 1;
    team1dados += resDado;
    dados(1, resDado);
    resDado = Math.floor(Math.random() * 5) + 1;
    team1dados += resDado;
    dados(1, resDado);
    if (aux > team1dados) {
        team1dados = aux
    }
    btn1 = true;
    if (btn2) {
        btnFight.disabled = false;
    }
    if (team1tiros >= 3) {
        dadoTeam1.disabled = true;
    }
});
dadoTeam2.addEventListener("click", function () {
    let aux = team2dados;
    primerDado = false;
    team2tiros++;
    team2dados = 0;
    let resDado = Math.floor(Math.random() * 5) + 1;
    team2dados += resDado;
    dados(2, resDado);
    resDado = Math.floor(Math.random() * 5) + 1;
    team2dados += resDado;
    dados(2, resDado);
    if (aux > team2dados) {
        team2dados = aux
    }
    btn2 = true;
    if (btn1) {
        btnFight.disabled = false;
    }
    if (team2tiros >= 3) {
        dadoTeam2.disabled = true;
    }
});

/*
team1dados = 1;
team2dados = 1;
team1At = 1;
team1De = 1;
team2At = 1;
team2De = 1;
team1Bool = true;
team2Bool = true;
fight(); 
*/
