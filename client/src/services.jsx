import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      icon: '💻',
      blurb: 'Full-stack web applications built for performance and scalability',
      details: 'React, Node.js, Express, REST APIs, authentication, responsive UI, deployment workflows',
      features: ['React Apps', 'API Design', 'Database Modeling', 'Responsive UI'],
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'AI Development',
      icon: '🧠',
      blurb: 'Intelligent solutions & cognitive agent architecture',
      details: 'LLM integration, prompt engineering, agent orchestration, multimodal data pipelines (text / audio / structured)',
      features: ['LLM Integration', 'Agents', 'Multimodal', 'Automation'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Creative & Branding',
      icon: '🎨',
      blurb: 'Visual identity and digital experience design',
      details: 'Brand systems, logo/sigil creation, interface aesthetics, accessible design systems',
      features: ['Brand Systems', 'Sigil Design', 'Design Systems', 'UI Polish'],
      gradient: 'from-pink-500 to-blue-500'
    },
    {
      title: 'Music & Multimedia',
      icon: '🎵',
      blurb: 'Audio production + AI-assisted composition workflows',
      details: 'Suno / AI-assisted tracking, structure ideation, sonic identity crafting, multimedia alignment',
      features: ['Production', 'Sound Design', 'AI Composition', 'Mix Prep'],
      gradient: 'from-blue-500 to-pink-500'
    },
    {
      title: 'Consulting & Strategy',
      icon: '🧩',
      blurb: 'Architecture, technical discovery, and roadmap guidance',
      details: 'Feature scoping, technical audits, performance profiling, solution selection & PoC development',
      features: ['Technical Audit', 'Roadmaps', 'PoC Builds', 'Mentorship'],
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Performance Optimization',
      icon: '⚡',
      blurb: 'Speed, accessibility & reliability enhancements',
      details: 'Bundle trimming, Core Web Vitals tuning, caching layers, database query optimization, profiling',
      features: ['Core Vitals', 'Profiling', 'Caching', 'DB Tuning'],
      gradient: 'from-green-500 to-blue-500'
    }
  ];

  const process = [
    { icon: '💡', title: 'Discover', text: 'Clarify goals, constraints & success metrics' },
    { icon: '🧭', title: 'Design', text: 'Architecture & experience planning' },
    { icon: '⚙️', title: 'Build', text: 'Iterative implementation with feedback loops' },
    { icon: '🚀', title: 'Launch', text: 'Deploy, observe, refine & scale' }
  ];

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Hero */}
      <section className="bg-black text-white min-h-[50vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '3rem', md: '4rem', xl: '5rem' }, fontWeight: 300, mb: 3 }}>
            Services
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 300, maxWidth: '4xl', mx: 'auto', opacity: 0.9 }}>
            Practical capabilities I can deliver right now — blending engineering, AI and creative direction
          </Typography>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Card key={i} elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h3" sx={{ fontSize: '2.5rem', mr: 2 }}>{svc.icon}</Typography>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                      {svc.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
                    {svc.blurb}
                  </Typography>
                  <Box sx={{ bgcolor: 'grey.100', borderRadius: 1, p: 2, mb: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {svc.details}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {svc.features.map((f, fi) => (
                      <Chip key={fi} label={f} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" component="a" href="/contact">Start →</Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typography variant="h3" component="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
            Delivery Process
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {process.map((step, si) => (
              <Card key={si} elevation={2} sx={{ textAlign: 'center' }}>
                <CardContent>
                  <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>{step.icon}</Typography>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {step.text}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 4, md: 8 } }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                Ready to Build?
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 300 }}>
                Let's align on vision, scope & impact. Whether it's AI integration, a performant web app or a creative system — we can make it real.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 4, gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" size="large" href="/contact">Start a Project →</Button>
              <Button variant="outlined" size="large" href="/contact">Contact Me</Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Services;