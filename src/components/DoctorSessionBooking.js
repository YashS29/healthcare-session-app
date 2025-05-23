// components/DoctorSessionBooking.js
import { useState } from 'react';
import { Button, MenuItem, Select, Typography, Box } from '@mui/material';
import SessionTimeSelector from './SessionTimeSelector';
import { mockDoctors } from '../data/mockSessions';

export default function DoctorSessionBooking() {
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [openTimeSelector, setOpenTimeSelector] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const selectedDoctor = mockDoctors.find(doc => doc.id === Number(selectedDoctorId));

  const handleOpenSelector = () => {
    if (selectedDoctorId) {
      setOpenTimeSelector(true);
    }
  };

  const handleCloseSelector = () => {
    setOpenTimeSelector(false);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
    setOpenTimeSelector(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 6, p: 2 }}>
      <Typography variant="h5" mb={3} fontWeight="600">
        Book a Session
      </Typography>

      <Select
        fullWidth
        value={selectedDoctorId}
        onChange={(e) => setSelectedDoctorId(e.target.value)}
        displayEmpty
        sx={{ mb: 3 }}
      >
        <MenuItem value="" disabled>
          Select Doctor
        </MenuItem>
        {mockDoctors.map((doctor) => (
          <MenuItem key={doctor.id} value={doctor.id}>
            {doctor.name} — {doctor.specialization}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant="contained"
        fullWidth
        disabled={!selectedDoctorId}
        onClick={handleOpenSelector}
      >
        Select Session Time
      </Button>

      {selectedDoctor && selectedTimeSlot && (
        <Box mt={4} p={2} sx={{ border: '1px solid #ddd', borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">
            Selected Session:
          </Typography>
          <Typography>
            Doctor: {selectedDoctor.name} ({selectedDoctor.specialization})
          </Typography>
          <Typography>
            Time: {selectedTimeSlot.time} ({selectedTimeSlot.period})
          </Typography>
        </Box>
      )}

      {selectedDoctor && (
        <SessionTimeSelector
          open={openTimeSelector}
          onClose={handleCloseSelector}
          onTimeSlotSelect={handleTimeSlotSelect}
          availableTimeSlots={selectedDoctor.availableTimeSlots} // pass this prop
        />
      )}
    </Box>
  );
}
