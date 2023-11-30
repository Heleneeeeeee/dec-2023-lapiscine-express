const express = require('express')
const morgan = require ('morgan')
const app = express()
const port = 3000


let mockCoworkings = require('./mock-coworking')

app.use(express.json()) 
//middleware qui nous permet de interpréter le corps de ma requête (req.body) en format Json
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json(`Page d'Accueil!`)
})

app.get('/api/coworkings', (req, res) => {
  res.json(mockCoworkings)
})

app.get('/api/coworkings/:id', (req, res) => {
  let result = mockCoworkings.find(el => el.id === parseInt(req.params.id))

  result = result ? result.name :`Aucun élement ne correspond à l'id n°${req.params.id}`
  res.json(result)
})

// implémenter le endpoint post qui renvoie une réposne "post fonctionne"
app.post('/api/coworkings/', (req, res) => {
  // Ajouter le coworking dans le tableau, en automatisant la génération d'un id. On récupère le dernier élément du tableau et on ajoute +1 à son id.
  // let coworking = req.body
  
  const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
  // let coworking = {superficy : req.body.superficy, capacity : req.body.capacity, name: req.body.name}

  //... SPREAD OPERATOR
  let coworking = {id: newId,...req.body}
  mockCoworkings.push(coworking)

  //On renvoie un objet qui contient les proriétés message et data
  // message: `Le coworking a bien été ajouté`
 const result ={message :'Le coworking a bien été ajouté', data : coworking} 
  res.json(result)
})

// implémenter le endpoint put coworkings avec :id, ainsi que la requête correspondante dans Postman
app.put('/api/coworkings/:id',(req,res)=>{
  // la méthode find renvoie un nouvel objet, clone de celui contenu dans le tableau
  let coworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))
  
  let result;
  if (coworking) {
    // coworking.superficy = req.body.superficy

    //DISTINCTION IMPORTANTE entre l'id des objets contenus dans le tableau,
    //et l'index de ces objets dans le tableau, par exemple: Oasis Coworking a pour .id 12 et pour index dans le tableau [2]
    const newCoworking = {...coworking, ...req.body}
    const index = mockCoworkings.findIndex(el=> el.id === parseInt(req.params.id))
    mockCoworkings[index] = newCoworking
    result ={message :'coworking modifié', data : coworking}
  } else {
    result  = {message :`Le coworking n'existe pas`, data: {}}
  }
 
  res.json (result)
})

app.delete('/api/coworkings/:id', (req,res)=>{
  const coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

  let result;
  if (coworking) {
    mockCoworkings = mockCoworkings.filter(el =>el.id !== coworking.id)
    result ={message :'coworking supprimé', data : coworking}
  }else {
    result  = {message :`Le coworking n'existe pas`, data: {}}
  }
  res.json(result)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})