const {Coworking} = require('../db/sequelizeSetup')

const findAllCoworkings = ((req, res) => {
    console.log(req.query);
    Coworking.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.json(error.message)
        })
})

const createNewCoworking = ((req, res) => {
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

module.exports={findAllCoworkings, createNewCoworking}


