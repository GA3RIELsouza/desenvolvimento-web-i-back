const express = require('express');
const router = express.Router();
const cvController = require('./cvController');

router.get('/', cvController.getAllCvs);
router.get('/:id', cvController.getOneCv);
router.post('/', cvController.createCv);
router.put('/:id', cvController.updateCv);
router.delete('/:id', cvController.deleteCv);

module.exports = router;