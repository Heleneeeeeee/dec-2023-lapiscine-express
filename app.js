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

app.post('/api/coworkings', (req, res) => {
  // let coworking = req.body
  const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
  // let coworking = {superficy : req.body.superficy, capacity : req.body.capacity, name: req.body.name}

  //... SPREAD OPERATOR
  let coworking = {id: newId,...req.body}
  mockCoworkings.push(coworking)

 const result ={message :'Le coworking a bien été ajouté', data : coworking} 
  res.json(result)
})

app.put('/api/coworkings/:id',(req,res)=>{
  const coworking = mockCoworkings.find(el => el.id === parseInt(req.params.id))
  
  let result;
  if (coworking) {
    coworking.superficy = req.body.superficy
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