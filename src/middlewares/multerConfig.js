const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // const imageDirectory = path.join(__dirname, "../users/img")
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