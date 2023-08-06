import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  //   UserController.createUser,
);

export const AcademicSemesterRoutes = router;
