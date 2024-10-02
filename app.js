const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views');

const router = express.Router()

router.get('/', (req,res,next) => {
    res.render('index')
})

router.get('/niga', (req,res,next) => {
    res.render('niga')
})

app.use(router)

app.listen(3000)
