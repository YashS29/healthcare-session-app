// src/components/SessionScheduler.js
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  Box, 
  Typography, 
  Button,
  IconButton,
  Card,
  CardContent,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip
} from '@mui/material';
import { Close, Person, Phone, Email, LocationOn, AccessTime, CalendarToday } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SessionScheduler({ open, onClose, onSchedule, timeSlot, patient }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionType, setSessionType] = useState('online');
  const [notes, setNotes] = useState('');

  const handleSchedule = () => {
    const sessionData = {
      date: selectedDate,
      sessionType,
      notes,
      timeSlot,
      patient,
      scheduledAt: new Date()
    };
    onSchedule(sessionData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
          m: 2
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <DialogContent sx={{ p: 0 }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 3,
            borderBottom: '1px solid #E5E7EB'
          }}>
            <Typography variant="h6" fontWeight="600">
              Schedule Session
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Selected Time Slot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ mb: 3, bgcolor: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1" fontWeight="600">
                      Selected Time Slot
                    </Typography>
                  </Box>
                  <Chip
                    label={`${timeSlot?.time} - ${timeSlot?.period}`}
                    color="primary"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Patient Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card sx={{ mb: 3, bgcolor: '#F8FAFC', border: '1px solid #E5E7EB' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Person sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="subtitle1" fontWeight="600">
                      Patient Information
                    </Typography>
                    {patient?.isNew && (
                      <Chip 
                        label="New Patient" 
                        size="small" 
                        color="success" 
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Person sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                      <Typography variant="body2">{patient?.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Phone sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                      <Typography variant="body2">{patient?.mobile}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Email sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary' }} />
                      <Typography variant="body2">{patient?.email}</Typography>
                    </Box>
                    {patient?.address && (
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <LocationOn sx={{ mr: 1, fontSize: '1rem', color: 'text.secondary', mt: 0.2 }} />
                        <Typography variant="body2">{patient?.address}</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="subtitle1" fontWeight="600">
                    Select Date
                  </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minDate={new Date()}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </motion.div>

            {/* Session Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                  Session Type
                </FormLabel>
                <RadioGroup
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  sx={{ flexDirection: 'row', gap: 2 }}
                >
                  <FormControlLabel
                    value="online"
                    control={<Radio sx={{ color: '#6366F1', '&.Mui-checked': { color: '#6366F1' } }} />}
                    label={
                      <Box>
                        <Typography variant="body2" fontWeight="600">Online</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Video consultation
                        </Typography>
                      </Box>
                    }
                    sx={{
                      flex: 1,
                      m: 0,
                      p: 2,
                      border: sessionType === 'online' ? '2px solid #6366F1' : '1px solid #E5E7EB',
                      borderRadius: 2,
                      bgcolor: sessionType === 'online' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  />
                  <FormControlLabel
                    value="in-person"
                    control={<Radio sx={{ color: '#6366F1', '&.Mui-checked': { color: '#6366F1' } }} />}
                    label={
                      <Box>
                        <Typography variant="body2" fontWeight="600">In-Person</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Physical consultation
                        </Typography>
                      </Box>
                    }
                    sx={{
                      flex: 1,
                      m: 0,
                      p: 2,
                      border: sessionType === 'in-person' ? '2px solid #6366F1' : '1px solid #E5E7EB',
                      borderRadius: 2,
                      bgcolor: sessionType === 'in-person' ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                      transition: 'all 0.2s ease-in-out'
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </motion.div>

            {/* Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                  Additional Notes (Optional)
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Add any special instructions or notes for the session..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                pt: 3,
                borderTop: '1px solid #E5E7EB'
              }}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{ 
                    flex: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSchedule}
                  sx={{ 
                    flex: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    }
                  }}
                >
                  Schedule Session
                </Button>
              </Box>
            </motion.div>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}