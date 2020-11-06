const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
//crea un usuario
//endpoint => /api/projects/
router.post('/',auth, 
[
    check('name','The name of the project is must').not().isEmpty()
],
projectController.createProject);


router.get('/',auth, 
projectController.getProject);



router.put('/:id',auth, 
[
    check('name','The name of the project is must').not().isEmpty()
],
projectController.updateProject);


router.delete('/:id',auth,
projectController.deleteProject);

module.exports = router;