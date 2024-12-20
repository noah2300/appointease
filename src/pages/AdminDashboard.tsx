import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-toastify';

const AdminDashboard: React.FC = () => {
  const [securityLogsOpen, setSecurityLogsOpen] = useState(false);
  const [platformSettingsOpen, setPlatformSettingsOpen] = useState(false);

  const handleSecurityLogsClick = () => {
    setSecurityLogsOpen(true);
  };

  const handlePlatformSettingsClick = () => {
    setPlatformSettingsOpen(true);
  };

  const handleCloseSecurityLogs = () => {
    setSecurityLogsOpen(false);
  };

  const handleClosePlatformSettings = () => {
    setPlatformSettingsOpen(false);
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
    setPlatformSettingsOpen(false);
  };

  const securityLogs = [
    { timestamp: '2024-01-20 10:30:00', event: 'User Login', details: 'admin@example.com' },
    { timestamp: '2024-01-20 11:15:00', event: 'Settings Changed', details: 'Email notifications enabled' },
    { timestamp: '2024-01-20 12:00:00', event: 'New Booking', details: 'Booking ID: 12345' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button variant="contained" onClick={handleSecurityLogsClick}>
          Security Logs
        </Button>
        <Button variant="contained" onClick={handlePlatformSettingsClick}>
          Platform Settings
        </Button>
      </Box>

      {/* Security Logs Modal */}
      <Modal
        open={securityLogsOpen}
        onClose={handleCloseSecurityLogs}
        aria-labelledby="security-logs-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" gutterBottom>
            Security Logs
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {securityLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.event}</TableCell>
                    <TableCell>{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button sx={{ mt: 2 }} variant="contained" onClick={handleCloseSecurityLogs}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Platform Settings Modal */}
      <Modal
        open={platformSettingsOpen}
        onClose={handleClosePlatformSettings}
        aria-labelledby="platform-settings-modal"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" gutterBottom>
            Platform Settings
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              Configure platform-wide settings here.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleSaveSettings}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={handleClosePlatformSettings}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
