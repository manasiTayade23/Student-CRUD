"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const Student_1 = require("../models/Student"); // Assuming Student model is defined in models/Student.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class StudentService {
    static createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, dob, email, password } = req.body;
            try {
                const existingStudent = yield Student_1.Student.findOne({
                    where: { email: email },
                });
                //checking if Student already exists in database
                if (existingStudent) {
                    return res.status(400).json({
                        success: false,
                        message: "Student already exists",
                        data: [],
                    });
                }
                //store hashed password in the database
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const result = yield Student_1.Student.create({
                    first_name: first_name,
                    last_name: last_name,
                    dob: dob,
                    email: email,
                    password: hashedPassword,
                });
                const _a = result.toJSON(), { password: _ } = _a, StudentWithoutPassword = __rest(_a, ["password"]);
                res.status(200).json({
                    success: true,
                    message: "Student created successfully",
                    data: StudentWithoutPassword,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "Something went wrong",
                    data: [],
                });
            }
        });
    }
    static getStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use Sequelize to fetch all students
                const students = yield Student_1.Student.findAll({
                    attributes: { exclude: ["password"] },
                });
                // Send the response
                res.status(200).json({
                    success: true,
                    message: "Student fetched successfully",
                    data: students,
                });
            }
            catch (error) {
                console.error("Error in StudentService.getStudents:", error);
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch students",
                    data: [],
                });
            }
        });
    }
    static getStudentById(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find a student by primary key (ID)
                const student = yield Student_1.Student.findByPk(id, {
                    attributes: { exclude: ['password'] }, // Exclude password from the result
                });
                // Check if the student was found
                if (!student) {
                    res.status(404).json({
                        success: false,
                        message: 'Student not found',
                        data: null,
                    });
                    return; // Exit the function to prevent further execution
                }
                res.status(200).json({
                    success: true,
                    message: 'Student fetched successfully',
                    data: student,
                });
            }
            catch (error) {
                console.error('Error in StudentService.getStudentById:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to fetch student',
                    data: null,
                });
            }
        });
    }
    static updateStudent(id, data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Perform the update operation
                const [rowsUpdated, [updatedStudent]] = yield Student_1.Student.update(data, {
                    where: { id },
                    returning: true,
                });
                // Check if any rows were updated
                if (rowsUpdated === 0) {
                    res.status(404).json({
                        success: false,
                        message: 'Student not found',
                        data: null,
                    });
                    return; // Exit the function to prevent further execution
                }
                const _a = updatedStudent.get(), { password } = _a, studentWithoutPassword = __rest(_a, ["password"]);
                // Send the updated student data as the response
                res.status(200).json({
                    success: true,
                    message: 'Student updated successfully',
                    data: studentWithoutPassword,
                });
            }
            catch (error) {
                console.error('Error in StudentService.updateStudent:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to update student',
                    data: null,
                });
            }
        });
    }
    static deleteStudent(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Perform the delete operation
                const rowsDeleted = yield Student_1.Student.destroy({
                    where: { id },
                });
                // Check if any rows were deleted
                if (rowsDeleted === 0) {
                    // No rows deleted means the student was not found
                    res.status(404).json({
                        success: false,
                        message: 'Student not found',
                        data: null,
                    });
                    return; // Exit the function to prevent further execution
                }
                // Successfully deleted
                res.status(200).json({
                    success: true,
                    message: 'Student deleted successfully',
                    data: null,
                });
            }
            catch (error) {
                console.error('Error in StudentService.deleteStudent:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to delete student',
                    data: null,
                });
            }
        });
    }
}
exports.StudentService = StudentService;
