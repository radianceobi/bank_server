const Users = (sequelize, DataTypes) => {
  return sequelize.define("Users", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "others"),
      allowNull: false,
      defaultValue: "male",
    },
    dob: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "/avatar.jpg",
    },
    accept_terms: {
      type: DataTypes.ENUM("true", "false"),
      allowNull: false,
    },
    email_verification: {
      type: DataTypes.ENUM(1, 2),
      allowNull: false,
      defaultValue: 1,
    },
    active: {
      type: DataTypes.ENUM(1, 2),
      allowNull: false,
      defaultValue: 2,
    },
    balance: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 0,
    },
    admin: {
      type: DataTypes.ENUM("1", "2"),
      defaultValue: "1",
      allowNull: false,
    },
  });
};

module.exports = Users;
