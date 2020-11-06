const Project = require("../models/Project");
const Task = require("../models/Task");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  //Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errores: errors.array() });
  }

  const { projectId } = req.body;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const task = new Task(req.body);
    task.project = project.id;
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.getTasks = async (req, res) => {
  
    const { proyectoId } = req.query;
 
  try {
    const project = await Project.findById(proyectoId);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const tasks = await Task.find({project});
    res.json({tasks});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};



exports.updateTask = async (req, res) => {

    const { project,name,status,_id } = req.body;

    try {

      //la tarea existe?

        const taskExists = await Task.findById(_id);
  
        if (!taskExists) {
          return res.status(404).json({ msg: "Task not exists" });
        }
   

      const projectt = await Project.findById(project);
  
      if (!projectt) {
        return res.status(404).json({ msg: "Project not found" });
      }
      if (projectt.creator.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }


      const newTask = {};

        newTask.name=name;
        newTask.status=status;
      
     
      task = await Task.findOneAndUpdate({_id:_id}, newTask,{new:true});
      res.json({task});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }



  exports.deleteTask = async (req, res) => {

    try {

      //la tarea existe?

        const taskExists = await Task.findById(req.params.id);
  
        if (!taskExists) {
          return res.status(404).json({ msg: "Task not exists" });
        }
   
      await Task.findOneAndRemove({_id:req.params.id});
      res.json({msg:'Task deleted'})

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }


