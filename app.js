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
let loggedInTimes = 0
let errormessageVar = ''

router.get('/', (req,res,next) => {
    res.render('lock', {
        title: 'Main Page',
        errormessage: errormessageVar
    })
})

router.get('/homepage', (req,res,next) => {
    if (loggedIn === true) {
        loggedInTimes += 1

        if (loggedInTimes === 10) {
            loggedIn = false
            loggedInTimes = 0
            errormessageVar = 'Login expired; please login again'
            return res.redirect('/')
        }
        
        return res.render('homepage', {
            title: "Homepage"
        })
    } 
    
    errormessageVar = 'Please login first'
    res.redirect('/')
})

router.post('/login', (req,res,next) => {
    const body = req.body
    let input = body.input


     if (input != 'mathy') {
        errormessageVar = 'Please enter the correct password'
        return res.redirect('/')
    }

    loggedIn = true
    errormessageVar = ''
    res.redirect('/homepage')
})

app.use(router)

app.listen(10000)

module.exports = router