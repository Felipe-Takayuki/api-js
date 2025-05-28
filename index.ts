const express = require('express')
const app = express();
app.use(express.json())

const port = 3000;

let nextId =1;
class User{
  id:number
  name:string
  email: string
  
}

function validarNomeUsuario(req, res, next) {
  const { name } = req.body
  if (!name || typeof name !=='string' || name.trim() === '') {
    return res.status(400).json({erro: "O campo 'name' é obrigatório e deve ser uma string válida"})
  }
  next()
}
const users = []

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.get('/user/:id',(req,res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id = id)
  res.json(user)
})

app.get('/user', (_, res) => {
   res.status(200).json(users)
})

app.post('/user',validarNomeUsuario,(req, res) => {

    const { name } = req.body
    if (!name) {
      return res.status(400).json({ erro: "Nome é obrigatório" })
    }
    const newUser =new User(name)
    users.push(newUser)
    res.status(201).json({mensagem: "Usuário criado!", usuario: newUser})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

