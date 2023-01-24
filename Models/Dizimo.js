const mongoose = require('mongoose')
const DizimoSchema = new mongoose.Schema({
  Valor: Number,
  Dizimista_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Dizimista'},
  Nu_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Nu'},
  Oferta: Number,
  data_criacao: {type: Date, default: Date.now},
  data_actualizacao: {type: Date, default: Date.now }
})

const DizimoModel = new mongoose.model('Dizimo', DizimoSchema)
module.exports = DizimoModel