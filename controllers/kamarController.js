let modelKamar = require("../models/index").kamar 

exports.getKamar = async (request, response) => {
    let dataKamar = await modelKamar.findAll()
    return response.json(dataKamar)
}

exports.addKamar = (request, response) => {
    let dataKamar = {
        nomor_kamar: request.body.nama_pelanggaran,
        id_tipe_kamar: request.body.id_tipe_kamar
    }

    modelKamar.create(dataKamar) 
    .then(result => {
        return response.json({
            message: `Data kamar successfully added`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateKamar = (request, response) => {
    let params = {
        id_kamar: request.params.id_kamar 
    }

    let dataKamar = {
        nomor_kamar: request.body.nomor_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar 
    }

    modelKamar.update(dataKamar, {
        where: params 
    })

    .then(result => {
        return response.json({
            message: `Data Kamar successfully updated`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    }) 
}

exports.deleteKamar = (request, response) => {
    let params = {
        id_kamar: request.params.id_kamar 
    }

    modelKamar.destroy({
        where: params 
    })
    .then(result => {
        return response.json({
            message: `Data Kamar successfully deleted`
        })
    }) 
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}