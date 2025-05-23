// src/pages/api/sessions.js
// import { mockSessions } from '../../data/mockSessions';
import { mockSessions } from '../data/mockSessions';


export default function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      // Get sessions with optional filtering
      const { status, patientId, doctorId, date } = query;
      let filteredSessions = [...mockSessions];
      
      if (status) {
        filteredSessions = filteredSessions.filter(session => session.status === status);
      }
      
      if (patientId) {
        filteredSessions = filteredSessions.filter(session => session.patientId === parseInt(patientId));
      }
      
      if (doctorId) {
        filteredSessions = filteredSessions.filter(session => session.doctorId === parseInt(doctorId));
      }
      
      if (date) {
        filteredSessions = filteredSessions.filter(session => session.date === date);
      }
      
      res.status(200).json(filteredSessions);
      break;
      
    case 'POST':
      // Create new session
      const newSession = {
        id: Date.now(),
        ...body,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, you would save to database
      mockSessions.unshift(newSession);
      
      // Send notification (mock)
      console.log(`Session scheduled: ${newSession.id}`);
      
      res.status(201).json({
        success: true,
        session: newSession,
        message: 'Session scheduled successfully'
      });
      break;
      
    case 'PUT':
      // Update session
      const { id } = query;
      const sessionIndex = mockSessions.findIndex(s => s.id === parseInt(id));
      
      if (sessionIndex === -1) {
        res.status(404).json({ error: 'Session not found' });
        return;
      }
      
      mockSessions[sessionIndex] = {
        ...mockSessions[sessionIndex],
        ...body,
        updatedAt: new Date().toISOString()
      };
      
      res.status(200).json({
        success: true,
        session: mockSessions[sessionIndex],
        message: 'Session updated successfully'
      });
      break;
      
    case 'DELETE':
      // Cancel session
      const deleteId = query.id;
      const deleteIndex = mockSessions.findIndex(s => s.id === parseInt(deleteId));
      
      if (deleteIndex === -1) {
        res.status(404).json({ error: 'Session not found' });
        return;
      }
      
      mockSessions[deleteIndex].status = 'cancelled';
      mockSessions[deleteIndex].cancelledAt = new Date().toISOString();
      
      res.status(200).json({
        success: true,
        message: 'Session cancelled successfully'
      });
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}