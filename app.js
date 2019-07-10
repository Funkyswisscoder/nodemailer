const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (req,res) => {

    res.render('contact', { title: 'Node Mailer' })
})

app.post('/', (req,res) => {
    console.log(req.body)
    const html = `
        <p>Nouveau Message:</p>
        <p>Nom: ${req.body.name} </p>
        <p>Mail: ${req.body.email}</p>
        <p>Message: ${req.body.message}</p>
    `
    const text = `
    Nouveau Message:
    Nom: ${req.body.name} 
    Mail: ${req.body.email}
    Message: ${req.body.message}
    `
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.ionos.fr',
        port: 465,
        secure: true,
        auth: {
            user: "your mail",
            pass: "yourcode"
        },
        tls: {
            rejectUnauthorized : false
        }
    })

    const mailOptions = {
        from: `"Moi-même" <yourmailm>`,
        to: `yourmail as well`,
        subject: "Nouveau message nodeMailer",
        text: text,
        html: html
    }

    transporter.sendMail(mailOptions, error => {
        if(error){
            return console.error(error)
        }

        res.render('contact', { h1:'Vous nous avez bel et bien contacté', flash: 'le message a bien été envoyé!' })
    })
})




app.listen(3000, () => console.log('connecté sur le port 3000'))