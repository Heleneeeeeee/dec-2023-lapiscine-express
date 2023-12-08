// B. On importe le gabarit du Model Coworking défini dans le fichier ./models/coworking'
const CoworkingModel = require('../models/coworkings');
const UserModel = require ('../models/users');
const RoleModel = require ('../models/roleModel');
const { Sequelize, DataTypes } = require('sequelize');
const  {setCoworkings, setUsers, setRoles} = require ('./setDataSample')

// A. On créé une instance de bdd qui communique avec Xampp 
const sequelize = new Sequelize('bordeaux_coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

// C. On instancie un Model qui permettra d'interpréter le Javascript avec la Table SQL correspondante
const Coworking = CoworkingModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)

Role.hasMany(User)
User.belongsTo(Role)

User.hasMany(Coworking)
Coworking.belongsTo(User)
//Ecrire la realtion entre User et Coworking

// D. On synchronise la BDD avec les models défini dans notre API
sequelize.sync({ force: true })
    .then (()=> {
        // setCoworkings(Coworking)
        setUsers(User)
        setRoles(Role)
    })
       
    .catch(error => {
        console.log (error)
    })

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { Coworking, User, Role }