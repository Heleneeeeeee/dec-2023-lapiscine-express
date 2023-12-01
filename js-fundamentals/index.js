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

console.log(user, user2)


let arr1 = [2, 5, 7]
arr1.push(9)

let arr2 = arr1

arr2.push('oiqshdiofgq')


// console.log(arr1, arr2)

let arr3 = [2, 3, 4, 5]
// let arr4 = arr3.filter(el => el >= 4)

// arr3.push(9)

let arr4 = arr3.map(el => {
    return el += 2
})

arr3.forEach(el => {
    el -= 1
})

for (let index = 0; index < arr3.length; index++) {
    arr3[index] = arr3[index] *= 10
}
// console.log(arr3, arr4);

// Assignation par référence pour les variables complexes

let tab1 = ['chien', 'chat']
let tab2 = tab1

tab1.push('serpent')

let nb1 = 12
let nb2 = nb1

nb1++

console.log(nb2)