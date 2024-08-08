"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marks = void 0;
const sequelize_1 = require("sequelize");
class Marks extends sequelize_1.Model {
}
exports.Marks = Marks;
exports.default = (sequelize) => {
    Marks.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subject: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        mark: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        studentId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: 'Students',
                key: 'id',
            },
            onDelete: 'CASCADE',
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Marks',
    });
    return Marks;
};
