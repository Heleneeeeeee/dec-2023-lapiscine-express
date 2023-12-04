const express = require('express')
const router = express.Router()
// const { Op } = require('sequelize')
const { Coworking } = require('../db/sequelizeSetup')

router
    .route('/')
    .get((req, res) => {
        console.log(req.query);
        Coworking.findAll()
            .then((results) => {
                res.json(results)
            })
            .catch(error => {
                res.json(error.message)
            })
    })
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
                    res.json({ message: 'Le coworking a bien été mis à jour.', data: result })
                } else {
                    res.json({ message: `Aucun coworking n'a été mis à jour.` })
                }
            })
            .catch(error => {
                res.json({ message: 'La mise à jour a échoué.', data: error.message })
            })
    }) 

    .delete((req, res) => {
        Coworking.destroy({ where: { id: req.params.id } })
            .then((result) => {
                res.json({ mesage: `Le coworking a bien été supprimé.`, data: result })
            })
            .catch((error) => {
                res.json({ mesage: `La suppression a échoué.`, data: error.message })
            })
    })
       
    
module.exports = router