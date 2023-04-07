const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const exphbs = require('express-handlebars');

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
})
)
app.set('view engine', '.hbs');

app.use('/', require('./routes/textImage'))

const PORT = 3000

app.listen(PORT, ()=>{
  console.log(`Serveer running on port: ${PORT}`)
})