import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {children}
    </Box>
  );
}