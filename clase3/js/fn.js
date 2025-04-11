async function getPjs() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1"); //const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1302");
    const data = await response.json();
    console.log(data);
}

//getPjs();

async function comparar(id1,id2) {
    const response1 = await fetch("https://pokeapi.co/api/v2/pokemon/"+id1);
    const pj1 = await response1.json();
    const response2 = await fetch("https://pokeapi.co/api/v2/pokemon/"+id2);
    const pj2 = await response2.json();
    console.log('El personaje con mas daño es:', pj1.stats[1].base_stat > pj2.stats[1].base_stat ? pj1.name+' (con '+pj1.stats[1].base_stat+')' : pj2.name+' (con '+pj2.stats[1].base_stat+')')
}
comparar(544,269);


/*fetch("", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
});*/