// import { user } from "../models";
const db = require("../models");
const User = db.user;

// exports.allAccess = (req, res) => {
//     res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//     res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//     res.status(200).send("Admin Content.");
// };

async function getByName(param) {
    return new Promise((resolve) => {
        console.log('opaaa');
        // return 'ok'
        // let resp = '';
        User.find({
            role: 'barber',
            username: new RegExp(param, 'i'),
        }, 
        'username email phoneNumber'
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
    getByName
}