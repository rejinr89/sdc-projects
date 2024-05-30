//require
const studentRouter=require('../routes/studentRouter');
const mongoose=require('mongoose');

//controller for getting all studnets details
//get all students details
getAllStudents=(req,res)=>{
    res.send('Get All students')
}

//get individual student details
getIndividual=(req,res)=>{
    res.send('Get single student')
}

//add new student
addNewStudent=(req,res)=>{
    res.send('Add a students')
}

//update a student detail
updateStudent=(req,res)=>{
    res.send('Update a student detail')
}

//delete a student
deleteStudent=(req,res)=>{
    res.send('Delete a student')
}

module.exports={
    getAllStudents,
    getIndividual,
    addNewStudent,
    updateStudent,
    deleteStudent
}