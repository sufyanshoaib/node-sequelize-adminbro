module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category', {
        name:  { type: Sequelize.STRING(255), allowNull: false },
        imagePath: { type: Sequelize.STRING(255), field: 'image_path',  allowNull: true },
        mimeType: { type: Sequelize.STRING(255), field: 'mime_type',  allowNull: true }
    }, {tableName:'category', timestamps: false });
  
    return Category;
  };
  