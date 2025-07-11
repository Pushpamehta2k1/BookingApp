import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';

// Room options
const ROOM_OPTIONS = [
  { label: "Event/Meeting room", capacity: 250, features: ["projector"] },
  { label: "Conference Room", capacity: 300, features: ["projector", "whiteboard"] },
  { label: "Small Meeting Room", capacity: 50, features: [] }
];

const formatTimeTo12Hour = (time) => {
  const [hour, minute] = time.split(':');
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12; // Convert to 12-hour format
  return `${formattedHour}:${minute} ${suffix}`;
};

function BookingModal({ isOpen, onClose, onAddBooking, initialData }) {
  const [room, setRoom] = useState(initialData.room || ROOM_OPTIONS[0].label);
  const [name, setName] = useState(initialData.name || "");
  const [bookingDate, setBookingDate] = useState(initialData.bookingDate || "");
  const [fromTime, setFromTime] = useState(initialData.fromTime || "");
  const [toTime, setToTime] = useState(initialData.toTime || "");
  const [notes, setNotes] = useState(initialData.notes || "");

  const selectedRoom = ROOM_OPTIONS.find(r => r.label === room);

  function handleSubmit(e) {
    e.preventDefault();
    if (!room || !name || !bookingDate || !fromTime || !toTime) {
      alert("Please fill all required fields.");
      return;
    }
    if (fromTime >= toTime) {
      alert("End time must be after start time.");
      return;
    }

    const newBooking = {
      room,
      name,
      bookingDate,
      fromTime,
      toTime,
      notes,
    };
    onAddBooking(newBooking);
    onClose(); // Close modal after adding booking
  }

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3 style={{ marginBottom: 10, fontWeight: "bold" }}>Book a Room</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>
            Room: <span style={{ color: "red" }}>*</span><br />
            <select value={room} onChange={e => setRoom(e.target.value)} required style={styles.input}>
              {ROOM_OPTIONS.map(r => (
                <option key={r.label} value={r.label}>{r.label}</option>
              ))}
            </select>
          </label>
          <label>
            Name: <span style={{ color: "red" }}>*</span><br />
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={styles.input} />
          </label>
          <label>
            Booking Date: <span style={{ color: "red" }}>*</span><br />
            <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} required style={styles.input} />
          </label>
          <label>
            From: <span style={{ color: "red" }}>*</span><br />
            <input type="time" value={fromTime} onChange={e => setFromTime(e.target.value)} required style={styles.input} />
          </label>
          <label>
            To: <span style={{ color: "red" }}>*</span><br />
            <input type="time" value={toTime} onChange={e => setToTime(e.target.value)} required style={styles.input} />
          </label>
          <label>
            Meeting Description:<br />
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows="3" style={{ ...styles.input, resize: "vertical" }} />
          </label>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button type="button" style={styles.cancelButton} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.bookButton}>Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Calendar({ bookings, onDateClick }) {
  // Adjust for 2025 calendar layout
  const daysInMonth = 31; // January has 31 days
  const firstDayOfMonth = new Date(2025, 0, 7).getDay(); // January 1, 2025
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  function bookingsForDay(day) {
    return bookings.filter(b => {
      if (!b.bookingDate) return false;
      const dayInBooking = new Date(b.bookingDate).getDate();
      return dayInBooking === day;
    });
  }

  const roomColors = {
    "Event/Meeting room": "#34D399",
    "Conference Room": "#60A5FA",
    "Small Meeting Room": "#FBBF24",
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 8,
      marginTop: 20,
      backgroundColor: "rgba(255,255,255,0.8)",
      borderRadius: 10,
      padding: 10,
      boxShadow: "0 0 8px rgba(0,0,0,0.1)"
    }}>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(dayName => (
        <div key={dayName} style={{ fontWeight: "bold", textAlign: "center" }}>{dayName}</div>
      ))}
      {Array.from({ length: firstDayOfMonth }, (_, i) => <div key={i} />)} {/* Empty spaces for the first week */}
      {days.map(day => {
        const dayBookings = bookingsForDay(day);
        return (
          <div key={day} style={{
            minHeight: 80,
            border: "1px solid #ddd",
            borderRadius: 6,
            padding: 4,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            fontSize: 11,
            cursor: "pointer"
          }} onClick={() => onDateClick(day)}>
            <div style={{ fontWeight: "600", marginBottom: 4 }}>{day}</div>
            <div style={{ flexGrow: 1, overflowY: "auto" }}>
              {dayBookings.map((b, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: roomColors[b.room] || "#ccc",
                    marginBottom: 2,
                    borderRadius: 4,
                    color: "#111",
                    padding: "2px 4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                  title={`${b.name} (${formatTimeTo12Hour(b.fromTime)} - ${formatTimeTo12Hour(b.toTime)})`}
                >
                  {formatTimeTo12Hour(b.fromTime)} {b.name}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BookingCalendar({ onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  function handleAddBooking(newBooking) {
    setBookings(prev => [...prev, newBooking]);
  }

  function handleDateClick(day) {
    const bookingDate = new Date(2025, 0, day).toISOString().split('T')[0]; // January 2025
    setSelectedDate(bookingDate);
    setModalOpen(true);
  }

  return (
    <div style={styles.appContainer}>
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Meeting Rooms</h1>
          <button style={styles.bookBtnTop} onClick={() => setModalOpen(true)}>+ Book</button>
        </header>
        <div style={styles.breadcrumb}>
          Home &gt; Meeting Rooms
        </div>

        <Calendar bookings={bookings} onDateClick={handleDateClick} />

        <BookingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddBooking={(booking) => {
            handleAddBooking(booking);
            setModalOpen(false);
          }}
          initialData={{ bookingDate: selectedDate }}
        />
      </main>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)",
    color: "#111",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    minWidth: 340,
    boxShadow: "0 0 15px rgba(0,0,0,0.25)",
  },
  input: {
    width: "100%",
    padding: "6px 8px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
    boxSizing: "border-box",
  },
  cancelButton: {
    backgroundColor: "#ddd",
    border: "none",
    padding: "8px 16px",
    borderRadius: 20,
    cursor: "pointer",
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#F97316",
    border: "none",
    padding: "8px 20px",
    borderRadius: 20,
    cursor: "pointer",
    fontWeight: "bold",
    color: "#fff",
    boxShadow: "0 4px 8px rgb(249 115 22 / 0.5)",
  },
  mainContent: {
    flexGrow: 1,
    padding: 20,
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookBtnTop: {
    backgroundColor: "#F97316",
    border: "none",
    padding: "10px 18px",
    borderRadius: 20,
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgb(249 115 22 / 0.5)",
    transition: "background-color 0.3s",
  },
  breadcrumb: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
};

export default BookingCalendar;
