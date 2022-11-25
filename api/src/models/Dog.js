const { DataTypes,Op } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// aqui debemos hacer los campos del formulario 
module.exports = (sequelize) => {
  // defino el modelo
  // sequelize.define('Temperament', {

  //   //  id:{
  //   //  type: DataTypes.INTEGER,
  //   //  primaryKey: true,
  //   //  allowNull: false,

  //   //  },
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull:false,
  //   }
  // }),

  sequelize.define('Dog',{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://i.imgur.com/TKKlSBF.jpg'
  },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  height:{    
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  weight:{    
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  life_span: {
   type: DataTypes.STRING,
   allowNull: true

  }
  
   
    

  })

  


};




