import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatAddButton({ callback }) {
  const styles = {
    float: {
      position: 'fixed',
      width: 60,
      height: 60,
      bottom: 40,
      right: 40,
    },
  };
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} style={styles.float}>
      <Fab color="primary" aria-label="add" onClick={callback}>
        <AddIcon />
      </Fab>
    </Box>
  );
}
