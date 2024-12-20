import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Book Appointments Anytime, Anywhere!
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Connect with local service providers in just a few clicks.
          Schedule appointments with ease and manage your time efficiently.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/search')}
          sx={{ mt: 2 }}
        >
          Book Now
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Real-time Calendar
            </Typography>
            <Typography>
              See available slots instantly and book appointments that work for your schedule.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Secure Payments
            </Typography>
            <Typography>
              Your transactions are protected with bank-level security measures.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Smart Reminders
            </Typography>
            <Typography>
              Never miss an appointment with automated email and SMS reminders.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About AppointEase
        </Typography>
        <Typography paragraph>
          We're on a mission to simplify appointment booking for businesses and customers alike.
          Our platform connects service providers with clients, making scheduling seamless and efficient.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Customer First
            </Typography>
            <Typography>
              We prioritize user experience and satisfaction in everything we do.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Reliability
            </Typography>
            <Typography>
              Our platform is built on trust and consistent performance.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Innovation
            </Typography>
            <Typography>
              We continuously improve our platform with the latest technology.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
