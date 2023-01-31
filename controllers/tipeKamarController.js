let modelTipe = require("../models/index").tipe_kamar
let path = require("path")
let fs = require("fs")

exports.getTipe = async (request, response) => {
    let dataTipe = await modelTipe.findAll()
    return response.json(dataTipe)
}

exports.addTipe = (request, response) => {
    if (!request.file) {
        return response.json({
            message: `Nothing to upload`
        })
    }

    let dataTipe = {
        nama_tipe_kamar: request.body.nama_tipe_kamar, 
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.file.filename
    }

    modelTipe.create(dataTipe)
    .then(result => {
        return response.json({
            message: `Data Tipe Kamar successfully added`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

exports.updateTipe = async (request, response) => {
    let id = request.params.id_tipe_kamar
    let dataTipe = {
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi
    }

    if (request.file) {
        let tipe = await modelTipe.findOne({
            where: {
                id_tipe_kamar: id 
            }
        })
        let oldFileName = tipe.foto 

        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        dataTipe.foto = request.file.filename 
    }

    modelTipe.update(dataTipe, {
        where: {
            id_tipe_kamar: id 
        }
    })
    .then(result => {
        return response.json({
            message: `Data Tipe Kamar successfully updated `
        })
    }) 
    .catch(error => {
        return response.json({
            message: error.message 
        })
    }) 
}

exports.deleteTipe = async (request, response) => {
    let id = request.params.id_tipe_kamar

    let tipeKamar = await modelTipe.findOne({
        where: {
            id_tipe_kamar: id 
        }
    })
    if (tipeKamar) {
        let oldFileName = tipeKamar.foto 

        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))
    }

    modelTipe.destroy({
        where: {
            id_tipe_kamar: id 
        }
    })
    .then(result => {
        return response.json({
            message: `Data Tipe Kamar successfully deleted`
        })
    }) 
    .catch(error => {
        return response.json({
            message: error.message 
        })
    }) 
}