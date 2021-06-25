class Student {
  constructor(
    studentId,
    name,
    mobileNumber,
    cnic,
    matricMarks,
    password,
    fatherName,
    fatherCnic,
    gender,
    dob,
    email,
    address,
    matricYear,
    interYear
  ) {
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.cnic = cnic;
    (this.studentId = studentId), (this.fatherName = fatherName);
    this.fatherCnic = fatherCnic;
    this.dob = dob;
    this.email = email;
    this.address = address;
    this.matricMarks = matricMarks;
    this.password = password;
    this.gender = gender;
    this.matricYear = matricYear;
    this.interYear = interYear;
  }
}

module.exports = Student;
