// src/components/SessionTimeSelector.js
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  Box, 
  Typography, 
  IconButton, 
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Close, ExpandMore } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const timeSlots = {
  morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  afternoon: ['12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'],
  evening: ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
  night: ['08:00 PM', '09:00 PM', '10:00 PM', '10:30 PM']
};

export default function SessionTimeSelector({ open, onClose, onTimeSlotSelect }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [expandedPeriod, setExpandedPeriod] = useState('morning');

  const handleSlotSelect = (slot, period) => {
    setSelectedSlot({ time: slot, period });
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      onTimeSlotSelect(selectedSlot);
    }
  };

  const handlePeriodChange = (period) => (event, isExpanded) => {
    setExpandedPeriod(isExpanded ? period : false);
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
              Select Session Time
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>

          {/* Time Periods */}
          <Box sx={{ p: 3 }}>
            {Object.entries(timeSlots).map(([period, slots]) => (
              <Accordion
                key={period}
                expanded={expandedPeriod === period}
                onChange={handlePeriodChange(period)}
                sx={{ 
                  mb: 1,
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px !important',
                  '&.Mui-expanded': {
                    margin: '0 0 8px 0',
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    borderRadius: '12px',
                    textTransform: 'capitalize',
                    '&.Mui-expanded': {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="600">
                    {period}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <AnimatePresence>
                    {expandedPeriod === period && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: 1,
                          mt: 1
                        }}>
                          {slots.map((slot) => (
                            <motion.div
                              key={slot}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                            >
                              <Chip
                                label={slot}
                                onClick={() => handleSlotSelect(slot, period)}
                                variant={selectedSlot?.time === slot ? 'filled' : 'outlined'}
                                color={selectedSlot?.time === slot ? 'primary' : 'default'}
                                sx={{
                                  width: '100%',
                                  height: 40,
                                  fontSize: '0.875rem',
                                  borderRadius: 2,
                                  transition: 'all 0.2s ease-in-out',
                                  '&:hover': {
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)',
                                  }
                                }}
                              />
                            </motion.div>
                          ))}
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Actions */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            p: 3,
            borderTop: '1px solid #E5E7EB'
          }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ 
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={!selectedSlot}
              sx={{ 
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                }
              }}
            >
              Confirm
            </Button>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}