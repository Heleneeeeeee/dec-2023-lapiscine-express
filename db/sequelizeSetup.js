// B. On importe le gabarit du Model Coworking défini dans le fichier ./models/coworking'
const CoworkingModel = require('../models/coworkings')
const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('../mock-coworkings')
const mockUsers = require ('../mock-users')
const UserModel = require ('../models/users')

// A. On créé une instance de bdd qui communique avec Xampp 
const sequelize = new Sequelize('bordeaux_coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

// C. On instancie un Model qui permettra d'interpréter le Javascript avec la Table SQL correspondante
const Coworking = CoworkingModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

// D. On synchronise la BDD avec les models défini dans notre API
sequelize.sync({ force: true })
    .then (()=> {
        mockCoworkings.forEach(element => {
            const newCoworking = {...element}
            Coworking.create(newCoworking)
                .then(() => { })
                .catch((error) => {
                    console.log(error.message)
                })
            })
        mockUsers.forEach(element => {
            const newUser = {...element}
            User.create (newUser)
                .then(() => { })
                .catch((error) => {
                    console.log(error.message)
            })
        })
    })
    .catch(error => {
        console.log (error)

    })

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { sequelize, Coworking, User }