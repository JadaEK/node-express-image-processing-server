const { json } = require('body-parser');
const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const router = Router();
const imageProcessor = require('./imageProcessor');

filename = (req, file, callback) => {
    callback(null, file.originalname);
};

const storage = multer.diskStorage(
    { destination : 'api/uploads/',
      filename, }
 );

 const fileFilter = (req, file, callback) => {
     if (file.mimetype !== 'image/png'){
         req.fileValidationError = 'Wrong file type';
         callback(null, false, new Error('Wrong file type'));
     } else {
         callback(null, true);
     }
 };

 const upload = multer({
     fileFilter,
     storage,
 });

 router.post('/upload', upload.single('photo'), async(req, res) =>{
     if (req.fileValidationError){
         return res.status(400)
         .json({error : req.fileValidationError});
     };
     
     try{
         await imageProcessor(request.file.filename)
     } catch (error){
   
     }
     res.status(201).json({success : true});
 });

 const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html');
 router.get('/photo-viewer', (req,res) => {
     res.sendFile(photoPath);
 })

module.exports = router;