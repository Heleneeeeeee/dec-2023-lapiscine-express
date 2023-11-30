const express = require('express')
const router = express.Router()
let mockCoworkings = require ("../mock-coworking")

router
    .route('/')                     //methode pour récupérer l'url
    .get((req, res) => {            // fonction de call back
        res.json(mockCoworkings)
    })
    .post((req, res) => {
        const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
        let coworking = { id: newId, ...req.body }
        mockCoworkings.push(coworking)
        const result = { message: `Le coworking a bien été ajouté`, data: coworking }
        res.json(result)
    })

router
    .route('/:id')
    .get((req, res) => {
        let result = mockCoworkings.find(el => el.id === parseInt(req.params.id))

        if (!result) {
            result = `Aucun élément ne correspond à l'id n°${req.params.id}`
        }
        res.json(result)
    })
    .put((req, res) => {
        let coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

        let result;
        if (coworking) {
            const newCoworking = { ...coworking, ...req.body }
            const index = mockCoworkings.findIndex(el => el.id === parseInt(req.params.id))
            mockCoworkings[index] = newCoworking
            result = { message: 'Coworking modifié', data: newCoworking }
        } else {
            result = { message: `Le coworking n'existe pas`, data: {} }
        }

        res.json(result)
    })
    .delete((req, res) => {
        let coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

        let result;
        if (coworking) {
            mockCoworkings = mockCoworkings.filter(el => el.id !== coworking.id)
            result = { message: 'Coworking supprimé', data: coworking }
        } else {
            result = { message: `Le coworking n'existe pas`, data: {} }
        }

        res.json(result)
    })

module.exports = router