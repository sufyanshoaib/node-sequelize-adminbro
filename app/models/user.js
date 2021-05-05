
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        name:  { type: Sequelize.STRING(255), allowNull: false },
        imagePath: { type: Sequelize.STRING(255), field: 'image_path',  allowNull: true },
        mimeType: { type: Sequelize.STRING(255), field: 'mime_type',  allowNull: true }
    }, {tableName:'user', timestamps: false });
  
    return User;
  };
  