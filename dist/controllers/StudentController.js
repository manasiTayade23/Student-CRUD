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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const StudentService_1 = require("../services/StudentService");
class StudentController {
    static createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield StudentService_1.StudentService.createStudent(req, res);
        });
    }
    static getStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield StudentService_1.StudentService.getStudents(req, res);
        });
    }
    static getStudentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield StudentService_1.StudentService.getStudentById(parseInt(req.params.id, 10), res);
        });
    }
    static updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield StudentService_1.StudentService.updateStudent(parseInt(req.params.id, 10), req.body, res);
        });
    }
    static deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield StudentService_1.StudentService.deleteStudent(parseInt(req.params.id, 10), res);
        });
    }
}
exports.StudentController = StudentController;
exports.default = StudentController;
