const PadroeiroModel = require('../Models/Padroeiro.js')
module.exports.controller = (app) => {
  app.get('/padroeiro', async (req, res)=>{
    await PadroeiroModel.find({})
                      .lean()
                      .exec((error, padroeiro)=>{
                             if(error){
                                 console.log(error)
                                 res.render('500', {error: error})
                             }else {

                                   res.render('padroeiro/index', {Padroeiro: padroeiro})
                             }
     })

  })

  app.get('/padroeiro/new', async (req, res)=>{
     res.render('padroeiro/new')

  })


    app.post('/padroeiro/new', async (req, res)=> {
       const Padroeiro = new PadroeiroModel({
         Nome: req.body.Nome,

       })


       Padroeiro.save((error)=> {
          if(error){
            res.render('500', {error: error})
          }else{
            console.log('Padroeiro '+ Padroeiro.Nome+ ' cadastrado com sucesso')
            res.redirect(303, '/Padroeiro')
          }
       })
    })

    app.get('/padroeiro/edit/:id', async(req, res)=>{
      await PadroeiroModel.findById({_id: req.params.id})
                        .lean()
                        .exec((erro, padroeiro)=>{
                           if(erro){
                               console.log(erro)
                               res.send(erro)
                           }else{
                               res.render('padroeiro/edit',{
                                                              Padroeiro: padroeiro
                                                            })
                           }
                       })
    })


    app.post('/padroeiro/edit/:id', async (req, res) =>{
        await PadroeiroModel.updateOne({_id: req.params.id},{$set: {
          Nome: req.body.Nome,
          data_actualizacao:  Date(Date.now).toString()
        }}).exec((erro, padroeiro)=>{

            if (erro){
                console.log(erro)
            }else{
              console.log(' '+ padroeiro.Nome+ ' actualizado com sucesso')
              res.redirect(303, '/padroeiro')
            }
        })
      })



}
