'use strict';
module.exports = (sequelize, DataTypes) => {
  const Livro = sequelize.define('Livro', {
    isbn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autores: {
      type: DataTypes.STRING, // Armazenando autores como string separada por vírgulas
      allowNull: false
    },
    editora: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    disponivel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {});
  Livro.associate = function(models) {
    // associations can be defined here
  };
  return Livro;
};
