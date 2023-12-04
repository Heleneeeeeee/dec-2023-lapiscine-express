const express = require('express')
const router = express.Router()
const { Coworking } = require('../db/sequelizeSetup')
let mockCoworkings = require('../mock-coworking')
const coworkings = require('../models/coworkings')

router
    .route('/')
    .get((req, res) => {
        Coworking.findAll ()
            .then((coworkings) => {
                res.json(coworkings)
                console.log(coworkings)
            })
            . catch ((error) => {
                res.json(error.message)
            })    
    })

    .post((req, res) => {
        Coworking.update
        // const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
        // let coworking = { id: newId, ...req.body }
        // mockCoworkings.push(coworking)
            const newCoworking = {...req.body}
            
            // Coworking.create(newCoworking)
            
        // Coworking.create({
        //     name: "Oasis Coworking",
        //     price: { "hour": 4, "day": 21, "month": 100 },
        //     address: { "number": "68bis", "street": "avenue Jean Jaurès", "postCode": 33150, "city": "Cenon" },
        //     superficy: 200,
        //     capacity: 27,
        // })
        Coworking.create (newCoworking)
            .then((coworking) => {
                res.json({message: 'Le coworking a bien été créé', data:coworking})
                console.log(coworking)
            })
            . catch ((error) => {
                res.json({message: `Le coworking n'a pu être créé`, data:error.message})
            })    

        // const result = { message: `Le coworking a bien été ajouté`, data: newCoworking }
       
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
    Coworking.update({ name: "WIN Mériadeck" }, {
        where: {
            name: "WIN"
        }
    })
    .then((coworking) => {
        res.json({ message: 'Le coworking a bien été modifié', data: coworking });
        console.log(coworking);
    })
    .catch((error) => {
        res.json({ message: `Le coworking n'a pas pu être modifié`, data: error.message });
    });
})
        // let coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

        // let result;
        // if (coworking) {
        //     const newCoworking = { ...coworking, ...req.body }
        //     const index = mockCoworkings.findIndex(el => el.id === parseInt(req.params.id))
        //     mockCoworkings[index] = newCoworking
        //     result = { message: 'Coworking modifié', data: newCoworking }
        // } else {
        //     result = { message: `Le coworking n'existe pas`, data: {} }
        // }

        // res.json(result)


    .delete((req, res) => {
        Coworking.destroy({
            where: {
                name: "Oasis Coworking"
            }
        })
        .then((coworking) => {
            res.json({ message: 'Le coworking a bien été supprimé', data: coworking });
            console.log(coworking);
        })
        .catch((error) => {
            res.json({ message: `Le coworking n'a pas pu être supprimé`, data: error.message });
        });
    });
        // const coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

        // let result;
        // if (coworking) {
        //     mockCoworkings = mockCoworkings.filter(el => el.id !== coworking.id)
        //     result = { message: 'Coworking supprimé', data: coworking }
        // } else {
        //     result = { message: `Le coworking n'existe pas`, data: {} }
        // }

        // res.json(result)
    
module.exports = router