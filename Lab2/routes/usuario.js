const express = require("express");
const router = express.Router();

const getConnection = require("../conexion");

//Consultar usuario por cédula
router.get("/usuario/:cedula", (req, res) => {
  getConnection(function (err, conn) {
    const { cedula } = req.params;
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    } else {
      conn.query(
        "SELECT * FROM usuario WHERE cedulausuario = ?",
        [cedula],
        function (err, rows) {
          if (err) {
            conn.release();
            return res.sendStatus(
              400,
              "No se puede conectar a la base de datos"
            );
          } else {
            res.send(rows);
            conn.release();
          }
        }
      );
    }
  });
});

  //Ruta para crear un nuevo usuariodd
  router.post("/usuario", (req, res) => {
    const data = {
      cedulausuario: req.body.cedulausuario,
      nombreusuario: req.body.nombreusuario,
      apellidousuario: req.body.apellidousuario,
      emailusuario: req.body.emailusuario,
      telefonousuario: req.body.telefonousuario,
      direccionusuario: req.body.direccionusuario,
      correousuario: req.body.correousuario,
    };
    const query = "INSERT INTO usuario (nombreusuario, apellidousuario, cedulausuario, telefonousuario, direccionusuario, correousuario) VALUES (\""
    +data.nombreusuario+"\", \""
    +data.apellidousuario+"\", \""
    +data.cedulausuario+"\", \""
    +data.telefonousuario+"\", \""
    +data.direccionusuario+"\", \""
    +data.correousuario+"\")";
    
    getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return res.status(400).send('Error en la consulta');
        }else {
            conn.query(query, (err) => {
                if (!err) {
                    res.json({Status: 'Usuario guardado exitosamente'});
                }else {
                    console.log(err);
                }
            });
        }
    });

});

  //Obtener todos los usuarios
router.get('/usuarios', (req, res) => {
  getConnection(function (err, conn) {
      if (err) {
          console.log(err);
          return res.status(500).send('Error en la conexión a la base de datos');
      } else {
          conn.query('SELECT * FROM usuario', (err, rows) => {
              if (!err) {
                  // Liberar la conexión después de completar la consulta
                  conn.release();
                  res.send(rows);
              } else {
                  console.log(err);
                  res.status(500).send('Error en la consulta a la base de datos');
              }
          });
      }
  });
});

// Obtener usuario por id
router.get('/usuario/getById/:id', (req, res) => {
  getConnection(function (err, conn) {
      const { id } = req.params;
      console.log('entra usuario por id');
      if (err) {
          return res.sendStatus(400, 'error en conexión');
      }
      conn.query('SELECT * FROM usuario WHERE idusuario = ?', [id], function (err, rows) {
          if (err) {
              conn.release();
              return res.sendStatus(400, 'No se puede conectar a la base de datos')
          }
          res.send(rows);
          conn.release();
      });
  });
});


//Metodo para actualizar usuario
router.put('/usuario/:id', (req, res) => {
  const { id } = req.params;
  const data = {
      nombreusuario: req.body.nombreusuario,
      apellidousuario: req.body.apellidousuario,
      cedulausuario: req.body.cedulausuario,
      telefonousuario: req.body.telefonousuario,
      direccionusuario: req.body.direccionusuario,
      correousuario: req.body.correousuario
  };
  const query = "UPDATE usuario SET nombreusuario = ?, apellidousuario = ?, cedulausuario = ?, telefonousuario = ?, \
  direccionusuario = ?, correousuario = ? WHERE idusuario = ?";
  getConnection((err, conn) => {
      if (err) {
          console.log("No se puede conectar a la base de datos " + err);
      }
      conn.query(query, [data.nombreusuario, data.apellidousuario, data.cedulausuario, data.telefonousuario, 
        data.direccionusuario, data.correousuario, id], (err, result) => {
          if (!err) {
              res.json({ status: 'Usuario Actualizado Correctamente' });
          } else {
              console.log(err);
          }
          conn.release();
      });
  });
});

//Metodo eliminar usuario
router.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;
  getConnection((err, conn) => {
      if (err) {
          console.log("No se puede conectar a la base de datos " + err);
      }
      conn.query('DELETE FROM usuario WHERE idusuario = ?', [id], (err, result) => {
          if (!err) {
              res.json({ status: 'Usuario Eliminado Correctamente' });
          } else {
              console.log(err);
          }
          conn.release();
      });
  });
});

module.exports = router;
