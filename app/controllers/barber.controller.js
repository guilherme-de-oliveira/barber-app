const db = require("../models");
const User = db.User;

async function getByEmail(param) {
    return new Promise((resolve) => {
        console.log('barber controller')
        console.log(param)
        User.find({
            role: 'barber',
            email: param
        }, 
        )
        .exec((err, users) => {
            console.log('users, ', users)
            console.log('err, ', err)
            if (err) {
                resolve([{ message: err }]);
            }
    
            if (users.length === 0) {
                resolve([{ message: 'Baber Not found.'}]);
            }
    
            resolve(users);
        })
    })
}

async function udpateUser(param) {
    return new Promise((resolve, reject) => {
         
    // var obj = {
    //     name: req.body.name,
    //     desc: req.body.desc,
    //     img: {
    //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //         contentType: 'image/png'
    //     }
    // }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
      });
    
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            resolve({ message: "User was registered successfully!" });
          });
        });
      });
    })
}

module.exports = {
    getByEmail,
    udpateUser
}