import React from "react";

function AttendanceRecord() {
  const leaveDetails = {
    remainingLeaves: 10,
    vacationLeaves: 10,
    sickLeaves: 10,
    appliedLeaves: [
      {
        leaveDate: "2/12/25",
        reason: "Going to the beach",
        dateApplied: "1/22/25",
        firstLevelStatus: "Approved",
        ceoLevelStatus: "Pending Approval",
      },
    ],
  };

  const attendanceData = [
    { date: "Jan 01", day: "Wednesday", morningLogin: "8:00 AM", lunchLogout: "12:10 PM", afternoonLogin: "12:52 PM", eveningLogout: "5:26 PM" },
    { date: "Jan 02", day: "Thursday", morningLogin: "8:00 AM", lunchLogout: "12:10 PM", afternoonLogin: "12:52 PM", eveningLogout: "5:26 PM" },
    { date: "Jan 06", day: "Monday", morningLogin: "8:00 AM", lunchLogout: "12:10 PM", afternoonLogin: "12:52 PM", eveningLogout: "5:26 PM" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance Record</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Morning Login</th>
            <th>Lunch Logout</th>
            <th>Afternoon Login</th>
            <th>Evening Logout</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.day}</td>
              <td>{record.morningLogin}</td>
              <td>{record.lunchLogout}</td>
              <td>{record.afternoonLogin}</td>
              <td>{record.eveningLogout}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Leave Management</h2>
      <div>
        <p>Remaining Leaves: {leaveDetails.remainingLeaves}</p>
        <p>Vacation Leaves: {leaveDetails.vacationLeaves}</p>
        <p>Sick Leaves: {leaveDetails.sickLeaves}</p>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Leave Date</th>
              <th>Reason</th>
              <th>Date Applied</th>
              <th>First Level Status</th>
              <th>CEO Level Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveDetails.appliedLeaves.map((leave, index) => (
              <tr key={index}>
                <td>{leave.leaveDate}</td>
                <td>{leave.reason}</td>
                <td>{leave.dateApplied}</td>
                <td>{leave.firstLevelStatus}</td>
                <td>{leave.ceoLevelStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tableStyle = { width: "100%", borderCollapse: "collapse", border: "1px solid black" };

export default AttendanceRecord;
