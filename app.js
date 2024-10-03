const path = require('path')
const URLSearchParams = require('url')

const express = require('express')
const bodyparser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views');

app.use(express.static('public'))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

const router = express.Router()

let loggedIn = false
let errormessageVar = ''

router.get('/', (req,res,next) => {
    res.render('lock', {
        title: 'Main Page',
        errormessage: errormessageVar
    })
})

router.get('/homepage', (req,res,next) => {
    if (loggedIn === true) {
        res.render('homepage', {
            title: "Homepage"
        })
    }
})

router.post('/login', (req,res,next) => {
    const body = req.body
    let input = body.input


     if (input != 'mathy') {
        errormessageVar = 'Please enter the correct password'
        res.redirect('/')
    } else {
        loggedIn = true
        errormessageVar = ''
        res.redirect('/homepage')
    }
})

app.use(router)

app.listen(3000)

module.exports = router