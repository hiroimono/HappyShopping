import express from 'express'
import path from 'path'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, callBack) {
        callBack(null, 'uploads/')
    },
    filename(req, file, callBack) {
        callBack(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, callBack) {
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return callBack(null, true)
    } else {
        callBack('Invalid file type!')
    }
}

const upload = multer({
    storage,
    fileFilter: (reg, file, callBack) => {
        checkFileType(file, callBack)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router;