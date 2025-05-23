// src/data/mockSessions.js

export const mockSessions = [
    {
      id: 1,
      time: '11:00 AM',
      doctor: 'Dr. Kiran Rathi',
      duration: '01:00 HR',
      mode: 'Online',
      status: 'upcoming',
      date: 'Today',
      previousSession: 'Tuesday, March 5, 2023'
    },
    {
      id: 2,
      time: '12:00 AM',
      doctor: 'Dr. Ramesh Naik',
      duration: '45 MIN',
      mode: 'In-Person',
      status: 'completed',
      date: 'Tuesday, March 25, 2023',
      previousSession: 'Tuesday, March 15, 2023'
    },
    {
      id: 3,
      time: '10:30 AM',
      doctor: 'Dr. Suresh Sawant',
      duration: '30 MIN',
      mode: 'Online',
      status: 'completed',
      date: 'Tuesday, March 15, 2023',
      previousSession: 'Tuesday, March 5, 2023'
    },
    {
      id: 4,
      time: '09:30 AM',
      doctor: 'Dr. Neeta Singh',
      duration: '01:00 HR',
      mode: 'In-Person',
      status: 'completed',
      date: 'Tuesday, Feb 28, 2023',
      previousSession: 'Tuesday, Feb 15, 2023'
    }
  ];
  
  export const mockPatients = [
    {
      id: 1,
      name: 'John Doe',
      mobile: '9876543210',
      whatsapp: '9876543210',
      email: 'john.doe@example.com',
      address: '123 Main Street, Mumbai, Maharashtra 400001'
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobile: '9876543211',
      whatsapp: '9876543211',
      email: 'jane.smith@example.com',
      address: '456 Park Avenue, Delhi, Delhi 110001'
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      mobile: '9876543212',
      whatsapp: '9876543212',
      email: 'rajesh.kumar@example.com',
      address: '789 Gandhi Road, Bangalore, Karnataka 560001'
    },
    {
      id: 4,
      name: 'Priya Sharma',
      mobile: '9876543213',
      whatsapp: '9876543213',
      email: 'priya.sharma@example.com',
      address: '321 MG Road, Pune, Maharashtra 411001'
    },
    {
      id: 5,
      name: 'Amit Patel',
      mobile: '9876543214',
      whatsapp: '9876543214',
      email: 'amit.patel@example.com',
      address: '654 Commercial Street, Chennai, Tamil Nadu 600001'
    }
  ];
  
  export const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Kiran Rathi',
      specialization: 'Clinical Psychology',
      experience: '8 years',
      rating: 4.8,
      availableTimeSlots: {
        morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
        afternoon: ['02:00 PM', '03:00 PM', '04:00 PM'],
        evening: ['06:00 PM', '07:00 PM']
      }
    },
    {
      id: 2,
      name: 'Dr. Ramesh Naik',
      specialization: 'Counseling Psychology',
      experience: '12 years',
      rating: 4.9,
      availableTimeSlots: {
        morning: ['09:30 AM', '10:30 AM'],
        afternoon: ['12:00 PM', '01:00 PM', '03:00 PM'],
        evening: ['06:30 PM', '07:30 PM']
      }
    },
    {
      id: 3,
      name: 'Dr. Suresh Sawant',
      specialization: 'Behavioral Therapy',
      experience: '10 years',
      rating: 4.7,
      availableTimeSlots: {
        morning: ['08:30 AM', '09:30 AM', '10:30 AM'],
        afternoon: ['02:30 PM', '03:30 PM'],
        evening: ['06:00 PM', '07:00 PM', '08:00 PM']
      }
    },
    {
      id: 4,
      name: 'Dr. Neeta Singh',
      specialization: 'Child Psychology',
      experience: '15 years',
      rating: 4.9,
      availableTimeSlots: {
        morning: ['09:00 AM', '10:00 AM'],
        afternoon: ['01:00 PM', '02:00 PM', '04:00 PM'],
        evening: ['05:30 PM', '06:30 PM']
      }
    }
  ];