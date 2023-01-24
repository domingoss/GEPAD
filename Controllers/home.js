const PadroeiroModel = require('../Models/Padroeiro.js')
const ComunidadeModel = require('../Models/Comunidade.js')
const ZonaModel = require('../Models/Zona.js')
const NuModel = require('../Models/Nu.js')
const DizimistaModel = require('../Models/Dizimista.js')

module.exports.controller = (app) => {
  app.get('/', async (req, res)=>{

    const Nucleos = await NuModel.countDocuments({}) 
    const Comunidades = await ComunidadeModel.countDocuments({})
    const Zonas = await  ZonaModel.countDocuments({})
    const Dizimistas = await DizimistaModel.countDocuments({})
    const Padroeiros= await PadroeiroModel.countDocuments({})  

    res.render('home/index', {
                              Nucleos: Nucleos, 
                              Comunidades: Comunidades,   
                              Zonas: Zonas,
                              Dizimistas: Dizimistas,
                              Padroeiros: Padroeiros
                            })
    
  })

}
