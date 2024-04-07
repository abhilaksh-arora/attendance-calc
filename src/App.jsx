import React, { useState } from "react";

function AttendanceCalculator() {
  const [subjects, setSubjects] = useState([
    {
      name: "Basics of Digital Business Ecosystem",
      totalClasses: 0,
      classesAttended: 0,
      minClassesToAttend: 0,
      avgAttendance: 0,
    },
    {
      name: "Communication Skills - Advanced Course",
      totalClasses: 0,
      classesAttended: 0,
      minClassesToAttend: 0,
      avgAttendance: 0,
    },
    {
      name: "Data Analytics using MS-EXCEL",
      totalClasses: 0,
      classesAttended: 0,
      minClassesToAttend: 0,
      avgAttendance: 0,
    },
    {
      name: "Data Base Management Systems",
      totalClasses: 0,
      classesAttended: 0,
      minClassesToAttend: 0,
      avgAttendance: 0,
    },
    {
      name: "Introduction to Contemporary Business Practices",
      totalClasses: 0,
      classesAttended: 0,
      minClassesToAttend: 0,
      avgAttendance: 0,
    },
    {
      name: "Sustainability Studies",
      totalClasses: 0,
      classesAttended: 0,
      minClassesToAttend: 0,
      avgAttendance: 0,
    },
  ]);
  const [aggregateAttendance, setAggregateAttendance] = useState(0);

  const calculatePredictions = () => {
    const updatedSubjects = subjects.map((subject) => {
      const attendedPercentage =
        (subject.classesAttended / subject.totalClasses) * 100;
      const minClassesToAttend = Math.ceil(
        ((75 - attendedPercentage) / 100) * subject.totalClasses
      );
      const avgAttendance = attendedPercentage.toFixed(2);
      return { ...subject, minClassesToAttend, avgAttendance };
    });

    const totalAttendance = updatedSubjects.reduce(
      (sum, subject) => sum + parseFloat(subject.avgAttendance),
      0
    );
    const avgAttendance = (totalAttendance / updatedSubjects.length).toFixed(2);

    setSubjects(updatedSubjects);
    setAggregateAttendance(avgAttendance);
  };

  const handleInputChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Attendance Calculator Prediction</h2>
        {subjects.map((subject, index) => (
          <div className="input" key={index}>
            {/* <hr /> */}
            <h3>{subject.name}</h3>
            <div className="input1">
              <div>
                <label>Total Classes:</label>
                <input
                  type="number"
                  value={subject.totalClasses}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "totalClasses",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
              <div>
                <label>Classes Attended:</label>
                <input
                  type="number"
                  value={subject.classesAttended}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "classesAttended",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
            </div>
            <p className="result">
              Attendance: <span id="result">{subject.avgAttendance}%</span>
            </p>
            <p className="result">
              {subject.minClassesToAttend < 0 ? (
                <span id="result">
                  You can leave {Math.abs(subject.minClassesToAttend)} classes.
                </span>
              ) : (
                <span id="result1">
                  You have to attend {subject.minClassesToAttend} classes.
                </span>
              )}
            </p>
          </div>
        ))}
        <button onClick={calculatePredictions}>Calculate Predictions</button>
        <div className="result">
          <p>Aggregate Attendance: {aggregateAttendance}%</p>
        </div>
      </div>
    </div>
  );
}

export default AttendanceCalculator;
