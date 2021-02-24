const User = require('../models/user');

//Υποστηρίζει τη μέθοδο POST για την προσθήκη νέου χρήστη ή την αλλαγή password αν ο χρήστης υπάρχει ήδη.
//url: localhost:8765/evcharge/api/admin/usermod/:username/:password
exports.postUser = (req, res, next) => {
  console.log('We are in create/update User route');
  // const username = req.body.username;
  var username = req.param('username');
  var password = req.param('password');
  // const password = req.body.password;
  const email = req.body.email;
  const rank = req.body.rank;
  User.findOne({ where: { username: username } }).then(user => {
    if (user) {
      user
        .update({
          password: password,
        })
        .then(result => {
          console.log('changed password');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      User.create({
        rank: rank,
        username: username,
        password: password,
        email: email,
      })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
  // apanthsh pou gurizei
  res.send('<h1>Someone help!</h1>');
};

//Υποστηρίζει τη μέθοδο GET για την ανάγνωση των στοιχείων του συγκεκριμένου χρήστη
// localhost:8765/evcharge/api/admin/users/:username
exports.getUser = (req, res, next) => {
  var username = req.param('username');
  User.findOne({ where: { username: username } })
    .then(user => {
      if (user) {
        res.json(user);
        // .then(result => {
        //   console.log('changed password');
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      } else {
        res.send('<h1>User not found</h1>');
      }
    })
    .catch(err => {
      console.log(err);
    });

  console.log('We are in get user  route');
};

exports.postFileUpload = (req, res, next) => {
  console.log('We are in the Admins session  route');
  //Υποστηρίζει τη μέθοδο POST για το «ανέβασμα» αρχείου CSV με δεδομένα γεγονότων φόρτισης. Το αρχείο πρέπει να είναι κωδικοποιημένο ως πεδίο "file" σε multipart/form-data κωδικοποίηση
};
