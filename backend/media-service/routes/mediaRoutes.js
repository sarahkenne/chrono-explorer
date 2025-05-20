const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mediaController = require('../controllers/mediaController');
const verifyToken = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/upload', verifyToken, isAdmin, upload.single('fichier'), mediaController.upload);
router.get('/by-event/:id_evenement', mediaController.getByEvent);

module.exports = router;