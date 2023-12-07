const { Sequelize } = require('sequelize');
const { Coworking } = require('../db/sequelizeSetup')
const {UniqueConstraintError, ValidationError} = require ('sequelize')
const jwt = require ('jsonwebtoken')
const SECRET_KEY = require ('../configs/tokenData')

const findAllCoworkings = (req, res) => {
    console.log(req.query);
    Coworking.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findCoworkingByPk = (req, res) => {
    Coworking.findByPk(parseInt(req.params.id))
        .then((result) => {
            console.log(result)
            if (result) {
                res.json({ message: 'Un coworking a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun coworking n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

const createCoworking = (req, res) => {
    // console.log(req.headers.authorization)
    //A. On vérifie qu'il y a bien un token dans l'en-tête de la requête
    if(!req.headers.authorization){
        //B. Erreur 401 car l'utilisateur n'est pas authentifié
        return res.status(401).json({ message: `Vous n'êtes pas authentifié` })
        
    }
    //C. On récupère le token uniquement, on enlève "Bearer"
    const token = req.headers.authorization.split(' ')[1]

    if(token){
        try {
            //D. On décode le token à l'aide de la même clé secrète qui a servi à générer le token
            const decoded = jwt.verify(token, SECRET_KEY);
            console.log(decoded)
          } catch(error) {
            // E. La vérification a lévé une erreur, le return met fin au controller, donc pas de création de Coworking
            return res.status(403).json({message: `Le token n'est pas valide`})
          }
          
    }
    const newCoworking = { ...req.body }

    Coworking.create(newCoworking)
        .then((coworking) => {
            res.status(201).json({ message: 'Le coworking a bien été créé.', data: coworking })
            console.log(coworking)
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: `Le coworking n'a pas pu être créé.`, data: error.message })
        })
}

const updateCoworking = (req, res) => {
    Coworking.findByPk(req.params.id)
        .then ((result) =>{
            if (result){
                return result.update(req.body)
                .then (() => {
                    res.status(201).json({ message: 'Le coworking a bien été mis à jour.', data: result })
                }) 
        } else {
            res.status(404).json({ message: `Aucun coworking à mettre à jour n'a été trouvé.`, data: error.message })
        } 
    })
    .catch(error => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
    })
}

const deleteCoworking = (req, res) => {
    //A. Vérifie que l'ID passé en req.params.id renvoie bien une ligne de notre table.
    Coworking.findByPk(req.params.id)
        .then ((result)=>{
            //B. Si un coworking correspond à l'ID alors on exécute la méthode .destroy()
            if (result) {
                return result.destroy()
                    //C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .finByPk()
                    .then(() => {
                        res.json({ message: `Le coworking a bien été supprimé.`, data: result})
                    })
                    
            } else {
                // B. Si aucun coworking ne correspond à l'ID alos on retourne une réponse à POSTMAN
                res.status(404).json({ message: `Aucun coworking trouvé`, data: error.message})
            }

        })
         // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
        .catch((error) => {
            res.status(500).json({ message: `La requête n'a pas aboutie.` })

        })
    
}

module.exports={findAllCoworkings, createCoworking, findCoworkingByPk,updateCoworking, deleteCoworking}


