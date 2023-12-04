const express = require('express')
const router = express.Router()

router
    .route('/')
    .get((req, res)=>{
        User.findAll()
            .then((user)=>{
                res.json(user)
            })
            .catch ((error)=>{
                
            })
        

    })

    .post((req, res)=>{
        res.json('La route POST fonctionne bien')

    })

router
    .route('/:id')
    .get((req, res)=>{
        res.json('La route GET ID fonctionne bien')

    })

    .put((req, res)=>{
        res.json('La route PUT fonctionne bien')

    })

    .delete((req,res)=>{
        res.json('La route DELETE fonctionne bien')

    })

    module.exports = router