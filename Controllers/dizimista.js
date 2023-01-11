const DizimistaModel = require('../Models/Dizimista.js')
const NucleoModel = require('../Models/Nucleo.js')

module.exports.controller = (app) => {

    app.get('/dizimista', async (req, res)=>{

        await DizimistaModel.find({})
                          .lean()
                          .populate('Nucleo_id')
                          .exec((error, dizimista)=>{
                                 if(error){
                                     console.log(error)
                                     res.render('500', {error: error})
                                 }else {
   
                                       res.render('dizimista/index', {Dizimista: dizimista})
                                 }
         })
   
     })

     app.get('/dizimista/new', async (req, res)=>{
       
        const Nucleo = await NucleoModel.find({})
                                        .lean()
    
         res.render('dizimista/new', {Nucleo: Nucleo})
    
      })
   

      app.post('/dizimista/new', async (req, res)=> {

        const total = await DizimistaModel.countDocuments({})
        const Cartao = 'C-'+total
        const Dizimista = new DizimistaModel({
          Nome: req.body.Nome,
          Email: req.body.Email,
          Nucleo_id:req.body.Nucleo,
          Cartao: Cartao
   
        })
   
   
         Dizimista.save((error)=> {
           if(error){
             res.render('500', {error: error})
           }else{
             console.log('Dizimista '+ Dizimista.Nome+ ' cadastrado com sucesso')
             res.redirect(303, '/Dizimista')
           }
        })
     })
   
     app.get('/dizimista/edit/:id', async(req, res)=>{
       await DizimistaModel.findById({_id: req.params.id})
                         .lean()
                         .exec((erro, dizimista)=>{
                            if(erro){
                                console.log(erro)
                                res.send(erro)
                            }else{
                                res.render('dizimista/edit',{
                                                            Dizimista: dizimista                                                          })
                            }
                        })
     })
   
     app.post('/dizimista/edit/:id', async (req, res) =>{
         await DizimistaModel.updateOne({_id: req.params.id},{$set: {
            Nome: req.body.Nome,
            Email: req.body.Email,
            Nucleo_id:req.body.Nucleo,
            data_actualizacao:  Date(Date.now).toString()
         }}).exec((erro, dizimista)=>{
   
             if (erro){
                 console.log(erro)
             }else{
               console.log(''+ dizimista.Nome+ ' actualizado com sucesso')
               res.redirect(303, '/dizimista')
             }
         })
       })




}