const NuModel = require("../Models/Nu")

module.exports.controller = (app) => {
       app.get('/nucleo/cadastra', async (req, res)=> {
            
            const Nu = new NuModel({
               Designacao: req.query.Designacao,
               Padroeiro_id: req.query.Padroeiro,
               Comunidade_id:req.query.Comunidade,
               Area: req.query.Area
        
             })
                  
           Nu.save((error)=> {
                if(error){
                  console.log(error)
                 // res.render('500', {error: error})
                  
                }else{
                  console.log(''+ Nu.Designacao+ ' cadastrado com sucesso')
                  res.redirect(303, '/nucleo')
                }
             })
          })
}