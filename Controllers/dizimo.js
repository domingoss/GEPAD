const DizimoModel = require('../Models/Dizimo.js')
module.exports.controller = (app) => {

    app.post('/nucleo/:id', async (req, res)=> {
        const Dizimo = new DizimoModel({
          Valor: req.body.Valor,
          Dizimista_id: req.body.Dizimista,
          Nu_id:req.params.id
            
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

     app.get('/dizimo', async (req, res)=>{

      await DizimoModel.find({})
                        .populate('Dizimista_id')
                        .populate('Nu_id')
                        .lean()
                        .exec((error, dizimo)=>{
                               if(error){
                                   console.log(error)
                                   res.render('500', {error: error})
                               }else {
                                    
                                     res.render('dizimo/index', {Dizimo: dizimo})
                               }
       })
 
   })
 

}