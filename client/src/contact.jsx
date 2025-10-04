import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success message
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">


      <div className="relative z-10">
        {/* Header */}
        <section className="bg-black text-white min-h-[50vh] flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '3rem', md: '4rem', xl: '5rem' }, fontWeight: 300, mb: 3 }}>
              Contact Me
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 300, maxWidth: '4xl', mx: 'auto', opacity: 0.9 }}>
              Let's connect and discuss your next project
            </Typography>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Contact Info Panel */}
              <div className="lg:col-span-2 space-y-6">
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                      Get In Touch
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      Ready to bring your ideas to life? Whether you need a web application, AI integration, 
                      creative design, or music production, I'm here to help make it happen.
                    </Typography>
                  </CardContent>
                </Card>

                {/* Contact Methods */}
                <Card elevation={2}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, bgcolor: 'primary.main', borderRadius: 2, color: 'white', fontSize: '1.5rem', mr: 2 }}>
                        ✉️
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Use the contact form</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Location */}
                <Card elevation={3} sx={{ bgcolor: 'primary.50', borderColor: 'primary.200', borderWidth: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography sx={{ fontSize: '1.5rem', mr: 2 }}>📍</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Location</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>Scarborough, Ontario, Canada</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Available for remote work and local meetups</Typography>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card elevation={3} sx={{ lg: { gridColumn: 'span 3' } }}>
                <CardContent sx={{ p: { xs: 3, sm: 4, lg: 5 } }}>
                  {isSubmitted ? (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, bgcolor: 'success.light', borderRadius: '50%', border: 2, borderColor: 'success.main', mx: 'auto', mb: 3 }}>
                        <Typography sx={{ fontSize: '3rem', color: 'success.main' }}>✓</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Thanks for reaching out!</Typography>
                      <Typography variant="h6" sx={{ color: 'text.secondary' }}>I'll get back to you as soon as possible.</Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', mb: 4 }}>Send Message</Typography>
                      <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                            <TextField
                              label="First Name"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              fullWidth
                              variant="outlined"
                            />
                            <TextField
                              label="Last Name"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              fullWidth
                              variant="outlined"
                            />
                          </Box>

                          <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                          />

                          <TextField
                            label="Phone (Optional)"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                          />

                          <TextField
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            fullWidth
                            multiline
                            rows={6}
                            variant="outlined"
                            placeholder="Tell me about your project or how I can help..."
                          />

                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            endIcon={<span>🚀</span>}
                            sx={{ py: 2, fontSize: '1.125rem' }}
                          >
                            Send Message
                          </Button>
                        </Box>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;