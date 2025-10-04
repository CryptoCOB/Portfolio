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

const Project = () => {
  const getProjectRef = useStaggeredAnimation(4, 120);
  const videoRef = React.useRef(null);

  // Auto-play From Scarborough video when page loads with sound
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.7;
      videoRef.current.play().catch(error => {
        console.log('Autoplay with sound prevented, trying muted:', error);
        // If autoplay with sound fails, try muted
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  }, []);

  const techColor = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('python')) return 'from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-200/60';
    if (t.includes('ai') || t.includes('ml') || t.includes('neural')) return 'from-indigo-100 to-violet-100 text-indigo-800 border-indigo-200/60';
    if (t.includes('blockchain')) return 'from-emerald-100 to-green-100 text-green-800 border-green-200/60';
    if (t.includes('web') || t.includes('scraping') || t.includes('seo')) return 'from-cyan-100 to-blue-100 text-cyan-800 border-cyan-200/60';
    if (t.includes('telegram') || t.includes('bot')) return 'from-sky-100 to-blue-100 text-sky-800 border-sky-200/60';
    if (t.includes('audio') || t.includes('music') || t.includes('suno')) return 'from-pink-100 to-rose-100 text-pink-800 border-pink-200/60';
    return 'from-gray-100 to-gray-100 text-gray-800 border-gray-200/60';
  };

  const projects = [
    {
      title: "VoxSigil: Symbolic Meta-Language",
      description: "A symbolic meta-language designed to define, orchestrate, and evolve cognitive components within AI systems. VoxSigil enables modeling of cognitive architectures using structured symbols (sigils) and programmatic constructs (pglyphs).",
      outcome: "Comprehensive schema for recursive identity, strategic modularity, and developmental orchestration of AI systems. Features Marc's sigil ⟠∆∇𓂀 (Marc.pglyph) as foundational cognitive primitive, co-architected with ⎈🧭𓂀✶ SEEKER Helm for AI orchestration across Night City.",
      tech: ["Symbolic AI", "Cognitive Architecture", "Meta-Language", "Schema Design"],
      icon: "⟠∆∇𓂀",
      status: "Research",
      gradient: "from-purple-600 to-indigo-600",
      githubUrl: null,
      hasNotebook: false,
      hasSchema: true,
      schemaUrl: "/music/VOXSIGIL COMPLETE SIGIL SCHEMA.md",
      liveUrl: null,
    },
    {
      title: "Stonemasonry.ca",
      description: "Professional business website for a masonry company built with React and hosted on Netlify. Client project showcasing modern web design and deployment.",
      outcome: "Successfully sold and delivered a production-ready website with responsive design, optimized performance, and seamless hosting.",
      tech: ["React", "Netlify", "Web Development", "Client Project"],
      icon: "🏗️",
      status: "Live",
      gradient: "from-slate-600 to-stone-600",
      githubUrl: null,
      hasNotebook: false,
      liveUrl: "https://stonemasonry.ca",
    },
    {
      title: "VantaEchoNebula",
      description: "Advanced AI + Blockchain network for decentralized intelligence applications and research workflows.",
      outcome: "Active integration of model orchestration, secure ledger-based provenance, and collaborative research tooling.",
      tech: ["Python", "AI/ML", "Blockchain", "Neural Networks"],
      icon: "🌌",
      status: "In Development",
      gradient: "from-blue-600 to-violet-600",
      githubUrl: "https://github.com/CryptoCOB/VantaEchoNebula",
      hasNotebook: true,
      notebookUrl: "https://notebooklm.google.com/notebook/c01c6f30-5327-4212-9ab9-e1e89603c8af?pli=1&authuser=2",
      liveUrl: null,
    },
    {
      title: "WebScraperSEOApp",
      description: "Robust web scraping & SEO analysis pipeline that collects, normalizes and scores site signals for optimization.",
      outcome: "Production-ready scraping system with analyzers that produce actionable SEO recommendations.",
      tech: ["Python", "Web Scraping", "SEO Analysis", "Data Processing"],
      icon: "🕷️",
      status: "Completed",
      gradient: "from-green-500 to-blue-600",
      githubUrl: "https://github.com/CryptoCOB/WebScraperSEOApp",
      liveUrl: null
    },
    {
      title: "Telegram Bot",
      description: "Feature-rich Telegram bot framework for automation, integration, and user interaction flows.",
      outcome: "Deployed bots running scheduled jobs, integrations, and custom command handlers.",
      tech: ["Python", "Telegram API", "Bot Development", "Automation"],
      icon: "🤖",
      status: "Completed",
      gradient: "from-blue-500 to-cyan-600",
      githubUrl: "https://github.com/CryptoCOB/Telegram-bot",
      liveUrl: null
    },
    {
      title: "Scarborough Psalms",
      description: "AI-assisted music composition project blending R&B, Reggae, and Dancehall influences to tell cultural stories.",
      outcome: "An ongoing creative exploration using generative tools and human curation to produce original tracks.",
      tech: ["AI Music", "Suno", "Audio Production", "Creative Direction"],
      icon: "🎵",
      status: "Ongoing",
      gradient: "from-pink-500 to-purple-600",
      hasMusic: true,
      githubUrl: null,
      liveUrl: null
    }
  ];

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
                      VoxSigil Complete Schema
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