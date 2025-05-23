// src/pages/index.js
import { useState, useEffect } from 'react';
import { Container, Box, Typography, Avatar, InputBase, IconButton, Paper } from '@mui/material';
import { Search, FilterList, Add } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SessionTimeSelector from '../components/SessionTimeSelector';
import PatientForm from '../components/PatientForm';
import SessionScheduler from '../components/SessionScheduler';
import { mockSessions, mockPatients } from '../data/mockSessions';
import DoctorSessionBooking from '../components/DoctorSessionBooking';

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSessions(mockSessions);
    }, 500);
  }, []);

  const handleScheduleSession = () => {
    setShowTimeSelector(true);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setShowTimeSelector(false);
    setShowPatientForm(true);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setShowPatientForm(false);
    setShowScheduler(true);
  };

  const handleSessionScheduled = (sessionData) => {
    const newSession = {
      id: Date.now(),
      ...sessionData,
      timeSlot: selectedTimeSlot,
      patient: selectedPatient,
      status: 'scheduled'
    };
    setSessions([newSession, ...sessions]);
    setShowScheduler(false);
    setSelectedTimeSlot(null);
    setSelectedPatient(null);
  };

  const upcomingSession = sessions.find(s => s.status === 'upcoming');
  const pastSessions = sessions.filter(s => s.status === 'completed');

  return (
    <Container maxWidth="sm" sx={{ px: 2, py: 3, minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Good morning
            </Typography>
            <Typography variant="h5" fontWeight="600">
              Manjunath Naik
            </Typography>
          </Box>
          <Avatar 
            sx={{ width: 40, height: 40, bgcolor: '#6366F1' }}
            src="/api/placeholder/40/40"
          >
            M
          </Avatar>
        </Box>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Paper 
          sx={{ 
            p: 1, 
            mb: 3, 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <Search sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder="Search Psychologists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1 }}
          />
          <IconButton>
            <FilterList />
          </IconButton>
        </Paper>
      </motion.div>

      {/* Upcoming Session */}
      {upcomingSession && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              Upcoming Session
            </Typography>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="600">
                    {upcomingSession.time}
                  </Typography>
                  <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                      {upcomingSession.doctor.charAt(0)}
                    </Avatar>
                    <Typography variant="body2">
                      {upcomingSession.doctor}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Session Duration: {upcomingSession.duration}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Session Mode: {upcomingSession.mode}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Paper
                    sx={{
                      px: 2,
                      py: 0.5,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                      cursor: 'pointer'
                    }}
                  >
                    <Typography variant="body2" color="white">
                      Mark as Completed
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Paper>
          </Box>
        </motion.div>
      )}

      {/* Past Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
            Past Sessions
          </Typography>
          {pastSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Paper 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderRadius: 2,
                  border: '1px solid #E5E7EB'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="600">
                      {session.doctor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.time}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Previous Session: {session.previousSession}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {session.date}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </motion.div>

      {/* Schedule Now Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Paper
          onClick={handleScheduleSession}
          sx={{
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}
        >
          <Add sx={{ mr: 1 }} />
          <Typography variant="h6" component="span">
            Schedule Now
          </Typography>
        </Paper>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showTimeSelector && (
          <SessionTimeSelector
            open={showTimeSelector}
            onClose={() => setShowTimeSelector(false)}
            onTimeSlotSelect={handleTimeSlotSelect}
          />
        )}
        {showPatientForm && (
          <PatientForm
            open={showPatientForm}
            onClose={() => setShowPatientForm(false)}
            onPatientSelect={handlePatientSelect}
          />
        )}
        {showScheduler && (
          <SessionScheduler
            open={showScheduler}
            onClose={() => setShowScheduler(false)}
            onSchedule={handleSessionScheduled}
            timeSlot={selectedTimeSlot}
            patient={selectedPatient}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}

