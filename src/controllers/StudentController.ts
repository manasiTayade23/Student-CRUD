import { Request, Response } from 'express';
import { StudentService } from "../services/StudentService";

export class StudentController {
  public static async createStudent(req: Request, res: Response) {
    return await StudentService.createStudent(req, res);
  }
  static async getStudents(req: Request, res: Response)  {
        return await StudentService.getStudents(req, res);
  }

  static async getStudentById(req: Request, res: Response) {
    await StudentService.getStudentById(parseInt(req.params.id, 10),res);
  }
  static async updateStudent(req: Request, res: Response) {
   await StudentService.updateStudent(parseInt(req.params.id, 10), req.body,res);
  }

  static async deleteStudent(req: Request, res: Response) {
    await StudentService.deleteStudent(parseInt(req.params.id, 10),res);
}
}

export default StudentController;
