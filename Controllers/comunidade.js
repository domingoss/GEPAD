const ZonaModel = require('../Models/Zona.js')
const PadroeiroModel = require('../Models/Padroeiro.js')
const ComunidadeModel = require('../Models/Comunidade.js')

module.exports.controller = (app) => {

  app.get('/comunidade', async (req, res)=>{

     await ComunidadeModel.find({})
                       .lean()
                       .populate('Zona_id')
                       .exec((error, comunidade)=>{
                              if(error){
                                  console.log(error)
                                  res.render('500', {error: error})
                              }else {

                                    res.render('comunidade/index', {Comunidade: comunidade})
                              }
      })

  })

  app.get('/comunidade/new', async (req, res)=>{
    const Padroeiro = await PadroeiroModel.find({})
                                          .lean()
    const Zona = await ZonaModel.find({})
                                .lean()

     res.render('comunidade/new', {Zona: Zona, Padroeiro: Padroeiro})

  })

  app.post('/comunidade/new', async (req, res)=> {
     const Comunidade = new ComunidadeModel({
       Designacao: req.body.Designacao,
       Padroueiro_id: req.body.Padroeiro,
       Zona_id:req.body.Zona,
       Area: req.body.Area

     })


      Comunidade.save((error)=> {
        if(error){
          res.render('500', {error: error})
        }else{
          console.log('Comunidade '+ Comunidade.Designacao+ ' cadastrado com sucesso')
          res.redirect(303, '/comunidade')
        }
     })
  })

  app.get('/comunidade/edit/:id', async(req, res)=>{
    const Padroeiro = await PadroeiroModel.find({})
                                          .lean()

    const Zona = await ZonaModel.find({}).lean()
    
    await ComunidadeModel.findById({_id: req.params.id})
                      .lean()
                      .exec((erro, comunidade)=>{
                         if(erro){
                             console.log(erro)
                             res.send(erro)
                         }else{
                             res.render('comunidade/edit',{
                                                          Comunidade: comunidade,
                                                          Zona: Zona,
                                                          Padroeiro: Padroeiro
                                                        })
                         }
                     })
  })

  app.post('/comunidade/edit/:id', async (req, res) =>{
      await ComunidadeModel.updateOne({_id: req.params.id},{$set: {
        Designacao: req.body.Designacao,
        Padroeiro_id: req.body.Padroeiro,
        Zona_id: req.body.Zona,
        Area: req.body.Area,
        data_actualizacao:  Date(Date.now).toString()
      }}).exec((erro, comunidade)=>{

          if (erro){
              console.log(erro)
          }else{
            console.log(''+ comunidade.Designacao+ ' actualizado com sucesso')
            res.redirect(303, '/comunidade')
          }
      })
    })

}
