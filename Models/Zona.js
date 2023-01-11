const mongoose = require('mongoose')
const ZonaSchema = new mongoose.Schema({
  Designacao: String,
  Padroeiro_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Padroeiro'},
  Area: String,
  data_criacao: {type: Date, default: Date.now},
  data_actualizacao: {type: Date, default: Date.now }
})

const ZonaModel = new mongoose.model('Zona', ZonaSchema)
module.exports = ZonaModel
