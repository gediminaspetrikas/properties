module.exports = (db, DataTypes) => {
  const Property = db.define('property', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airbnbId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'airbnb_id',
    },
    numberOfBedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'number_of_bedrooms'
    },
    numberOfBathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'number_of_bathrooms',
    },
    incomeGenerated: {
      type: DataTypes.REAL,
      allowNull: false,
      field: 'income_generated',
    },
    line1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    line2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    line3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    line4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'post_code',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'property',
  });
  return Property;
};
