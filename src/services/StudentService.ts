import { Student } from "../models/Student"; // Assuming Student model is defined in models/Student.ts
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

export class StudentService {
  public static async createStudent(req: Request, res: Response) {
    const { first_name, last_name, dob, email, password } = req.body;
    try {
      const existingStudent = await Student.findOne({
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
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await Student.create({
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        email: email,
        password: hashedPassword,
      });
      const { password: _, ...StudentWithoutPassword } = result.toJSON();
      res.status(200).json({
        success: true,
        message: "Student created successfully",
        data: StudentWithoutPassword,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        data: [],
      });
    }
  }
  static async getStudents(req: Request, res: Response) {
    try {
      // Use Sequelize to fetch all students
      const students = await Student.findAll({
        attributes: { exclude: ["password"] },
      });

      // Send the response
      res.status(200).json({
        success: true,
        message: "Student fetched successfully",
        data: students,
      });
    } catch (error) {
      console.error("Error in StudentService.getStudents:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch students",
        data: [],
      });
    }
  }

  static async getStudentById(id: number, res: Response) {
    try {
        // Find a student by primary key (ID)
        const student = await Student.findByPk(id, {
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
    } catch (error) {
        console.error('Error in StudentService.getStudentById:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch student',
            data: null,
        });
    }
}

static async updateStudent(id: number, data: any, res: Response) {
    try {
        // Perform the update operation
        const [rowsUpdated, [updatedStudent]] = await Student.update(data, {
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
        const { password, ...studentWithoutPassword } = updatedStudent.get();

        // Send the updated student data as the response
        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: studentWithoutPassword,
        });
    } catch (error) {
        console.error('Error in StudentService.updateStudent:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update student',
            data: null,
        });
    }
}

static async deleteStudent(id: number, res: Response) {
    try {
        // Perform the delete operation
        const rowsDeleted = await Student.destroy({
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
    } catch (error) {
        console.error('Error in StudentService.deleteStudent:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete student',
            data: null,
        });
    }
}

    }
      
