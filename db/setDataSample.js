const mockCoworkings = require('./mock-coworkings')
const mockUsers = require ('./mock-users')
const bcrypt = require ('bcrypt')


const setCoworkings = (Coworking) => { 
    mockCoworkings.forEach(element => {
    const newCoworking = {...element}
    Coworking.create(newCoworking)
        .then(() => { })
        .catch((error) => {
            console.log(error.message)
        })
    })
}

const setUsers = (User) => {
    mockUsers.forEach(user => {
    bcrypt.hash(user.password, 10)
        .then((hashResult)=> {
            User.create({ ...user, password: hashResult })
                .then(() => { })
                .catch((error) => {
                    console.log(error.message)
                })
         })

    })
}

const setRoles = (Role) => {
    Role.create({ label: "admin"})
    Role.create({ label: "edit"})
}

module.exports = {setCoworkings, setUsers, setRoles}

