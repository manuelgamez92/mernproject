const express = require('express');
const conectarDB = require('./config//db');
const cors = require('cors');

const app = express();
//conect to DB
conectarDB();

//habilitar cors
app.use(cors());
//habilitar express.json
app.use(express.json({extend:true}));
//puerto de la app
const PORT = process.env.PORT || 4000;


//importar rutas

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/tasks', require('./routes/tasks'))
app.use('/api/projects', require('./routes/projects'))


//arrancar server

app.listen(PORT, ()=>{
    console.log("servidor corriendo");
})