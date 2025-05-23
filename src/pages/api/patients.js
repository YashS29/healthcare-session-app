// src/pages/api/patients.js
import { mockPatients } from '../../data/mockSessions';

export default function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      // Search patients
      const { search } = query;
      if (search) {
        const filteredPatients = mockPatients.filter(patient => 
          patient.name.toLowerCase().includes(search.toLowerCase()) ||
          patient.mobile.includes(search) ||
          patient.email.toLowerCase().includes(search.toLowerCase())
        );
        res.status(200).json(filteredPatients);
      } else {
        res.status(200).json(mockPatients);
      }
      break;
      
    case 'POST':
      // Create new patient
      const newPatient = {
        id: Date.now(),
        ...body,
        createdAt: new Date().toISOString(),
      };
      
      // In a real app, you would save to database
      mockPatients.push(newPatient);
      
      res.status(201).json({
        success: true,
        patient: newPatient,
        message: 'Patient created successfully'
      });
      break;
      
    case 'PUT':
      // Update patient
      const { id } = query;
      const patientIndex = mockPatients.findIndex(p => p.id === parseInt(id));
      
      if (patientIndex === -1) {
        res.status(404).json({ error: 'Patient not found' });
        return;
      }
      
      mockPatients[patientIndex] = {
        ...mockPatients[patientIndex],
        ...body,
        updatedAt: new Date().toISOString()
      };
      
      res.status(200).json({
        success: true,
        patient: mockPatients[patientIndex],
        message: 'Patient updated successfully'
      });
      break;
      
    case 'DELETE':
      // Delete patient
      const deleteId = query.id;
      const deleteIndex = mockPatients.findIndex(p => p.id === parseInt(deleteId));
      
      if (deleteIndex === -1) {
        res.status(404).json({ error: 'Patient not found' });
        return;
      }
      
      mockPatients.splice(deleteIndex, 1);
      
      res.status(200).json({
        success: true,
        message: 'Patient deleted successfully'
      });
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}