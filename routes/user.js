const express = require(`express`)
const app = express()
app.use(express.json())

let userController = require("../controllers/userController")
let uploadImage = require("../middlewares/uploadImage")
// const userValidator = require("../middlewares/userValidator")
// const authorization = require("../middlewares/authorization")

// Untuk mendapatkan data user
app.get("/", userController.getUser)

// Untuk menambahkan data user
app.post("/", uploadImage.upload.single(`foto`), userController.addUser)

// Untuk mengedit data user
app.put("/:id_user", uploadImage.upload.single(`foto`), userController.updateUser)

// Untuk menghapus data user
app.delete("/:id_user", uploadImage.upload.single(`foto`), userController.deleteUser)

// // Untuk login/memverifikasi data user
// app.post("/auth", userController.authentication)

module.exports = app 