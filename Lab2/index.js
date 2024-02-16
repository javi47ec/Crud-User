let app = require('express')();//importar express
const http = require('http').Server(app);//importar http
const express = require('express');//importar express
const cors = require('cors');

const port = 3000; //puerto

app.use(express.json()); ///poner en formato json
app.use(cors()); //habilitar cors
//cabeceras CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 

    next();
});


//routes
app.use(require('./routes/usuario'));//importar las rutas

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});