const express = require('express')
const router = express.Router()
const {findAllUSers, createUser, findUserByPk,updateUser, deleteUser} = require('../controllers/userControllers')
const {login, protect, restrict} = require ('../controllers/authControllers')

router
    .route('/')
    .get(findAllUSers)
    .post(createUser)

router
    .route('/login')
    .post(login)

router
    .route('/:id')
    .get(findUserByPk)
    .put(updateUser)
    .delete(protect,deleteUser)
       
    
module.exports = router