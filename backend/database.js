const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
    _db = db;
}

const knex_db = require("./db-config");

const dbinitialize = async () => {
    testBase.resetDatabase(knex);
}


// const readTeachers = async () => {
//     try {
//       const teachers = await knex.select().from("teacher");
//       return teachers;
//     } catch (error) {
//       throw error;
//     }
//   }

//   const readTeacherInfo = async (id) => {
//     try {
//       const teacher = await knex.select().from("teacher").where({ id }).first();
//       return teacher;
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   const addTeacher = async (id,name, age) => {
//     try {
//       const newTeacher = await knex("teacher").insert({id, name, age });
//       return newTeacher;
//     } catch (error) {
//       throw error;
//     }
//   }

  // const updateTeacher = async (id, name, age) => {
  //   try {
  //     await knex_db("teacher").where({ id }).update({ name, age });
  //     return true; 
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  

  const updateTeacher = async (id, name, age) => {
    let sql = `UPDATE teacher SET `;
    const values = [];
    
    if (name !== undefined) {
      sql += `name = ?, `;
      values.push(name);
    }
    
    if (age !== undefined) {
      sql += `age = ?, `;
      values.push(age);
    }
  
    // Remove the trailing comma and space
    sql = sql.slice(0, -2);
    
    sql += ` WHERE id = ?`;
    values.push(id);
  
    try {
      await knex_db.raw(sql, values);
      return true; // Successful update
    } catch (error) {
      throw error;
    }
  };
  


//   const deleteTeacher = async (id) => {
//     try {
//       await knex_db("teacher").where({ id }).del();
//       return true;
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   const readStudents = async () => {
//     try {
//       const students = await knex_db.select().from("student");
//       return students;
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   const readStudentInfo = async (id) => {
//     try {
//       const student = await knex_db.select().from("student").where({ id }).first();
//       return student;
//     } catch (error) {
//       throw error;
//     }
//   }
  
//   const addStudent = async (id,name, age,hometown) => {
//     try {
//       const newStudent = await knex_db("student").insert({id, name, age,hometown });
//       return newStudent;
//     } catch (error) {
//       throw error;
//     }
//   }
  
  const updateStudent = async (id, name, age,hometown) => {
    try {
      await knex_db("student").where({ id }).update({ name, age,hometown });
      return true; 
    } catch (error) {
      throw error;
    }
  }
 
//   const deleteStudent = async (id) => {
//     try {
//       await knex_db("student").where({ id }).del();
//       return true;
//     } catch (error) {
//       throw error;
//     }
//   }
  
const readTeachers = async () => {
  const sql = `SELECT * FROM teacher`
  return new Promise((resolve, reject) => {
      knex_db
          .raw(sql)
          .then((teachers) => {
              resolve(teachers);
          })
          .catch((error) => {
              reject(error);
          });
  });
}

//ReadteacherInfo
const readTeacherInfo = async (id) => {
  const sql = `SELECT * FROM teacher WHERE id = ?`
  return new Promise((resolve, reject) => {
      knex_db
          .raw(sql, [id])
          .then((teacher) => {
              resolve(teacher);
          })
          .catch((error) => {
              reject(error);
          });
  });
}

//Add teacher Function Created.
const addTeacher = async (id, name, age) => {
  const sql = `INSERT INTO teacher(id,name,age) values (?, ?, ?)`
  return new Promise((resolve, reject) => {
      knex_db
          .raw(sql, [id, name, age])
          .then(() => {
              resolve({ status: "Successfully inserted Teacher" })
          })
          .catch((error) => {
              reject(error);
          });
  });
}

//UpdateTeacher Created.
// const updateTeacher = async (id,name, age, ) => {
//   const sql = `UPDATE teacher SET name=?, age=? WHERE id=?`
//   return new Promise((resolve, reject) => {
//       knex_db
//           .raw(sql, [name, age, id])
//           .then(() => {
//               resolve({ status: "Successfully updated Teacher" })
//           })
//           .catch((error) => {
//               reject(error);
//           });
//   });
// }

//Delete Teacher
const deleteTeacher = async (id) => {
  const sql = `DELETE FROM teacher WHERE id = ?`
  return new Promise((resolve, reject) => {
      knex_db
          .raw(sql, [id])
          .then(() => {
              resolve({ status: "Successfully deleted Teacher" })
          })
          .catch((error) => {
              reject(error);
          });
  });
}

//ReadStudents Created.
const readStudents = async () => {
  const sql = `SELECT * FROM student`
  return new Promise((resolve, reject) => {
      knex_db
          .raw(sql)
          .then((students) => {
              resolve(students);
          })
          .catch((error) => {
              reject(error);
          });
  });
}

//ReadStudentInfo
const readStudentInfo = async (id) => {
  const sql = `SELECT * FROM student WHERE id=?`
  return new Promise((resolve, reject) => {
      knex_db
          .raw(sql, [id])
          .then((student) => {
              resolve(student);
          })
          .catch((error) => {
              reject(error);
          });
  });
}

//AddStudent Function Created.
const addStudent = async (id, name, age, hometown) => {
  const sql = `INSERT INTO student(id,name,age,hometown)values(?,?,?,?)`
  return new Promise((resolve, reject) => {
      knex_db
          .raw(sql, [id, name, age, hometown])
          .then(() => {
              resolve({ status: "Successfully inserted Student" });
          })
          .catch((error) => {
              reject(error);
          });
  });
}

//Update Student Created.
// const updateStudent = async (name, age, hometown, id) => {
//   const sql = `UPDATE student SET name=?,age=?,hometown=?WHERE id=?`
//   return new Promise((resolve, reject) => {
//       knex_db
//           .raw(sql, [name, age, hometown, id])
//           .then(() => {
//               resolve({ status: "Successfully updated Student" });
//           })
//           .catch((error) => {
//               reject(error);
//           });
//   });
// }

//Delete Student
const deleteStudent = async (id) => {
  const sql = `DELETE FROM student WHERE id = ?`
  return new Promise((resolve, reject) => {
      knex_db
          .raw(sql, [id])
          .then(() => {
              resolve({ status: "Successfully deleted Student" });
          })
          .catch((error) => {
              reject(error);
          });
  });
}



module.exports = {
    readTeachers,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};
