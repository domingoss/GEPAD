const mongoose = require('mongoose')
const ComunidadeSchema = new mongoose.Schema({
  Designacao: String,
  Padroueiro_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Padroeiro'},
  Zona_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Zona'},
  Area: String
})



const ComunidadeModel = new mongoose.model('Comunidade', ComunidadeSchema)
module.exports = ComunidadeModel
