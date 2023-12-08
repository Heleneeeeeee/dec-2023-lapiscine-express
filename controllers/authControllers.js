const { User, Role, Coworking } = require('../db/sequelizeSetup')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const SECRET_KEY = require ('../configs/tokenData')

const login = (req, res) => {
    //A. On vérifie que l'utilisateur qui tente de se connecter existe bel et bien dans notre BDD
    User.findOne({ where: { username: req.body.username} })
        .then ((result)=>{
            // B. Si l'utilisateur n'existe pas, on renvoie une réponse erreur Client
            if (!result) return res.status(404).json({ message: `Le nom d'utilisateur n'existe pas.`})
            //C. On vérifie que le mot de passe fourni pour se connecter corresponde au mot de passe de l'utilisateur dans la BDD
            bcrypt.compare(req.body.password, result.password)
                .then ((isValid) => {
                    // D. Si le mot de passe n'est pas le bon, on renvoie une erreur client, non authentifié
                    if (!isValid) {
                        return res.status(401).json({message: `Le mot de passe n'est pas valide`})
                    }
                    // E. On génère un token qui servira à vérifier dans chaque endpoint où ce sera nécessaire si l'utilisateur peut consommer la ressource. Dans l'état actuel, le token est utilisé dans le POST COWORKINGS
                   const token = jwt.sign({
                        data:result.username
                   }, SECRET_KEY, {expiresIn:'1h'});

                   res.json({message:`Login réussi`, data: token})
                })
                .catch(error => {
                    console.log(error.message)
                })
        })

        .catch((error) => {
            res.status(500).json({data: error.message})
        })

}

const protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: `Vous n'êtes pas authentifié.` })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.username = decoded.data;
            next()
        } catch (error) {
            return res.status(403).json({ message: `Le token n'est pas valide.` })
        }
    }
}


// Middleware de restriction d'accès basé sur le rôle de l'utilisateur
const restrict = (req, res, next) => {
    // Recherche de l'utilisateur dans la base de données par le nom d'utilisateur fourni dans la requête
    User.findOne({ 
        where: { 
            username: req.username
        } 
    })
        .then (user=>{
         // Si l'utilisateur est trouvé, recherche du rôle associé à cet utilisateur
            Role.findByPk(user.RoleId)
                .then(role => {
                    // Vérifie si le rôle de l'utilisateur est 'admin'
                    if (role.label==='admin'){
                    // Si l'utilisateur a le rôle 'admin', autorise l'accès à la ressource suivante
                        next()
                    } else {
                        // Si le rôle n'est pas 'admin', renvoie une réponse d'erreur avec un statut 403 (Accès interdit)
                        res.status(403).json({message: `Droits insuffisants`})
                    }
                })
                 // Gestion des erreurs lors de la recherche du rôle
                .catch(error => {
                    console.log(error.message)
                })
        })
        .catch(error => {
            // Gestion des erreurs lors de la recherche de l'utilisateur
            console.log(error)
        })
}

//implémenter le middleware qui sera utilisé sur updateCoworking et deletecoworking qui permettra d'interagir sur la ressource seulment si on en est l'auteur renvoie une erreur 403
const restrictToOwnUser=(req, res, next)=> {
    User.findOne(
     {
     where: 
         {username:req.username }
 
    })
    .then (user => {
     if(!user){
         return res.status(40).json({message: `Pas d'utilisateur trouvé`})
     }
     Coworking.findByPk(req.params.id)
         .then(coworking => {
             if(user.id === coworking.UserId) {
                 next()
             } else {
           
             return res.status(403).json({message: `Vous n'êtes pas l'auteur de la ressource`})
         }
     })
     .catch(error => {
         return res.status(404).json({ message: `Pas de coworking trouvé.` })
     })
 })
 .catch(error => console.log(error.message))
 
 }



module.exports = { login, protect, restrict, restrictToOwnUser }


















































 