// Les require de ce fichier example.js sont exécutés dans app.js

let myObj = {
    product: "Smartphone",
    price: 150
}

let myObj2 = {
    product: "Screen",
    price: 100
}

let arr = [myObj, myObj2]

// module.exports est un opbjet qui permet d'exposer des variables à d'autres fichiers
// on peut exposer ces variables en écrasant module.exports, ou alors en ajoutant des propriétés à l'objet module.exports

// module.exports.myObj = myObj
// module.exports.myObj2 = myObj2
// module.exports.arr = arr


// Object destructuring, la destructuration d'objet
module.exports.myObj = myObj
//Ces 2 lignes font strictement la même chose, on destructure un objet
module.exports = { myObj }

const identity = {
    name: "Paul",
    adrees: 'Bordeaux'
}

const identity2 = {
    name: "Pierre",
    adrees: 'Talence'
}

// Object destructuring, la destructuration d'objet autre que module.exports
const monObjet = { identity, identity2 }

// module.exports = { identity, identity2 }
// const monObjet = { identity, identity2 }
// console.log(monObjet)

const myObject1 = { name: "iouhqfoigqds" }


// Dans le mmodule.exports, on peut ajouter des fonctions en prorpriété de module.exports 
const add = (nb1, nb2) => {
    const result = nb1 + nb2
    console.log(result)
}

const substract = (nb1, nb2) => {
    const result = nb1 - nb2
    console.log(result)
}

// module.exports.add = add
// module.exports.substract = substract

// La destructuration fonctionne également pour les fonctions, on créé un nom de propriété qui sera celui du nom de la variable, et une valeur de cette propriété, qui sera la valeur de la variable
module.exports = { add, substract }