module.exports = function(sequelize, DataTypes) {
    var Fridge = sequelize.define("Fridge", {
      id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      item: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
          len: [1, 140]
        }
      },
         });
    return Fridge;
  };
  
 