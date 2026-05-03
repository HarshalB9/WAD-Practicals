const Student = require('../model/Student');

const renderTable = async(res, students, message="") => {
    const tableRows = students.map(s => `
        <tr>
            <td>${s.Name}</td>
            <td>${s.Rollno}</td>
            <td>${s.WADmarks}</td>
            <td>${s.CCmarks}</td>
            <td>${s.DSBDAmarks}</td>
            <td>${s.CNSmarks}</td>
            <td>${s.AImarks}</td>
        </tr>
    `).join('');

    const html = `
        <h3>${message}</h3>
        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Roll no</td>
                    <td>WAD</td>
                    <td>CC</td>
                    <td>DSBDA</td>
                    <td>CNS</td>
                    <td>AI</td>
                </tr>
            </thead>
                
            <tbody>
                ${tableRows}
            </tbody>
        </table>
        <a href="/">Go to Dashboard</a>
    `;

    res.send(html);
};

const normalizeSubjects = (subjects) => {
    if(!subjects) return [];
    if(Array.isArray(subjects)) return subjects;
    return [subjects];
};

//GET METHOD ASEL TAR req.query (mhanje, init, viewAll, search, yachya sathi get method, mhanje req.query)
//POST METHOD ASEL TAR req.body (mhanje update, add, delete, yachya sathi post method, mhanje req.body)
const filterByMarks = async(req, res, comp) => {
    const marks = Number(req.query.x);
    const subjects = normalizeSubjects(req.query.subjects);

    if(Number.isNaN(marks) || !subjects.length){
        return renderTable(res, [], 'Please provide valid marks and atleast one subject');
    }

    const allStudents = await Student.find();

    const filteredStudents = [];

    for(let student of allStudents){

        let isMatch = true;

        for(let subject of subjects){
            let scoredMarks = student[subject];

            if(comp === 'gt'){
                if(!(scoredMarks > marks)){
                    isMatch = false;
                }
            }
            else{
                if(!(scoredMarks < marks)){
                    isMatch = false;
                }
            }
        }

        if(isMatch){
            filteredStudents.push(student);
        }
    }

    const messsage = (comp === 'gt') ? `Students with marks greater than ${marks}.` : `Students with marks less than ${marks}.`;

    renderTable(res, filteredStudents, messsage);
};

exports.initDB = async (req, res) => {
    await Student.deleteMany({});

    const initial = [
        { "Name": "Stud1", "Rollno": 1, "WADmarks": 80, "CCmarks": 80, "DSBDAmarks": 92, "CNSmarks": 70, "AImarks": 100 },
        { "Name": "Stud2", "Rollno": 2, "WADmarks": 65, "CCmarks": 72, "DSBDAmarks": 88, "CNSmarks": 54, "AImarks": 79 },
        { "Name": "Stud3", "Rollno": 3, "WADmarks": 91, "CCmarks": 85, "DSBDAmarks": 76, "CNSmarks": 90, "AImarks": 82 },
        { "Name": "Stud4", "Rollno": 4, "WADmarks": 45, "CCmarks": 60, "DSBDAmarks": 55, "CNSmarks": 68, "AImarks": 71 },
        { "Name": "Stud5", "Rollno": 5, "WADmarks": 78, "CCmarks": 94, "DSBDAmarks": 81, "CNSmarks": 83, "AImarks": 89 }
    ];

    await Student.insertMany(initial);

    const students = await Student.find();

    renderTable(res, students, 'DB initalized with 5 students');
};

exports.listAll = async(req, res) => {
    const students = await Student.find();
    renderTable(res, students, `Total records: ${students.length}`);
};

exports.marksGreaterThan = async(req, res) => {
    await filterByMarks(req, res, 'gt');
};

exports.marksLessThan = async(req, res) => {
    await filterByMarks(req, res, 'lt');
};

exports.addRecord = async(req, res) => {
    await Student.create(req.body);
    const students = await Student.find();
    renderTable(res, students, `Record added`);
};

exports.update = async(req, res) => {
    const rollno = Number(req.body.rollno);
    const newmarks = Number(req.body.x);
    const subject = req.body.subject;

    const result = await Student.updateOne(
        {Rollno: rollno},
        {$set: { [subject]: newmarks }}
    );

    const students = await Student.find();

    if(result.matchedCount === 0){
        return renderTable(res, students, `No student found with given roll no.`);
    }

    renderTable(res, students, `Marks updated!`);

};

exports.delete = async(req, res) => {
    const name = req.body.name;
    const rollno = req.body.rollno;

    let result;

    

    if(name){
        await Student.deleteMany({Name: name});
    }
    else if(rollno){
        await Student.deleteOne({Rollno: rollno});
    }
    else{
        return renderTable(res, [], `Please provide name or rollno`);
    }

    const students = await Student.find();

    renderTable(res, students, `Deleted successfully!`);
};


