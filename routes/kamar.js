const express = require(`express`)
const app = express()
app.use(express.json())
const kamarController = require("../controllers/kamarController")

// Untuk mendapatkan data kamar
app.get("/", kamarController.getKamar)

// Untuk menambah data kamar
app.post("/", kamarController.addKamar)

// Untuk mengedit data kamar
app.put("/:id_kamar", kamarController.updateKamar)

// Untuk menghapus data kamar
app.delete(":/id_kamar", kamarController.deleteKamar)

module.exports = app