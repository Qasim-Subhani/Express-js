var config = require("./dbconfig");
const sql = require("mssql");

async function getStudents() {
  try {
    let pool = await sql.connect(config);
    let students = await pool.request().query("select * from Student");
    return students.recordsets;
  } catch (error) {
    console.log("this is err " + error);
  }
}
async function getSpecificStudent(stId) {
  try {
    let pool = await sql.connect(config);
    let students = await pool
      .request()
      .input("id", sql.Int, stId)
      .query("select * from Student where studentId=@id");
    return students.recordsets;
  } catch (error) {
    console.log("this is err " + error);
  }
}
async function addStudent(student) {
  try {
    let pool = await sql.connect(config);
    let insertStudent = await pool
      .request()
      .input("name", sql.VarChar(50), student.name)
      .input("mobileNumber", sql.VarChar(50), student.mobileNumber)
      .input("cnic", sql.VarChar(50), student.cnic)
      .input("matricMarks", sql.Int, student.matricMarks)
      .input("interMarks", sql.Int, student.interMarks)
      .input("password", sql.VarChar(50), student.password)
      .input("fatherName", sql.VarChar(50), student.fatherName)
      .input("fatherCnic", sql.VarChar(50), student.fatherCnic)
      .input("gender", sql.VarChar(50), student.gender)
      .input("dob", sql.VarChar(50), student.dob)
      .input("email", sql.VarChar(50), student.email)
      .input("address", sql.VarChar(50), student.address)
      .input("matricYear", sql.VarChar(50), student.maticYear)
      .input("interYear", sql.VarChar(50), student.interYear)
      .execute("Insert_Student");
    return insertStudent.recordsets;
  } catch (error) {
    console.log("this is err " + error);
  }
}

module.exports = {
  getStudents: getStudents,
  getSpecificStudent: getSpecificStudent,
  addStudent: addStudent,
};
