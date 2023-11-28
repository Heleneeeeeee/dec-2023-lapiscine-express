const express = require('express')
//On construit une instance d'express
const app = express()
const port = 3000


const mockCoworkings = require('./mock-coworking')

const arrUsers = [
  {
    id : 12,
    name: "Paul",
    age:35
  },{
    id : 15,
    name: "Pierre",
    age:28
  },{
    id : 6,
    name: "Mathilde",
    age:19
  },
]

const logger = (req, res, next) => {
  const now = new Date ()
  const hours = now.getHours ();
  const minutes = now.getMinutes ();
  console.log (`${hours}h${minutes}-${req.url} DANS LOGGER`)

  next()
}

app.use(logger)

app.get('/', (req, res) => {
  res.send(`Page d'Accueil!`)
})

app.get('/api/coworkings', (req, res) => {
  res.send(`Il y a ${mockCoworkings.length} coworkings dans la liste`)
})

app.get('/api/coworkings/:id', (req, res) => {
  let result = mockCoworkings.find(el => el.id === parseInt(req.params.id))
  result = result ? result.name :`Aucun élement ne correspond à l'id n°${req.params.id}`
  res.send(result)
})
// création d'un nouvel endpoint qui permettra de récupérer un coworking en fonction de l'id passé en paramètre


app.get('/names', (req, res) => {
  let sentence = " "
  arrUsers.forEach(obj => {
    sentence += obj.name + " "
    }); 
    res.send(`${sentence}!`)
    //res.send ne renvoie qu'une seule et unique réponse
  })

app.get('/names/:id', (req, res) => {
  // Une requête ne peut renvoyer qu'une seule et unique réponse
  const urlId = parseInt(req.params.id)

  // for (let i = 0; i < arrUsers.length; i++) {
  //   const element = arrUsers[i];
  //   if (element.id === urlId) {
  //     result = arrUsers[i].name
  //     break;
  //   }
  // }


 let result = arrUsers.find(el => el.id === urlId)
  // if (!result) {
  //      result = "not found"
  //  } else {
  //      result = result.name
  // }
 

 result = result ? result.name : "not found" 
// on peut résumer le test précédent en une condition ternaire
 res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})