const express = require('express')
const router = express.Router()
const { Coworking } = require('../db/sequelizeSetup')
let mockCoworkings = require('../mock-coworking')

router
    .route('/')
    .get((req, res) => {
        res.json(mockCoworkings)
    })
    .post((req, res) => {
        // const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
        // let coworking = { id: newId, ...req.body }
        // mockCoworkings.push(coworking)
        Coworking.create({
            name: "Oasis Coworking",
            price: { "hour": 4, "day": 21, "month": 100 },
            address: { "number": "68bis", "street": "avenue Jean Jaurès", "postCode": 33150, "city": "Cenon" },
            superficy: 200,
            capacity: 27,
        })

        const result = { message: `Le coworking a bien été ajouté` }
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
        const coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

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