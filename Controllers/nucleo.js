const PadroeiroModel = require('../Models/Padroeiro.js')
const ComunidadeModel = require('../Models/Comunidade.js')
const NucleoModel = require('../Models/Nucleo.js')
const DizimistaModel = require('../Models/Dizimista.js')

module.exports.controller = (app) => {
  app.get('/nucleo', async (req, res)=>{

     await NucleoModel.find({})
                       .populate('Comunidade_id')
                       .lean()
                       .exec((error, nucleo)=>{
                              if(error){
                                  console.log(error)
                                  res.render('500', {error: error})
                              }else {

                                    res.render('nucleo/index', {Nucleo: nucleo})
                              }
      })

  })

  app.get('/nucleo/new', async (req, res)=>{
    const Padroeiro = await PadroeiroModel.find({})
                                          .lean()
    const Comunidade = await ComunidadeModel.find({})
                                            .lean()

     res.render('nucleo/new', {Comunidade: Comunidade, Padroeiro: Padroeiro})

  })

  app.post('/nucleo/new', async (req, res)=> {
     const Nucleo = new NucleoModel({
       Designacao: req.body.Designacao,
       Padroeiro_id: req.body.Padroeiro,
       Comunidade_id:req.body.Comunidade,
       Area: req.body.Area

     })


      Nucleo.save((error)=> {
        if(error){
          res.render('500', {error: error})
        }else{
          console.log(''+ Nucleo.Designacao+ ' cadastrado com sucesso')
          res.redirect(303, '/nucleo')
        }
     })
  })
  
  app.get('/nucleo/edit/:id', async(req, res)=>{
    await NucleoModel.findById({_id: req.params.id})
                      .lean()
                      .exec((erro, nucleo)=>{
                         if(erro){
                             console.log(erro)
                             res.send(erro)
                         }else{
                             res.render('nucleo/edit',{
                                      Nucleo: nucleo                                                          })
                         }
                     })
  })

  app.post('/nucleo/edit/:id', async (req, res) =>{
      await NucleoModel.updateOne({_id: req.params.id},{$set: {
        Designacao: req.body.Designacao,
        Padroueiro_id: req.body.Padroeiro,
        Comunidade_id:req.body.Comunidade,
        Area: req.body.Area,
        data_actualizacao:  Date(Date.now).toString()
      }}).exec((erro, nucleo)=>{

          if (erro){
              console.log(erro)
          }else{
            console.log(''+ nucleo.Designacao+ ' actualizado com sucesso')
            res.redirect(303, '/nucleo')
          }
      })
    })


    app.get('/nucleo/:id', async(req, res)=>{
      const Membros = await DizimistaModel.find({Nucleo_id: req.params.id})
                                          .lean()
      
      const MembrosTotal = Membros.length

      await NucleoModel.findById({_id: req.params.id})
                        .populate('Padroeiro_id')
                        .populate('Comunidade_id')
                        .lean()
                        .exec((erro, nucleo)=>{
                           if(erro){
                               console.log(erro)
                               res.send(erro)
                           }else{
                               res.render('nucleo/show',{
                                                        Nucleo: nucleo, 
                                                        Membros: Membros,
                                                        MembrosTotal: MembrosTotal
                                                      })
                           }
                       })
  
    })
  





}
