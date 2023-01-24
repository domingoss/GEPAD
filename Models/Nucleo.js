/*const mongoose = require('mongoose')
const NucleoSchema = new mongoose.Schema({
  
  Designacao: String,
  Padroeiro_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Padroeiro'},
  Comunidade_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Comunidade'},
  Area: String,
  data_criacao: {type: Date, default: Date.now},
  data_actualizacao: {type: Date, default: Date.now }
}, {_id: false})
const NucleoModel =  mongoose.model('Nucleo', NucleoSchema)
module.exports = NucleoModel
*/