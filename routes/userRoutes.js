const express = require('express')
const router = express.Router()
const {findAllUSers, createUser, findUserByPk,updateUser, deleteUser} = require('../controllers/userControllers')


router
    .route('/')
    .get(findAllUSers)
    .post(createUser)

router
    .route('/:id')
    .get(findUserByPk)
    .put(updateUser)
    .delete(deleteUser)
       
    
module.exports = router