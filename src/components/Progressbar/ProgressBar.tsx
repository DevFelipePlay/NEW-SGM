// ProgressBar.tsx
import { Box, Typography } from '@mui/material';
import React from 'react';

interface ProgressBarProps {
  progress: number; // Valor de progresso (entre 0 e 100)
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <>
      <Box sx={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: '16px' }}>
        <Box
          sx={{
            width: `${progress}%`,
            backgroundColor: 'var(--primary_color)',
            borderRadius: '16px',
          }}
        >
          <Typography sx={{ color: 'var(--primary_color)' }}>.</Typography>
        </Box>
      </Box>
      <Typography sx={{ position: 'relative', top: -23, color: 'black' }}>
        {progress.toFixed(2)}%
      </Typography>
    </>
  );
};
