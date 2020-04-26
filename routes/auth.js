const User = require('../schemas/User');

const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  app.post('/register', (req, res) => {
    passport.authenticate('registerUser', (err, user, info) => {
      if (err) console.log(err);

      if (info !== undefined) {
        res.status(400).send(info);
      } else {
        req.logIn(user, (err) => {
          const data = {
            email: req.body.email,
            created_at: Date.now(),
            updated_at: Date.now(),
          };

          user.update(data).then(() => {
            console.log('User created');
            res.status(200).send({ message: 'User created' });
          });
        });
      }
    })(req, res);
  });

  app.post('/login', (req, res) => {
    passport.authenticate('loginUser', (err, user, info) => {
      if (err) console.log(err);

      if (info !== undefined) {
        res.status(400).send(info);
      } else {
        req.logIn(user, (err) => {
          User.findOne({
            where: {
              username: user.username,
            },
          }).then((user) => {
            const token = jwt.sign(
              {
                id: user.id,
              },
              process.env.SECRET_JWT
            );

            res.status(200).send({
              token,
            });
          });
        });
      }
    })(req, res);
  });

  app.get('/logged', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send({ message: "You're logged in !" });
  });
};