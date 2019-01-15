module.exports = function(sequelize, DataTypes) {
    var Fridge = sequelize.define("Fridge", {
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      item: {
        type: DataTypes.STRING,
        
        allowNull: false,
        
        validate: {
          len: [1, 200]
        }
      },
         });
    return Fridge;
  };
  
 