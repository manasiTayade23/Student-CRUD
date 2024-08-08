"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const sequelize_1 = require("sequelize");
const Marks_1 = __importDefault(require("./Marks")); // Import the Marks model
// Define the Student model
class Student extends sequelize_1.Model {
}
exports.Student = Student;
exports.default = (sequelize) => {
    Student.init({
        first_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: sequelize_1.DataTypes.DATEONLY,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Student',
    });
    // Initialize the Marks model here as well
    const MarksModel = (0, Marks_1.default)(sequelize);
    // Define relationships
    Student.hasMany(MarksModel, {
        foreignKey: 'studentId',
        as: 'marks',
    });
    return Student;
};
