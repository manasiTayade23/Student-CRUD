import { Sequelize, DataTypes, Model } from 'sequelize';
import Marks from './Marks'; // Import the Marks model

// Define the Student model
export class Student extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public dob!: string; // Or use Date if preferred
  public email!: string;
  public password!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
public readonly marks?: typeof Marks[]; // Reference to Marks type
}

export default (sequelize: Sequelize) => {
  Student.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Student',
  });

  // Initialize the Marks model here as well
  const MarksModel = Marks(sequelize);

  // Define relationships
  Student.hasMany(MarksModel, {
    foreignKey: 'studentId',
    as: 'marks',
  });

  return Student;
};
