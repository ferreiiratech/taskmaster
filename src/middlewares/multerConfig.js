const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/users/img')
    },
    filename: (req, file, callback) => {
        const time = new Date().getTime()

        callback(null, `${time}_${file.originalname}`)
    }
})

module.exports = {
    storage
}