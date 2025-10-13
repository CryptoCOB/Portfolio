import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Alert, Button } from '@mui/material';
import { getApiBase } from './auth';

const Education = () => {
  const api = React.useMemo(() => getApiBase(), []);
  const [quals, setQuals] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true); setError('');
        const res = await fetch(`${api}/api/qualifications`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || 'Failed to load qualifications');
        if (active) setQuals(Array.isArray(json) ? json : []);
      } catch (e) { if (active) setError(e.message); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [api]);
  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <section className="bg-black text-white min-h-[50vh] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '3rem', md: '4rem', xl: '5rem' }, fontWeight: 300, mb: 3 }}>
            Education
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 300, maxWidth: '4xl', mx: 'auto', opacity: 0.9 }}>
            My educational journey and continuous learning path
          </Typography>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* DB Qualifications */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography sx={{ fontSize: '2rem', mr: 2 }}>📘</Typography>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                  Qualifications (Live)
                </Typography>
              </Box>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {loading && <Typography>Loading…</Typography>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quals.map(q => (
                  <Card key={q._id} elevation={3}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center', mb:1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{q.title}</Typography>
                        <Chip label={q.completion ? new Date(q.completion).toLocaleDateString() : ''} size="small" />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb:1 }}>
                        {q.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {q.firstname} {q.lastname} • {q.email}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                {!loading && !error && quals.length === 0 && (
                  <Alert severity="info">No qualifications in your database yet — add some from the Admin page.</Alert>
                )}
              </div>
            </Box>
            
            {/* Current Education */}
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'primary.main', borderRadius: 2, flexShrink: 0 }}>
                    <Typography sx={{ fontSize: '2rem' }}>🎓</Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, mb: 2 }}>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                        AI Software Development
                      </Typography>
                      <Chip label="Sept 2024 – Apr 2027" color="success" size="small" sx={{ mt: { xs: 1, md: 0 } }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                      Centennial College
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: 'text.primary' }}>
                      Comprehensive program focused on AI, machine learning, and software development. Hands-on with modern frameworks, full-stack web technologies, and intelligent system design.
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Core Skills:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip label="Python" size="small" color="primary" variant="outlined" />
                      <Chip label="JavaScript" size="small" color="secondary" variant="outlined" />
                      <Chip label="React" size="small" color="primary" variant="outlined" />
                      <Chip label="Node.js" size="small" color="secondary" variant="outlined" />
                      <Chip label="AI/ML" size="small" color="primary" variant="outlined" />
                      <Chip label="Database Design" size="small" color="secondary" variant="outlined" />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Skills & Learning Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>🛠️</Typography>
                    <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                      Technical Skills
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>Frontend:</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>React, Tailwind, responsive UI design</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>Backend:</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>Node.js, Express, API development</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>AI/ML:</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>LLM integration, multimodal systems</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>Databases:</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>MongoDB, SQLite, relational design</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>Creative:</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>Branding, UI/UX design, music tech</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={3}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>📚</Typography>
                    <Typography variant="h5" component="h4" sx={{ fontWeight: 'bold' }}>
                      Learning Focus
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                      <Typography variant="body2">Multimodal AI Systems</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main', mr: 2 }} />
                      <Typography variant="body2">Blockchain Integration</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                      <Typography variant="body2">Cognitive Agent Design (Nebula project)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main', mr: 2 }} />
                      <Typography variant="body2">Creative AI Applications</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mr: 2 }} />
                      <Typography variant="body2">Full-Stack Development</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </div>

            {/* Academic Projects & Lab Work */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography sx={{ fontSize: '2rem', mr: 2 }}>🧪</Typography>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                  Academic Projects & Lab Work
                </Typography>
              </Box>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                      Java Programming
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      OOP, data structures, interest calculator with validation
                    </Typography>
                  </CardContent>
                </Card>
                
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main', mb: 2 }}>
                      React Development
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Components, props/state, interactive SPA patterns
                    </Typography>
                  </CardContent>
                </Card>
                
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                      Database Design
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      SQL modeling, optimization, MongoDB integration
                    </Typography>
                  </CardContent>
                </Card>
                
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main', mb: 2 }}>
                      AI Integration
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      LLM API projects, cognitive agents, prototype intelligent apps
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Box>

            {/* Professional Certifications */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography sx={{ fontSize: '2rem', mr: 2 }}>📜</Typography>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                  Professional Certifications
                </Typography>
              </Box>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card elevation={3}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'warning.main', borderRadius: '50%', color: 'white', fontSize: '2rem', mx: 'auto', mb: 2 }}>
                      ☁️
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      AWS Academy Cloud Foundations
                    </Typography>
                    <Chip label="In Progress" color="warning" size="small" />
                  </CardContent>
                </Card>
                
                <Card elevation={3}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'success.main', borderRadius: '50%', color: 'white', fontSize: '2rem', mx: 'auto', mb: 2 }}>
                      💻
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      FreeCodeCamp Responsive Web Design
                    </Typography>
                    <Chip label="2024" color="success" size="small" />
                  </CardContent>
                </Card>
                
                <Card elevation={3}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'primary.main', borderRadius: '50%', color: 'white', fontSize: '2rem', mx: 'auto', mb: 2 }}>
                      🤖
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Google AI Essentials
                    </Typography>
                    <Chip label="Planned 2025" color="primary" size="small" />
                  </CardContent>
                </Card>
              </div>
            </Box>

            {/* Soft Skills & Professional Growth */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography sx={{ fontSize: '2rem', mr: 2 }}>🤝</Typography>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                  Soft Skills & Professional Growth
                </Typography>
              </Box>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'primary.main', borderRadius: 2, color: 'white', fontSize: '2rem', mx: 'auto', mb: 2 }}>
                      👥
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Collaboration & Teamwork
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Effective teamwork in agile environments and collaborative coding projects
                    </Typography>
                  </CardContent>
                </Card>
                
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'secondary.main', borderRadius: 2, color: 'white', fontSize: '2rem', mx: 'auto', mb: 2 }}>
                      ⏰
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Time Management
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Meeting deadlines under pressure for labs, group projects, and deliverables
                    </Typography>
                  </CardContent>
                </Card>
                
                <Card elevation={2}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'error.main', borderRadius: 2, color: 'white', fontSize: '2rem', mx: 'auto', mb: 2 }}>
                      💡
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Creative Problem-Solving
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Approaching challenges with both creative and technical perspectives
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Box>

            {/* Highlights & Achievements */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Typography sx={{ fontSize: '2rem', mr: 2 }}>🏆</Typography>
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                  Highlights & Achievements
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'primary.main', borderRadius: '50%', color: 'white', fontSize: '2rem', flexShrink: 0 }}>
                        🚀
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Built & Deployed Full-Stack Portfolio Site
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Created modern, responsive portfolio using React + Vercel with Material-UI design, showcasing technical skills and project experience
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'success.main', borderRadius: '50%', color: 'white', fontSize: '2rem', flexShrink: 0 }}>
                        ☕
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Java Financial Calculator with Advanced Validation
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Developed robust financial application using BigDecimal for precision arithmetic and comprehensive input validation systems
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, bgcolor: 'secondary.main', borderRadius: '50%', color: 'white', fontSize: '2rem', flexShrink: 0 }}>
                        🌌
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                          AI Club Member – Nebula Cognitive System
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Active contributor to cutting-edge AI research projects, developing intelligent agent systems and exploring multimodal AI applications
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;