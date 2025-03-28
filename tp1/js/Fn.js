/*
Persona1 y 2
 Nombre
 Apellido
 Edad
 DNI
 Colores (3 colores) -> array

funcion que diga el nombre de la persona con mas edad
*/

let Persona1 = {
    nombre : 'Pedro',
    apellido : 'Juarez',
    edad : 22,
    dni : 87654321,
    colores : ['rojo','azul','amarillo']
};
let Persona2 = {
    nombre : 'Jaimito',
    apellido : 'Rodriguez',
    edad : 65,
    dni : 12345678,
    colores : ['verde','celeste','violeta']
};

function comparar(p1,p2) {
    console.log('La persona mas grande de edad es: ', p1.edad > p2.edad ? p1.nombre : p2.nombre)
}
comparar(Persona1,Persona2);

// falta lo de si le gusta el azul (estuve ayudando gente)