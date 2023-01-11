const DizimoModel = require('../Models/Dizimo.js')
module.exports.controller = (app) => {

    app.post('/nucleo/:id', async (req, res)=> {
        const Dizimo = new DizimoModel({
          Valor: req.body.Valor,
          Dizimista_id: req.body.Dizimista,
          Nucleo_id:req.params.id
            
        })
   
   
         Dizimo.save((error)=> {
           if(error){
             res.render('500', {error: error})
           }else{
             console.log(''+ Dizimo.Valor+ ' Contrbuido com sucesso')
             res.redirect(303, '/nucleo/'+req.params.id)
           }
        })
     })

}