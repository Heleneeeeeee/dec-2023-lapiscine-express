const express = require('express')
const app = express()
const port = 3000


const mockCoworkings = require('./mock-coworking')

const logger = (req, res, next) => {
  const now = new Date ()
  const hours = now.getHours ();
  const minutes = now.getMinutes ();
  console.log (`${hours}h${minutes < 10 ?'0' + minutes : minutes}-${req.url} DANS LOGGER`)

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})