import express from 'express'
import asyncHandler from 'express-async-handler'
import path from 'path'
import multer from 'multer'
import fs from 'fs'
import Product from '../models/productModel.js';



const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, callBack) {
        callBack(null, 'uploads/')
    },
    filename(req, file, callBack) {
        callBack(null, `${file.fieldname}-${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date().getDate()}-${Math.floor(Math.random() * 1000)}${path.extname(file.originalname)}`)
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

router.route('/').post(upload.array('image'), asyncHandler((req, res) => {
    const files = req.files.map(file => {
        return {
            name: `${file.filename}`,
            originalname: `${file.originalname}`,
            path: `/${file.path}`
        }
    })
    res.status(201).json(files)
}))

router.route('/delete/:id/:name').delete(asyncHandler(async (req, res) => {
    const fileId = req.params.id;
    console.log('fileId: ', fileId);
    const filename = req.params.name;
    fs.unlink(`uploads/${filename}`, async function (err) {
        if (err && err.code == 'ENOENT') {
            // file doens't exist
            res.status(400).json({ error: "File doesn't exist, won't remove it." });
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            res.status(400).json({ error: "Error occurred while trying to remove file" });
        } else {

            const product = await Product.findById(req.params.id);

            if (product) {
                product.image = product.image.filter(img => img.name !== filename);

                const updatedProduct = await product.save();
            } else {
                res.status(404);
                throw new Error('Product not updated while deleting image!');
            }

            res.status(201).json({
                name: filename,
                status: 'deleted'
            })
        }
    });
}))

export default router;