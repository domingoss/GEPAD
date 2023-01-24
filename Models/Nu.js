const mongoose = require('mongoose')
const NuSchema = new mongoose.Schema({
  
  Designacao: String,
  Padroeiro_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Padroeiro'},
  Comunidade_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Comunidade'},
  Area: String,
  data_criacao: {type: Date, default: Date.now},
  data_actualizacao: {type: Date, default: Date.now }
})
const NuModel =  mongoose.model('Nu', NuSchema)
module.exports = NuModel
