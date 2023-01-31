const { body } = require(`express-validator`)

exports.validate = [
    // Memvalidasi password
    body(`password`) 
    // Password harus berisi minimal 8 karakter
    .isLength({ min: 8 })
    .withMessage(`Password at least 8 characters`)
    // Password tidak boleh kosong
    .notEmpty()
    .withMessage(`Password must be filled`)
]