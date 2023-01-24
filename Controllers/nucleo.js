const PadroeiroModel = require('../Models/Padroeiro.js')
const ComunidadeModel = require('../Models/Comunidade.js')

const DizimistaModel = require('../Models/Dizimista.js')
const DizimoModel = require('../Models/Dizimo.js')
const NuModel = require('../Models/Nu')

module.exports.controller = (app) => {
  app.get('/nucleo', async (req, res)=>{

     await NuModel.find({})
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

 /* app.post('/nucleo/new', async (req, res)=> {
  
    const Nu = new NuModel({
       Designacao: req.body.Designacao,
       Padroeiro_id: req.body.Padroeiro,
       Comunidade_id:req.body.Comunidade,
       Area: req.body.Area

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
  })*/
  
 

  
  
  app.get('/nucleo/edit/:id', async(req, res)=>{

    const Padroeiro = await PadroeiroModel.find({})
                                          .lean()

    const Comunidade = await ComunidadeModel.find({})
                                            .lean()

    await NuModel.findById({_id: req.params.id})
                      .lean()
                      .exec((erro, nucleo)=>{
                         if(erro){
                             console.log(erro)
                             res.send(erro)
                         }else{
                             res.render('nucleo/edit',{
                                      Nucleo: nucleo,
                                      Padroeiro: Padroeiro,
                                      Comunidade: Comunidade                                                          })
                         }
                     })
  })

  app.post('/nucleo/edit/:id', async (req, res) =>{
      await NuModel.updateOne({_id: req.params.id},{$set: {
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

      const Contribuicoes = await DizimoModel.find({Nu_id: req.params.id})
      const TotalContribuicoes = Contribuicoes.length
      var TotalContribuido = 0
      Contribuicoes.forEach(elemento => {
        TotalContribuido += elemento.Valor
      });


      console.log(TotalContribuido)
      
      const Membros = await DizimistaModel.find({Nu_id: req.params.id})
                                          .lean()

                                          console.log(Membros)
      
      const MembrosTotal = Membros.length

      await NuModel.findById({_id: req.params.id})
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
                                                        MembrosTotal: MembrosTotal,
                                                        TotalContribuicoes: TotalContribuicoes,
                                                        TotalContribuido: TotalContribuido

                                                      })
                           }
                       })
  
    })
  





}
