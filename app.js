const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views');

app.use(express.static('public'))

const router = express.Router()

router.get('/', (req,res,next) => {
    res.render('lock', {
        title: 'Main Page'
    })
})

app.use(router)

app.listen(3000)
