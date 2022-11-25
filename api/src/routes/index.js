const { axios } = require('axios');
const { Router } = require('express');
const dogpostRouter = require('./dog');
const dogsRouter = require('./dogs');
const temperaments = require('./temperament')
//const {Temperament,breed} = require('../db');


const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');clear


// const router = express.Router();
// router.use(express.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req,res)=>{
res.send("soy el inicio")


})


 router.use('/dogs', dogsRouter)
// router.use('/dog',dogpostRouter)
router.use('/temperament',temperaments)


      

module.exports = router;

