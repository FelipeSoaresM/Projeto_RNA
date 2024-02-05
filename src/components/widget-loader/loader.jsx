import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function Loader() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress variant="solid" color="primary" />
      </Box>
    </div>
  );
}
