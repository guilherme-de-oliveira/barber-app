const db = require("../models");
const User = db.user;

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
                resolve([{ message: 'User Not found.'}]);
            }
    
            resolve(users);
        })
    })

}

module.exports = {
    getByEmail
}