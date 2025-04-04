/*
Persona1 y 2
 Nombre
 Apellido
 Edad
 DNI
 Colores (3 colores) -> array

funcion que diga el nombre de la persona con mas edad, y si le gusta o no el color azul
*/

let Persona1 = {
    nombre : 'Pedro',
    apellido : 'Juarez',
    edad : 22,
    dni : 87654321,
    colores : ['Rojo','Azul','Amarillo']
};
let Persona2 = {
    nombre : 'Jaimito',
    apellido : 'Rodriguez',
    edad : 65,
    dni : 12345678,
    colores : ['Verde','Celeste','Violeta']
};

function comparar(p1,p2) {
    console.log('La persona mas grande de edad es:', (p1.edad > p2.edad ? p1.nombre+(p1.colores.includes('Azul') ? ', Si' : ', No') : p2.nombre+(p2.colores.includes('Azul') ? ', Si' : ', No')), 'le gusta el color azul.')
}
comparar(Persona1,Persona2);
