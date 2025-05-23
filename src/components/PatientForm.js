// src/components/PatientForm.js
import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  Box, 
  Typography, 
  TextField, 
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Alert
} from '@mui/material';
import { Close, Person, Phone, Email, LocationOn } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { mockPatients } from '../data/mockSessions';

export default function PatientForm({ open, onClose, onPatientSelect }) {
  const [isNewPatient, setIsNewPatient] = useState(true);
  const [matchingPatients, setMatchingPatients] = useState([]);
  const [whatsappSameAsMobile, setWhatsappSameAsMobile] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm();
  
  const watchedMobile = watch('mobile');
  const watchedName = watch('name');
  const watchedEmail = watch('email');

  useEffect(() => {
    if (whatsappSameAsMobile && watchedMobile) {
      setValue('whatsapp', watchedMobile);
    }
  }, [whatsappSameAsMobile, watchedMobile, setValue]);

  useEffect(() => {
    // Search for existing patients based on name, mobile, or email
    if (watchedName || watchedMobile || watchedEmail) {
      const matches = mockPatients.filter(patient => 
        (watchedName && patient.name.toLowerCase().includes(watchedName.toLowerCase())) ||
        (watchedMobile && patient.mobile.includes(watchedMobile)) ||
        (watchedEmail && patient.email.toLowerCase().includes(watchedEmail.toLowerCase()))
      );
      setMatchingPatients(matches);
      setIsNewPatient(matches.length === 0);
    } else {
      setMatchingPatients([]);
      setIsNewPatient(true);
    }
  }, [watchedName, watchedMobile, watchedEmail]);

  const onSubmit = (data) => {
    const patientData = {
      ...data,
      id: Date.now(),
      isNew: true
    };
    onPatientSelect(patientData);
  };

  const handleExistingPatientSelect = (patient) => {
    onPatientSelect({ ...patient, isNew: false });
  };

  const formFields = [
    {
      name: 'name',
      label: 'Full Name',
      icon: <Person />,
      validation: { required: 'Name is required' }
    },
    {
      name: 'mobile',
      label: 'Mobile Number',
      icon: <Phone />,
      validation: { 
        required: 'Mobile number is required',
        pattern: {
          value: /^[0-9]{10}$/,
          message: 'Please enter a valid 10-digit mobile number'
        }
      }
    },
    {
      name: 'whatsapp',
      label: 'WhatsApp Number',
      icon: <Phone />,
      disabled: whatsappSameAsMobile,
      validation: !whatsappSameAsMobile ? {
        pattern: {
          value: /^[0-9]{10}$/,
          message: 'Please enter a valid 10-digit WhatsApp number'
        }
      } : {}
    },
    {
      name: 'email',
      label: 'Email ID',
      icon: <Email />,
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Please enter a valid email address'
        }
      }
    },
    {
      name: 'address',
      label: 'Address',
      icon: <LocationOn />,
      multiline: true,
      rows: 3,
      validation: { required: 'Address is required' }
    }
  ];

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
              Patient Information
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Existing Patients Section */}
            <AnimatePresence>
              {matchingPatients.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                    Found {matchingPatients.length} matching patient(s)
                  </Alert>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
                    Existing Patients
                  </Typography>
                  <List sx={{ 
                    bgcolor: '#F8FAFC', 
                    borderRadius: 2, 
                    mb: 3,
                    border: '1px solid #E5E7EB'
                  }}>
                    {matchingPatients.map((patient, index) => (
                      <motion.div
                        key={patient.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ListItem disablePadding>
                          <ListItemButton 
                            onClick={() => handleExistingPatientSelect(patient)}
                            sx={{ borderRadius: 1 }}
                          >
                            <ListItemText
                              primary={patient.name}
                              secondary={`${patient.mobile} • ${patient.email}`}
                            />
                          </ListItemButton>
                        </ListItem>
                        {index < matchingPatients.length - 1 && <Divider />}
                      </motion.div>
                    ))}
                  </List>
                </motion.div>
              )}
            </AnimatePresence>

            {/* New Patient Form */}
            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 3 }}>
              {matchingPatients.length > 0 ? 'Or Add New Patient' : 'Add New Patient'}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        {...register(field.name, field.validation)}
                        label={field.label}
                        fullWidth
                        variant="outlined"
                        disabled={field.disabled}
                        multiline={field.multiline}
                        rows={field.rows}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]?.message}
                        InputProps={{
                          startAdornment: field.icon ? (
                            <Box sx={{ mr: 1, color: 'text.secondary' }}>
                              {field.icon}
                            </Box>
                          ) : null,
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#6366F1',
                              }
                            },
                            '&.Mui-focused': {
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#6366F1',
                                borderWidth: 2,
                              }
                            }
                          }
                        }}
                      />
                    </Box>
                  </motion.div>
                ))}

                {/* WhatsApp Same as Mobile Checkbox */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={whatsappSameAsMobile}
                        onChange={(e) => setWhatsappSameAsMobile(e.target.checked)}
                        sx={{
                          color: '#6366F1',
                          '&.Mui-checked': {
                            color: '#6366F1',
                          }
                        }}
                      />
                    }
                    label="WhatsApp number same as mobile number"
                    sx={{ 
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.875rem',
                        color: 'text.secondary'
                      }
                    }}
                  />
                </motion.div>
              </Box>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mt: 4,
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
                    type="submit"
                    variant="contained"
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
                    Continue
                  </Button>
                </Box>
              </motion.div>
            </form>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}