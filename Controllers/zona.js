const ZonaModel = require('../Models/Zona.js')
const PadroeiroModel = require('../Models/Padroeiro.js')
module.exports.controller = (app) => {

  //metodo que carrega pagina /zona e lista todas zonas
  app.get('/zona', async (req, res)=>{

     await ZonaModel.find({})
                       .lean()
                       .exec((error, zona)=>{
                              if(error){
                                  console.log(error)
                                  res.render('500', {error: error})
                              }else {

                                    res.render('zona/index', {Zona: zona})
                              }
      })

  })

//metedo que carrega todos padroeiros na pagina zona/new
  app.get('/zona/new', async (req, res)=>{
    await PadroeiroModel.find({})
                      .lean()
                      .exec((error, padroeiro)=>{
                             if(error){
                                 console.log(error)
                                 res.render('500', {error: error})
                             }else {

                                      res.render('zona/new', {Padroeiro: padroeiro})
                             }
     })

  })

  //Metodo que cadastra a zona

  app.post('/zona/new', async (req, res)=> {
     const Zona = new ZonaModel({
       Designacao: req.body.Designacao,
       Padroeiro_id: req.body.Padroeiro,
       Area: req.body.Area

     })


     Zona.save((error)=> {
        if(error){
          res.render('500', {error: error})
        }else{
          console.log('Zona '+ Zona.Designacao+ ' cadastrado com sucesso')
          res.redirect(303, '/zona')
        }
     })
  })

  app.get('/zona/edit/:id', async(req, res)=>{
    const Padroeiro = await PadroeiroModel.find({})
                                          .lean()

    await ZonaModel.findById({_id: req.params.id})
                      .lean()
                      .exec((erro, zona)=>{
                         if(erro){
                             console.log(erro)
                             res.send(erro)
                         }else{
                             res.render('zona/edit',{
                                                          Zona: zona,
                                                        Padroeiro: Padroeiro                                                         })
                         }
                     })
  })

  app.post('/zona/edit/:id', async (req, res) =>{
      await ZonaModel.updateOne({_id: req.params.id},{$set: {
        Designacao: req.body.Designacao,
        Padroeiro_id: req.body.Padroeiro,
        Area: req.body.Area,
        data_actualizacao:  Date(Date.now).toString()
      }}).exec((erro, zona)=>{

          if (erro){
              console.log(erro)
          }else{
            console.log(''+ zona.Designacao+ ' actualizado com sucesso')
            res.redirect(303, '/zona')
          }
      })
    })


}
