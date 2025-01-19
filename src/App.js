import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import AttendanceRecord from "./Attendancerecord";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now(),
      sender: "You",
      text: newMessage,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage(""); // Clear input
  };

  return (
    <div style={chatContainerStyle}>
      <div style={chatMessagesStyle}>
        {messages.map((msg) => (
          <div key={msg.id} style={messageStyle(msg.sender === "You")}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={chatInputStyle}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={sendMessage} style={sendButtonStyle}>
          Send
        </button>
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("dailyLog"); // Tracks active section
  const [logMessage, setLogMessage] = useState(""); // Tracks Daily Log messages
  const [selectedDate, setSelectedDate] = useState(new Date()); // Tracks selected calendar date
  const [leaveType, setLeaveType] = useState(""); // Tracks the selected leave type
  const [reason, setReason] = useState(""); // Tracks the leave reason
  const [acknowledgmentMessage, setAcknowledgmentMessage] = useState(""); // Acknowledgment message

  // Handle Log-in Button Click
  const handleLogIn = () => {
    const now = new Date();
    setLogMessage(`You logged in at ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
  };

  // Handle Log-out Button Click
  const handleLogOut = () => {
    const now = new Date();
    setLogMessage(`You logged out at ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
  };

  // Handle Leave Type Selection
  const handleLeaveType = (type) => {
    setLeaveType(type);
    setAcknowledgmentMessage(""); // Clear acknowledgment when changing leave type
  };

  // Handle Leave Submission
  const handleSubmit = () => {
    if (!leaveType || !reason.trim()) {
      setAcknowledgmentMessage("Please select a leave type and provide a reason.");
    } else {
      setAcknowledgmentMessage(
        `Your leave application has been submitted. Wait for its approval. If it is an emergency, please notify your immediate supervisor.`
      );
      setReason(""); // Clear the reason box after submission
    }
  };

  return (
    <Router>
      <div className="App">
        <header style={{ backgroundColor: "#000000", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={require('./00.logo2.jpg')} alt="LandHomesTexas Logo" style={{ height: "70px", marginRight: "20px" }} />
            <h1 style={{ marginLeft: 550, fontSize: "2rem", color: "#b8bf3d" }}>Employee Portal</h1>
          </div>
          <nav>
            <button style={buttonStyle} onClick={() => setActiveSection("dailyLog")}>Daily Log</button>
            <button style={buttonStyle} onClick={() => setActiveSection("leaveApplication")}>Leave Application</button>
            <Link to="/attendanceRecord" style={linkStyle}>
              <button style={buttonStyle}>Attendance Record</button>
            </Link>
            <button style={buttonStyle} onClick={() => setActiveSection("internalChat")}>Internal Chat</button>
            <button style={buttonStyle}>Employee Directory</button>
          </nav>
        </header>
        <main style={mainStyle}>
          <div style={leftColumnStyle}>
            <h2>Monthly Calendar</h2>
            <Calendar
              onChange={setSelectedDate} // Update selected date
              value={selectedDate}
            />
            <p style={{ marginTop: "10px" }}>
              Selected Date: <strong>{selectedDate.toLocaleDateString()}</strong>
            </p>
          </div>
          <div style={rightColumnStyle}>
            {activeSection === "dailyLog" && (
              <div>
                <h2>Daily Log</h2>
                <div style={reminderBoxStyle}>
                  <h3>Reminders:</h3>
                  <ol>
                    <li>Login when reporting in the morning.</li>
                    <li>Log-out when taking a break.</li>
                    <li>Log-in when reporting back after the break.</li>
                    <li>Log-out when you're done for the day.</li>
                  </ol>
                </div>
                <button style={dailyLogButtonStyle} onClick={handleLogIn}>Log-in</button>
                <button style={dailyLogButtonStyle} onClick={handleLogOut}>Log-Out</button>
                {logMessage && <p style={{ marginTop: "20px" }}>{logMessage}</p>}
              </div>
            )}
            {activeSection === "leaveApplication" && (
              <div>
                <h2>Leave Application</h2>
                <button style={leaveButtonStyle} onClick={() => handleLeaveType("Vacation Leave")}>Vacation Leave</button>
                <button style={leaveButtonStyle} onClick={() => handleLeaveType("Sick/Emergency Leave")}>Sick/Emergency Leave</button>
                {leaveType && (
                  <div style={{ marginTop: "20px" }}>
                    <h3>Selected Leave Type: {leaveType}</h3>
                    <label htmlFor="reason">Reason:</label>
                    <textarea
                      id="reason"
                      rows="4"
                      style={textareaStyle}
                      placeholder="Enter your reason here..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <button style={submitButtonStyle} onClick={handleSubmit}>Submit</button>
                    {acknowledgmentMessage && <p style={{ marginTop: "20px", color: "green" }}>{acknowledgmentMessage}</p>}
                  </div>
                )}
              </div>
            )}
            {activeSection === "internalChat" && (
              <div>
                <h2>Internal Chat</h2>
                <Chat />
              </div>
            )}
          </div>
        </main>
        <Routes>
          <Route path="/attendanceRecord" element={<AttendanceRecord />} />
        </Routes>
      </div>
    </Router>
  );
}
// Styles
const buttonStyle = {
  backgroundColor: "#b8bf3d",
  color: "#ffffff",
  border: "1px solid #ffffff",
  borderRadius: "5px",
  padding: "10px 20px",
  margin: "0 5px",
  cursor: "pointer",
};

const mainStyle = {
  display: "flex",
  padding: "20px",
  backgroundColor: "#000000",
  color: "#ffffff",
};

const leftColumnStyle = {
  flex: 1,
  marginRight: "20px",
  backgroundColor: "#ffffff",
  color: "#000000",
  padding: "20px",
  borderRadius: "5px",
};

const rightColumnStyle = {
  flex: 1,
  backgroundColor: "#ffffff",
  color: "#000000",
  padding: "20px",
  borderRadius: "5px",
};

const reminderBoxStyle = {
  backgroundColor: "#f9f9f9",
  color: "#000",
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "20px",
};

const dailyLogButtonStyle = {
  backgroundColor: "#ffffff",
  color: "#000000",
  border: "1px solid #000000",
  borderRadius: "5px",
  padding: "10px 20px",
  margin: "10px",
  cursor: "pointer",
};

const leaveButtonStyle = {
  backgroundColor: "#ffffff",
  color: "#000000",
  border: "1px solid #000000",
  borderRadius: "5px",
  padding: "10px 20px",
  margin: "10px",
  cursor: "pointer",
};

const submitButtonStyle = {
  backgroundColor: "#b8bf3d",
  color: "#000000",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  marginTop: "10px",
  cursor: "pointer",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const chatContainerStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "300px",
  height: "400px",
  backgroundColor: "#fff",
  padding: "10px",
};

const chatMessagesStyle = {
  flex: 1,
  overflowY: "auto",
  marginBottom: "10px",
};

const chatInputStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const sendButtonStyle = {
  backgroundColor: "#b8bf3d",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  padding: "10px",
  cursor: "pointer",
};

const messageStyle = (isUser) => ({
  textAlign: isUser ? "right" : "left",
  margin: "5px 0",
});

const tableHeaderStyle = {
  backgroundColor: "#b8bf3d",
  color: "#000",
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "center",
};

const tableCellStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "center",
};

const headerStyle = { backgroundColor: "#b8bf3d", padding: "10px"};
const linkStyle = { textDecoration: "none"};

export default App;
