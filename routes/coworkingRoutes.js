const express = require('express')
const router = express.Router()
// const { Op } = require('sequelize')
const { Coworking } = require('../db/sequelizeSetup')
const {findAllCoworkings} = require('../controllers/coworkingControllers')


router
    .route('/')
    .get(findAllCoworkings)
    .post((req, res) => {
        const newCoworking = { ...req.body }

        Coworking.create(newCoworking)
            .then((coworking) => {
                res.json({ message: 'Le coworking a bien été créé', data: coworking })
                console.log(coworking)
            })
            .catch((error) => {
                res.json({ message: `Le coworking n'a pas pu être créé`, data: error.message })
            })
    })

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
        Coworking.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (result > 0) {
                    Coworking.findByPk(req.params.id)
                    .then ((coworking) =>{
                        res.json({ message: 'Le coworking a bien été mis à jour.', data: coworking })
                    })
                    .catch ((error) =>{
                        res.json({ mesage: `Une erreur est survenue`, data: error.message })
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
            .then ((coworking)=>{
                //B. Si un coworking correspond à l'ID alors on exécute la méthode .destroy()
                if (coworking) {
                    Coworking.destroy({ where: { id: req.params.id } })
                        //C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .finByPk()
                        .then((result) => {
                            res.json({ mesage: `Le coworking a bien été supprimé.`, data: coworking })
                        })
                        // D. Si la suppression a échoué, on retourne une réponse à POSTMAN
                        .catch((error) => {
                            res.json({ mesage: `La suppression a échoué.`, data: error.message })
                 })
                } else {
                    // B. Si aucun coworking ne correspond à l'ID alos on retourne une réponse à POSTMAN
                    res.json({ mesage: `Aucun coworking trouvé`})
                }

            })
             // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
            .catch((error) => {
                res.json({ mesage: `La requête n'a pas aboutie.` })

            })
        
    })
       
    
module.exports = router