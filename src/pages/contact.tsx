import { Box, Container, Typography, Grid, Paper, TextField, Button, Stack } from '@mui/material';
import { useState } from 'react';
import Head from 'next/head';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Head>
        <title>Contact Us - Open Impact</title>
        <meta name="description" content="Get in touch with the Open Impact team. We'd love to hear from you!" />
      </Head>
      
      <Box sx={{ py: 4, minHeight: 'calc(100vh - 64px)' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight={700}>
            Contact Us
          </Typography>
          
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            We&apos;d love to hear from you. Get in touch with us!
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Send us a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </form>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h6" fontWeight={600}>
                      Email
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    hello@openimpact.org
                  </Typography>
                </Paper>

                <Paper elevation={2} sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h6" fontWeight={600}>
                      Location
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    Global - Remote First
                  </Typography>
                </Paper>

                <Paper elevation={2} sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h6" fontWeight={600}>
                      Response Time
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    We typically respond within 24 hours
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}