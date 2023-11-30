// ASSIGNATION PAR VALEUR, ASSIGNATION PAR REFERENCE

// dans le cas des variables primitives, le signe = opère une assignation par valeur
// ce qui signifie, que chacune des variables est indépendante de l'autre
let myNumber = 12
let myNumber2 = myNumber

myNumber += 3


// dans le cas des variables primitives, le signe = opère une assignation par valeur
// ce qui signifie, que chacune des variables est indépendante de l'autre
let myName = "Paul"
let myName2 = myName

myName = "Pauline"


// Dans le cas des variables complexes, le signe = opère une assignation par référence, 
// ce qui signifie que les 2 variables pointent vers une même valeur.
let user = {
    name: "Paul",
    age: 35
}

let user2 = { ...user }

user.name = "Stéphane"
user2.name = "Victoria"


let arr1 = [2, 5, 7]
arr1.push(9)

let arr2 = arr1

arr2.push('oiqshdiofgq')


console.log(arr1, arr2)