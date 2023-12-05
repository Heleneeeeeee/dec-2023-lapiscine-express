const express = require('express')
const router = express.Router()
// const { Op } = require('sequelize')
const { Coworking } = require('../db/sequelizeSetup')
const {findAllCoworkings, createNewCoworking} = require('../controllers/coworkingControllers')


router
    .route('/')
    .get(findAllCoworkings)
    .post(createNewCoworking)

router
    .route('/:id')
    .get((req, res) => {
        Coworking.findByPk(parseInt(req.params.id))
            .then((result) => {
                console.log(result)
                if (result) {
                    res.json({ message: 'Un coworking a été trouvé.', data: result })
                } else {
                    res.json({ message: `Aucun coworking n'a été trouvé.` })
                }
            })
            .catch((error) => {
                res.json({ message: 'Une erreur est survenue.', data: error.message })
            })
    })

    .put((req, res) => {
        Coworking.findByPk(req.params.id)
            .then ((result) =>{
                if (result){
                    result.update(req.body)
                    .then (()=>{
                        res.json({ message: 'Le coworking a bien été mis à jour.', data: result })
                    })
                    .catch ((error) =>{
                        res.json({ message: `La mise à jour àa échoué`, data: error.message })
                    })    
            } else {
                res.json({ message: `Aucun coworking n'a été mis à jour.` })
            } 
        })
        .catch(error => {
            res.json({ message: 'La mise à jour a échoué.', data: error.message })
        })
    })
        
       
      
    .delete((req, res) => {
        //A. Vérifie que l'ID passé en req.params.id renvoie bien une ligne de notre table.
        Coworking.findByPk(req.params.id)
            .then ((result)=>{
                //B. Si un coworking correspond à l'ID alors on exécute la méthode .destroy()
                if (result) {
                    result.destroy()
                        //C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .finByPk()
                        .then(() => {
                            res.json({ message: `Le coworking a bien été supprimé.`, data: result})
                        })
                        // D. Si la suppression a échoué, on retourne une réponse à POSTMAN
                        .catch((error) => {
                            res.json({ message: `La suppression a échoué.`, data: error.message })
                 })
                } else {
                    // B. Si aucun coworking ne correspond à l'ID alos on retourne une réponse à POSTMAN
                    res.json({ message: `Aucun coworking trouvé`})
                }

            })
             // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            .catch((error) => {
                res.json({ message: `La requête n'a pas aboutie.` })

            })
        
    })
       
    
module.exports = router