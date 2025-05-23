import dynamic from 'next/dynamic';
import { Skeleton } from '@mui/material';

// Lazy load heavy components
export const LazySessionTimeSelector = dynamic(
  () => import('./SessionTimeSelector'),
  {
    loading: () => <Skeleton variant="rectangular" height={400} />,
    ssr: false
  }
);

export const LazyPatientForm = dynamic(
  () => import('./PatientForm'),
  {
    loading: () => <Skeleton variant="rectangular" height={500} />,
    ssr: false
  }
);

export const LazySessionScheduler = dynamic(
  () => import('./SessionScheduler'),
  {
    loading: () => <Skeleton variant="rectangular" height={400} />,
    ssr: false
  }
);