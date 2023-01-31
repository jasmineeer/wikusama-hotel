const express = require(`express`)
const app = express()

app.use(express.json())
let tipeKamarController = require("../controllers/tipeKamarController")
let uploadImage = require("../middlewares/uploadImage")

app.get("/", tipeKamarController.getTipe)
app.post("/", uploadImage.upload.single(`foto`), tipeKamarController.addTipe)
app.put("/:id_tipe_kamar", uploadImage.upload.single(`foto`), tipeKamarController.updateTipe)
app.delete("/:id_tipe_kamar", uploadImage.upload.single(`foto`), tipeKamarController.deleteTipe)
module.exports = app 