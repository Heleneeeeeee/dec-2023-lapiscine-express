// const { Op } = require('sequelize')
const { Coworking } = require('../db/sequelizeSetup')

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
    const newCoworking = { ...req.body }

    Coworking.create(newCoworking)
        .then((coworking) => {
            res.status(201).json({ message: 'Le coworking a bien été créé.', data: coworking })
            console.log(coworking)
        })
        .catch((error) => {
            res.status(500).json({ message: `Le coworking n'a pas pu être créé.`, data: error.message })
        })
}

const updateCoworking = (req, res) => {
    Coworking.findByPk(req.params.id)
        .then ((result) =>{
            if (result){
                return result.update(req.body)
                .then (()=>{
                    res.status(201).json({ message: 'Le coworking a bien été mis à jour.', data: result })
                }) 
        } else {
            res.status(404).json({ message: `Aucun coworking à mettre à jour n'a été trouvé.`, data: error.message })
        } 
    })
    .catch(error => {
        res.status(500).json({ message: 'La mise à jour a échoué.', data: error.message })
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


