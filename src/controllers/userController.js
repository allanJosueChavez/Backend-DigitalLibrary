'use strict'

var bcrypt = require("bcrypt-nodejs");
const User = require('../models/user');
const jwt = require("../services/jwt");
var order;

function login(req, res) {
    const user = new User();
    var params = req.body;

    if (params.password === "admin" && params.email === "admin") {
        User.findOne({ email: "admin" }, (err, admin) => {

            if (err) return res.status(500).send({ message: 'An error has occurred with the user admin request' })
            if (!admin) {

                user.email = "admin"
                user.password = "admin"
                user.user_name = "admin";
                user.rol = "admin";
                user.save((err, userSaved) => {
                    if (err) return res.status(500).send({ message: 'Ops! Something failed. Please try again.' })
                    if (userSaved) {
                        // userSaved.password = undefined;
                        res.status(200).send({ message: 'The user by defect in the system is admin, and has adminstrator permissions', user: userSaved })
                    } else {
                        res.status(404).send({ message: 'The user could not be added.' })
                    }
                })
            }
            if (admin) {
                return res.status(200).send({ token: jwt.createToken(admin) });
            }
        })


    } else {

        User.findOne({ email: params.email }, (err, emailFound) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the user request' })
            if (emailFound) {
                console.log(params.email);
                bcrypt.compare(params.password, emailFound.password, (err, correct) => {
                    if (correct) {
                        userLogged.password = undefined;
                        return res.status(200).send({ token: jwt.createToken(emailFound) });
                    } else {
                        return res.status(200).send({ message: "The email or password are wrong." })
                    }
                })
            } else {
                return res.status(404).send({ message: 'The user does not exists.' })
            }
        }
        )
    }
}


function addUser(req, res) {
    const user = new User();
    var params = req.body;
    if (req.user.rol == "admin") {
        if (params.carnet_cui && params.user_name && params.user_lastName && params.password && params.email && params.rol) {
            user.carnet_cui = params.carnet_cui
            user.user_name = params.user_name
            user.user_lastName = params.user_lastName
            user.email = params.email
            user.password = params.password
            user.rol = params.rol;

            User.find({
                $or: [
                    { carnet_cui: user.carnet_cui }
                ]
            }).exec((err, existingUser) => {
                // if (existingUser) return res.status(404).send({message: 'The user exists already.'})
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request' })
                if (existingUser && existingUser.length >= 1) {
                    return res.status(500).send({ message: 'The user exists already.' })
                } else {
                    user.save((err, userSaved) => {
                        if (err) return res.status(500).send({ message: 'Ops! Something failed. Please try again.' })
                        if (userSaved) {
                            res.status(200).send({ message: 'User registered successfully.', user: userSaved })
                        } else {
                            res.status(404).send({ message: 'The user could not be added.' })
                        }
                    })
                }
            })
        } else {
            res.status(500).send({ message: 'Have not been filled all the fields. Please fill it.' })
        }
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}
function editUser(req, res) {
    var userId = req.params.idUser
    var params = req.body
    if (req.user.rol == "admin") {
        User.findByIdAndUpdate(userId, params, { new: true }, (err, userUpdated) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
            if (!userUpdated) return res.status(404).send({ message: 'The user has not been found.' })
            return res.status(200).send({ userUpdated })
        })
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}

function deleteUser(req, res) {
    var userId = req.params.idUser
    if (req.user.rol == "admin") {
        User.findByIdAndDelete(userId, (err, userDeleted) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
            if (!userDeleted) return res.status(404).send({ message: 'The user has not been found.' })
            return res.status(200).send({ usersFound })
        })
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}

function getUserById(req, res) {
    if (req.user.rol == "admin") {
        var userId = req.params.idUser
        User.findById(userId, (err, userFound) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
            if (!userFound) return res.status(404).send({ message: 'The user has not been found.' })
            return res.status(200).send({ userFound })
        })
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}

function getUsersById(req, res) {
    order = req.params.order;
    if (req.user.rol == "admin") {
        if (order === "ascendant") {
            User.find().sort({ _id: 1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })

        } else if (order = "descendent") {
            User.find().sort({ _id: -1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        }

    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}

function getUsersByCarnet_CUI(req, res) {
    order = req.params.order;
    if (req.user.rol == "admin") {
        if (order === "ascendant") {
            User.find().sort({ carnet_cui: 1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        } else if (order = "descendent") {
            User.find().sort({ carnet_cui: -1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        }
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}

function getUsersByName(req, res) {
    order = req.params.order;
    if (req.user.rol == "admin") {
        if (order === "ascendant") {
            User.find().sort({ user_name: 1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        } else if (order === "descendent") {
            User.find().sort({ user_name: -1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        }
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}

function getUsersByLastName(req, res) {
    order = req.params.order;
    if (req.user.rol == "admin") {
        if (order === "ascendant") {
            User.find().sort({ user_lastName: 1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        } else if (order === "descendent") {
            User.find().sort({ user_lastName: -1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        }
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}

function getUsersByRol(req, res) {
    order = req.params.order;

    if (req.user.rol == "admin") {
        if (order === "ascendant") {
            User.find().sort({ rol: 1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        } else if (order = "descendent") {
            User.find().sort({ rol: -1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        }


    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }
}

function getUsersByPassword(req, res) {
    order = req.params.order;
    if (req.user.rol == "admin") {
        if (order === "ascendant") {
            User.find().sort({ password: 1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        } else if (order = "descendent") {
            User.find().sort({ password: -1 }).exec(function (err, usersFound) {
                if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
                if (!usersFound) return res.status(404).send({ message: 'The users have not been found.' })
                return res.status(200).send({ usersFound })
            })
        }
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }


}


function getUsers(req, res) {
    if (req.user.rol == "admin") {
        User.find((err, users) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the user request.' })
            if (!users) return res.status(404).send({ message: 'None users exist.' })
            return res.status(200).send({ users })
        })
    } else {
        return res.status(500).send({ message: 'You don´t have permissions for realiza this action' })
    }

}



module.exports = {
    login,
    addUser,
    editUser,
    deleteUser,
    getUserById,
    getUsersById,
    getUsersByCarnet_CUI,
    getUsersByName,
    getUsersByLastName,
    getUsersByRol,
    getUsersByPassword,
    getUsers
}

