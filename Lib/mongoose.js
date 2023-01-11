//DB_CONF
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://2960:2960@cluster0.njj4f.mongodb.net/Gepad?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'falha na conexao'))
db.once('open', function(){
    console.log('DB connectada com sucesso!')
})
