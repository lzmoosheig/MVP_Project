'use client';

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {
  accepted: number;
  total: number;
}

export default function CircularAgentProgress({ accepted, total }: Props) {
  const percentage = total === 0 ? 0 : Math.min((accepted / total) * 100, 100);

  const progressColor =
    percentage >= 100 ? 'success.main' :
    percentage >= 50 ? 'warning.main' :
    'error.main';

  const label =
    percentage >= 100 ? '✅ Complet' :
    percentage >= 50 ? '⚠ Partiel' :
    '❌ Incomplet';

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={80}
          thickness={5}
          sx={{ color: progressColor }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" fontSize={16} fontWeight="bold">
            {Math.round(percentage)}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" fontSize={13} sx={{ mt: 1, color: progressColor }}>
        {label}
      </Typography>
    </Box>
  );
}