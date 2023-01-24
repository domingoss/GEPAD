const UsuarioModel = require('../Models/Usuario')

module.exports.controller = (app) => {

var crypto = require('crypto');

   app.get('/registo', async(req, res)=>{
            res.render('user/index',{layout: 'blank'})
   })

/*      app.post('/registo', function(req, res, next) {
            var salt = crypto.randomBytes(16);
            crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
              if (err) { return next(err); }
              const Usuario = new UsuarioModel({

              })
              db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
                req.body.username,
                hashedPassword,
                salt
              ], function(err) {
                if (err) { return next(err); }
                var user = {
                  id: this.lastID,
                  username: req.body.username
                };
                req.login(user, function(err) {
                  if (err) { return next(err); }
                  res.redirect('/');
                });
              });
            });
          });
 */         
}