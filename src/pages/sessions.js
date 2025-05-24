// src/pages/sessions.js
import React, { useState } from 'react';
import { mockSessions } from '../data/mockSessions';

export default function SessionsPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSessions =
    filterStatus === 'all'
      ? mockSessions
      : mockSessions.filter(session => session.status === filterStatus);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sessions</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="statusFilter" style={{ marginRight: '0.5rem' }}>
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ width: '100%', borderCollapse: 'collapse' }}
      >
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>Time</th>
            <th>Doctor</th>
            <th>Duration</th>
            <th>Mode</th>
            <th>Status</th>
            <th>Date</th>
            <th>Previous Session</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No sessions found.
              </td>
            </tr>
          ) : (
            filteredSessions.map(session => (
              <tr key={session.id}>
                <td>{session.time}</td>
                <td>{session.doctor}</td>
                <td>{session.duration}</td>
                <td>{session.mode}</td>
                <td
                  style={{
                    color:
                      session.status === 'completed'
                        ? 'green'
                        : session.status === 'upcoming'
                        ? 'blue'
                        : 'red',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {session.status}
                </td>
                <td>{session.date}</td>
                <td>{session.previousSession}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
