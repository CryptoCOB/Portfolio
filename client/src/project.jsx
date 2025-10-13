import React from 'react';
import MusicPlayer from '../components/MusicPlayer';
import { useStaggeredAnimation } from './hooks/useScrollAnimation';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { getApiBase } from './auth';

const Project = () => {
  const getProjectRef = useStaggeredAnimation(4, 120);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.7;
      videoRef.current.play().catch(error => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  }, []);



  const api = React.useMemo(() => getApiBase(), []);
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${api}/api/projects`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || 'Failed to load projects');
        if (active) setProjects(Array.isArray(json) ? json : []);
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [api]);

  const [activeMusicPlayer, setActiveMusicPlayer] = React.useState(null);
  const [activeSchema, setActiveSchema] = React.useState(null);
  const [schemaContent, setSchemaContent] = React.useState('');

  // Load schema content when requested
  React.useEffect(() => {
    if (activeSchema !== null) {
      const project = projects[activeSchema];
      if (project.hasSchema && project.schemaUrl) {
        fetch(project.schemaUrl)
          .then(response => response.text())
          .then(text => setSchemaContent(text))
          .catch(error => console.error('Error loading schema:', error));
      }
    }
  }, [activeSchema]);

  return (
    <div className="min-h-screen">
      {/* Hero with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background with Sound */}
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          controls
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/music/FromScarborough.mp4" type="video/mp4" />
        </video>
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-7xl lg:text-9xl xl:text-[10rem] font-light tracking-tight text-white">
            Projects
          </h1>
          <div className="w-20 h-px bg-white mx-auto"></div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          {error && (<div style={{ color: 'red', padding: '1rem', textAlign: 'center' }}>{error}</div>)}
          {loading && (<div style={{ padding: '1rem', textAlign: 'center' }}>Loading projects...</div>)}
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              ref={getProjectRef(index)} 
              elevation={3} 
              sx={{ 
                mb: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                }
              }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ fontSize: 14, mr: 2 }} color="text.secondary">
                    0{index + 1}
                  </Typography>
                  <Chip label={project.status} size="small" color="primary" variant="outlined" />
                </Box>
                
                <Typography variant="h4" component="h2" gutterBottom>
                  {project.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" paragraph>
                  {project.description}
                </Typography>

                <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <strong>Outcome:</strong> {project.outcome}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {project.tech.map((t, ti) => (
                    <Chip key={ti} label={t} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>

              <CardActions>
                {project.liveUrl && (
                  <Button size="small" href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="contained">
                    View Live Site
                  </Button>
                )}
                {project.githubUrl && (
                  <Button size="small" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    View Code
                  </Button>
                )}
                {project.hasNotebook && project.notebookUrl && (
                  <Button size="small" href={project.notebookUrl} target="_blank" rel="noopener noreferrer">
                    Notebook
                  </Button>
                )}
                {project.hasSchema && (
                  <Button 
                    size="small" 
                    onClick={() => setActiveSchema(activeSchema === index ? null : index)}
                    variant="outlined"
                  >
                    {activeSchema === index ? 'Hide Schema' : 'View Schema'}
                  </Button>
                )}
                {project.hasMusic && (
                  <Button 
                    size="small" 
                    onClick={() => setActiveMusicPlayer(activeMusicPlayer === index ? null : index)}
                  >
                    {activeMusicPlayer === index ? 'Hide Audio' : 'Listen'}
                  </Button>
                )}
              </CardActions>

              {project.hasSchema && activeSchema === index && (
                <Box sx={{ p: 3, bgcolor: 'grey.900', color: 'grey.100', maxHeight: '600px', overflow: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'grey.700' }}>
                    <Typography variant="h6" sx={{ color: 'primary.light', fontFamily: 'monospace' }}>
                      Project Schema
                    </Typography>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      href={project.schemaUrl} 
                      download
                      sx={{ color: 'primary.light', borderColor: 'primary.light' }}
                    >
                      Download
                    </Button>
                  </Box>
                  <pre style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.875rem', 
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {schemaContent || 'Loading schema...'}
                  </pre>
                </Box>
              )}

              {project.hasMusic && activeMusicPlayer === index && (
                <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <MusicPlayer />
                </Box>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Academic Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typography variant="h3" component="h2" sx={{ fontWeight: 300, mb: 6 }}>
            Academic Work
          </Typography>

          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              elevation={2}
              component="a"
              href="https://github.com/CryptoCOB/COMP228_Lab2_MarcHarty_F2025"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}
            >
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 300, mb: 2 }}>
                  COMP228 Lab2
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Object-Oriented Programming in Java
                </Typography>
              </CardContent>
            </Card>

            <Card 
              elevation={2}
              component="a"
              href="https://github.com/CryptoCOB/project-Assignment_MarcHarty_f2025"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ textDecoration: 'none', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}
            >
              <CardContent>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 300, mb: 2 }}>
                  Project Assignment
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Advanced Java & Design Patterns
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 4, md: 8 } }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 300, mb: 3 }}>
                Let's collaborate
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 300 }}>
                Ready to start your next project?
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 4 }}>
              <Button variant="contained" size="large" component="a" href="/contact">
                Get in touch →
              </Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Project;