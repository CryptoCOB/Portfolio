import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip, Alert } from '@mui/material';
import { getApiBase } from './auth';

const Services = () => {
  const api = React.useMemo(() => getApiBase(), []);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${api}/api/services`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || 'Failed to load services');
        if (active) setItems(Array.isArray(json) ? json : []);
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [api]);

  // no curated fallback; content is now sourced from your database only

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

  {/* Services (from Admin / DB) */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
            Your Services
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            These are loaded live from your database. Use the Admin page to add, edit, or delete services.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {loading && <Typography>Loading…</Typography>}

          {(!loading && items.length > 0) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((svc) => (
                <Card key={svc._id} elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {svc.icon && (
                        <Typography variant="h3" sx={{ fontSize: '2.5rem', mr: 2 }}>{svc.icon}</Typography>
                      )}
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                        {svc.title}
                      </Typography>
                      {svc.published === false && (
                        <Chip label="Unpublished" size="small" color="default" variant="outlined" sx={{ ml: 1 }} />
                      )}
                    </Box>
                    {svc.blurb && (
                      <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
                        {svc.blurb}
                      </Typography>
                    )}
                    {(svc.details || typeof svc.price === 'number') && (
                      <Box sx={{ bgcolor: 'grey.100', borderRadius: 1, p: 2, mb: 2 }}>
                        {svc.details && (
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {svc.details}
                          </Typography>
                        )}
                        {typeof svc.price === 'number' && (
                          <Typography variant="body2" sx={{ color: 'text.secondary', mt: svc.details ? 1 : 0 }}>
                            {`Starting at $${svc.price.toFixed(2)}`}
                          </Typography>
                        )}
                      </Box>
                    )}
                    {Array.isArray(svc.features) && svc.features.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {svc.features.map((f, fi) => (
                          <Chip key={fi} label={f} size="small" variant="outlined" />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="contained" component="a" href="/contact">Start →</Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          ) : (!loading && !error) ? (
            <Alert severity="info">No services in your database yet — add some from the Admin page.</Alert>
          ) : null}
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