let modelUser = require("../models/index").user
let md5 = require(`md5`)
let jwt = require(`jsonwebtoken`)
let path = require("path")
let fs = require("fs")
const { validationResult } = require(`express-validator`)

exports.getUser = async (request, response) => {
    let dataUser = await modelUser.findAll()
    return response.json(dataUser)
}

// exports.findUser = async (request, response) => {
//     let keyword = request.body.keyword 

//     /** Import sequelize operator */
//     let sequelize = require(`sequelize`)
//     let Op = sequelize.Op 
//     /** 
//      * Query = select * from user where username like "%keyword%" or
//      * nama_user like "%keyword%"
//      */

//     let dataUser = await modelUser.findAll({
//         where: {
//         [Op.or] : {
//             nama_user: { [Op.like] : `%${keyword}%` },
//             email: { [Op.like] : `%${keyword}%` },
//             role: { [Op.like] : `%${keyword}%` }
//         }
//         }
//     })
//     return response.json(dataUser)
// }

exports.addUser = (request, response) => {
    if (!request.file) {
        return response.json({
            message: `Nothing to upload`
        })
    }
    let dataUser = {
        nama_user: request.body.nama_user,
        foto: request.file.filename,
        email: request.body.email,
        password: md5(request.body.password),
        role: request.body.role
    }

    modelUser.create(dataUser)
    .then(result => {
        return response.json({
            message: `Data user successfully added`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateUser = async (request, response) => {
    let id = request.params.id_user
    let dataUser = {
        nama: request.body.nama_user,
        email: request.body.email,
        password: request.body.password 
    }

    if (request.file) {
        let user = await modelUser.findOne({ 
            where: {
                id_user: id 
            }
        })
        let oldFileName = user.foto 
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))
        dataUser.image = request.file.filename 
    }

    modelUser.update(dataUser, {
        where: {
            id_user: id
        }
    })
    .then(result => {
        return response.json({
            message: `Data User successfully updated`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteUser = async (request, response) => {
    let id = request.params.id_user 
    let user = await modelUser.findOne({
        where: {
            id_user: id 
        }
    })

    if (user) {
        let oldFileName = user.foto 
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))
    }

    modelUser.destroy({
        where: {
            id_user: id 
        }
    })
    .then(result => {
        return response.json({
            message: `Data User successfully deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}