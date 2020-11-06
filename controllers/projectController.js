const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createProject = async (req, res) => {
  //Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const project = new Project(req.body);
    project.creator = req.user.id;
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
  }
};

exports.getProject = async (req, res) => {
    //Check for errors
  
    try {
      const projects = await Project.find({creator:req.user.id});
      res.json({projects});
    } catch (error) {
      console.log(error);
    }
  };

  exports.deleteProject = async (req, res) => {
    //Check for errors
  
    try {
        let project = await Project.findById(req.params.id);
        if(!project){
           return res.status(400).json({ msg:'Project not found' });
        }
   
        //verificar el creador del projecto
   
        if(project.creator.toString()!== req.user.id){
           return res.status(401).json({ msg:'Not authorized' });
   
        }

       //delete project
       await Project.findOneAndRemove({_id:req.params.id});
       res.json({msg:'Project deleted'})

      res.json({projects});
    } catch (error) {
      return res.status(500).json({ error });
    }
  };


  
exports.updateProject = async (req, res) => {
    //Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
  
    try {
     const {name} = req.body;
     const newProject = {};
     if(name){
        newProject.name = name;
     }
     //check id of project
     let project = await Project.findById(req.params.id);
     if(!project){
        return res.status(400).json({ msg:'Project not found' });
     }

     //verificar el creador del projecto

     if(project.creator.toString()!== req.user.id){
        return res.status(401).json({ msg:'Not authorized' });

     }

     //update project
     project = await Project.findByIdAndUpdate({_id:req.params.id}, {$set: newProject}, {new:true});


      res.json({project});
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
