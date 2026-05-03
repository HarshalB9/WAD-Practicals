const Student = require('../model/Student');

const renderTable = async (res, students, message = '') => {
    const tableRows = students.map(s => `
        <tr>
            <td>${s.Name}</td>
            <td>${s.Roll_No}</td>
            <td>${s.WAD_Marks}</td>
            <td>${s.CC_Marks}</td>
            <td>${s.DSBDA_Marks}</td>
            <td>${s.CNS_Marks}</td>
            <td>${s.AI_marks}</td>
        </tr>
    `).join('');

    const html = `
        <h2>${message}</h2>
        <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Roll No</td>
                    <td>WAD Marks</td>
                    <td>CC Marks</td>
                    <td>DSBDA Marks</td>
                    <td>CNS Marks</td>
                    <td>AI Marks</td>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
        <br>
        <a href="/">Go to Dashboard</a>
    `;

    res.send(html);
};

const normalizeSubjects = (subjects) => {
    if (!subjects) return [];
    if (Array.isArray(subjects)) return subjects;
    return [subjects];
};

const filterByMarks = async (req, res, comparator) => {
    const x = Number(req.query.x);
    const subjects = normalizeSubjects(req.query.subjects);

    if (!subjects.length || Number.isNaN(x)) {
        return renderTable(res, [], 'Please provide marks and at least one subject.');
    }

    const andConditions = subjects.map(subject => ({
        [subject]: comparator === 'gt' ? { $gt: x } : { $lt: x }
    }));

    const students = await Student.find({ $and: andConditions });
    const message = comparator === 'gt'
        ? `Students scoring more than ${x} in selected subjects.`
        : `Students scoring less than ${x} in selected subjects.`;

    renderTable(res, students, message);
};

exports.initDB = async (req, res) => {
    await Student.deleteMany({});

    const initial = [
        { "Name": "Asha", "Roll_No": 1, "WAD_Marks": 88, "CC_Marks": 78, "DSBDA_Marks": 91, "CNS_Marks": 84, "AI_marks": 79 },
        { "Name": "Ravi", "Roll_No": 2, "WAD_Marks": 65, "CC_Marks": 71, "DSBDA_Marks": 62, "CNS_Marks": 69, "AI_marks": 74 },
        { "Name": "Meera", "Roll_No": 3, "WAD_Marks": 92, "CC_Marks": 88, "DSBDA_Marks": 95, "CNS_Marks": 90, "AI_marks": 94 },
        { "Name": "Arjun", "Roll_No": 4, "WAD_Marks": 55, "CC_Marks": 60, "DSBDA_Marks": 58, "CNS_Marks": 52, "AI_marks": 61 },
        { "Name": "Ravi", "Roll_No": 5, "WAD_Marks": 76, "CC_Marks": 82, "DSBDA_Marks": 79, "CNS_Marks": 73, "AI_marks": 80 }
    ];

    await Student.insertMany(initial);

    const students = await Student.find();
    renderTable(res, students, 'DB initialized with dummy student marks.');
};

exports.listAll = async (req, res) => {
    const students = await Student.find();
    renderTable(res, students, `Total students: ${students.length}`);
};

exports.moreThanMarks = async (req, res) => {
    await filterByMarks(req, res, 'gt');
};

exports.lessThanMarks = async (req, res) => {
    await filterByMarks(req, res, 'lt');
};

exports.addStudent = async (req, res) => {
    const student = {
        Name: req.body.Name,
        Roll_No: Number(req.body.Roll_No),
        WAD_Marks: Number(req.body.WAD_Marks),
        CC_Marks: Number(req.body.CC_Marks),
        DSBDA_Marks: Number(req.body.DSBDA_Marks),
        CNS_Marks: Number(req.body.CNS_Marks),
        AI_marks: Number(req.body.AI_marks)
    };

    const hasInvalidMarks = [
        student.Roll_No,
        student.WAD_Marks,
        student.CC_Marks,
        student.DSBDA_Marks,
        student.CNS_Marks,
        student.AI_marks
    ].some(value => Number.isNaN(value));

    if (!student.Name || hasInvalidMarks) {
        return renderTable(res, [], 'Please provide all student details with valid marks.');
    }

    await Student.create(student);

    const students = await Student.find();
    renderTable(res, students, 'Student record added successfully.');
};

exports.updateMarks = async (req, res) => {
    const studentName = req.body.studentName;
    const subject = req.body.subject;
    const newMarks = Number(req.body.newMarks);

    if (!studentName || !subject || Number.isNaN(newMarks)) {
        return renderTable(res, [], 'Please provide student name, subject, and marks.');
    }

    const result = await Student.updateMany(
        { Name: studentName },
        { $set: { [subject]: newMarks } }
    );

    const students = await Student.find();

    if (result.matchedCount === 0) {
        return renderTable(res, students, `No student found with name: ${studentName}`);
    }

    renderTable(res, students, `Marks updated for ${studentName}.`);
};

exports.deleteStudent = async (req, res) => {
    const studentName = req.body.studentName;
    const rollNo = Number(req.body.rollNo);

    let result;

    if (studentName) {
        result = await Student.deleteMany({ Name: studentName });
    } else if (!Number.isNaN(rollNo)) {
        result = await Student.deleteOne({ Roll_No: rollNo });
    } else {
        return renderTable(res, [], 'Please provide student name or roll number.');
    }

    const students = await Student.find();

    if (result.deletedCount === 0) {
        return renderTable(res, students, 'No matching student record found.');
    }

    renderTable(res, students, 'Student record(s) deleted.');
};
