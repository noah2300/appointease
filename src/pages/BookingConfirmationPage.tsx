import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleDownloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
      AppointEase Booking Receipt
      -------------------------
      Booking ID: ${Math.random().toString(36).substr(2, 9)}
      Date: ${new Date().toLocaleDateString()}
      Time: ${new Date().toLocaleTimeString()}
      -------------------------
      Thank you for booking with AppointEase!
    `;

    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointease-receipt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleAddToCalendar = () => {
    // Create calendar event URL
    const event = {
      text: 'AppointEase Booking',
      dates: new Date().toISOString(),
      details: 'Your appointment details here',
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.text
    )}&dates=${encodeURIComponent(event.dates)}/${encodeURIComponent(
      event.dates
    )}&details=${encodeURIComponent(event.details)}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="primary">
          Booking Confirmed!
        </Typography>

        <Typography variant="body1" paragraph>
          Your appointment has been successfully booked. We've sent a confirmation
          email with all the details.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
          <Button variant="contained" onClick={handleDownloadReceipt}>
            Download Receipt
          </Button>
          <Button variant="contained" onClick={handleAddToCalendar}>
            Add to Calendar
          </Button>
        </Box>

        <Button
          variant="outlined"
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          View Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default BookingConfirmationPage;
