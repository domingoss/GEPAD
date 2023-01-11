//conf
//DEPENDENCIES_CONF
const express = require ('express');
const path = require('path')
const fs= require ('file-system');
const handlebars = require ('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const port = 3000


//SETUP MONGOOSE DB
require('./Lib/mongoose.js')


/
app.use(bodyParser.urlencoded({extended: true}))

// CONF PARA FICHEIROS PUBLICOS
app.use(express.static(__dirname+'/public'))


//ESTRUTURA MVC (VIEWS)
handlebars.create({defaultLayout:'main'})
app.engine('handlebars',handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './Views');


//ESTRUTURA MVC (CONTROLLERS)
fs.readdirSync('Controllers').forEach(function (file) {
    if(file.substr(-3) == '.js'){
        const route = require('./Controllers/'+ file)
        route.controller(app)
    }
})


//ERRO 500 CUSTOMIZADO
app.use(function(err,req, res, next){
    console.error(err.stack)
    res.status(505)
    res.render('500', {error: err.stack})
})

//ERRO 404 CUSTOMIZADO
app.use(function (req, res){
    res.status(404)
    res.render('404', {error: err.stack})
})





//SERVIDOR ESCUTA NA PORTA 3000
app.listen(port, ()=> {
    console.log("Servidor iniciado na porta :3000")
})
