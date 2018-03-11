export interface IGradeView {
  id?: number;
  academicYear?: string;
  term?: number;
  cycle?: number;
  StudentId?: number;
  StudentUserId?: number;
  StudentNumber?: string;
  StudentLname?: string;
  StudentFname?: string;
  StudentEmail?: string;
  InstructorId?: number;
  InstructorUserId?: number;
  InstructorNumber?: string;
  InstructorFname?: string;
  InstructorLname?: string;
  InstructorEmail?: string;
  AssessmentId?: number;
  MyClassId?: number;
  ProgramSopiId?: number;
  Sopi?: string;
  ProgramCourseId?: number;
  Course?: string;
  grade?: number;
}
