const path = require('path')
const fs = require('fs')

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

const redirectLogin = (req,res,next) => {
    errormessageVar = 'Please login first'
    res.redirect('/')
}

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
    
    redirectLogin(req,res,next)
})

router.get('/chess', (req,res,next) => {
    if (loggedIn === true) {
        return res.render('chess', {
            title: 'Chess'
        })
    }

    redirectLogin(req,res,next)
})

router.get('/gym', (req,res,next) => {
    if (loggedIn === true) {
        return res.render('gym', {
            title: 'Workout Schedule'
        })
    }

    redirectLogin(req,res,next)
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

//404

router.get('/*', (req,res,next) => {
    res.redirect('/')
    errormessageVar = 'Page not found: 404'
})

app.use(router)

app.listen(10000)

module.exports = router