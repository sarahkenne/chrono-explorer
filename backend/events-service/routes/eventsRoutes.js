const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventsController');
const verifyToken = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', verifyToken, isAdmin, controller.create);
router.put('/:id', verifyToken, isAdmin, controller.update);
router.delete('/:id', verifyToken, isAdmin, controller.remove);

module.exports = router;