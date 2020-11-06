const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
//crea un usuario
//endpoint => /api/tasks/
router.post('/',auth, 
[
    check('name','The name of the task is must').not().isEmpty()
],
taskController.createTask);


router.get('/',auth,
taskController.getTasks);

router.put('/',auth, 
[
    check('name','The name of the project is must').not().isEmpty()
],
taskController.updateTask);

router.delete('/:id',auth,
taskController.deleteTask);


module.exports = router;