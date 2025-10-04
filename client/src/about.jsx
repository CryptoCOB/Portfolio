import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-6 px-8">
          <h1 className="text-7xl lg:text-9xl xl:text-[10rem] font-light tracking-tight text-white">
            About
          </h1>
          <div className="w-20 h-px bg-white mx-auto"></div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Profile Section */}
            <Card elevation={3}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 128, height: 128, bgcolor: 'primary.main', borderRadius: 3, color: 'white', fontSize: '4rem', mx: 'auto', mb: 4 }}>
                  👨‍💻
                </Box>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', bgcolor: 'grey.100', borderRadius: 2, px: 3, py: 1.5, mb: 3 }}>
                  <Typography sx={{ fontSize: '1.25rem', mr: 1.5 }}>📍</Typography>
                  <Typography variant="body1">Based in Scarborough, Ontario</Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Bio Content */}
            <Card elevation={3} sx={{ lg: { gridColumn: 'span 2' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography sx={{ fontSize: '2rem', mr: 2 }}>�</Typography>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    My Story
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                    I'm an AI Software Development student and creative technologist based in Scarborough, Ontario. My journey hasn't followed a straight line — it's been full of setbacks, resilience, and transformation. What defines me is not where I started, but how I've turned challenges into innovation. Instead of waiting for systems to give me a chance, I've been building my own.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </div>

          {/* Technical Foundation */}
          <Box sx={{ mt: 8 }}>
            <Box sx={{ mb: 6 }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                🔧 My Technical Foundation
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.125rem', color: 'text.secondary', lineHeight: 1.7 }}>
                I work across AI/ML, blockchain, and full-stack development, blending experimental research with production-ready builds.
              </Typography>
            </Box>
            
            <div className="grid gap-6">
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>🤖</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Artificial Intelligence & Machine Learning</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                    Designing and training custom multimodal models; experience with transformers, reinforcement learning, spiking neural networks, and advanced compression techniques.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Nebula (self-learning AI)" size="small" color="primary" />
                    <Chip label="Vanta (quantum streaming)" size="small" color="secondary" />
                    <Chip label="VoxSigil (symbolic cognitive language)" size="small" color="primary" />
                    <Chip label="PyTorch" size="small" variant="outlined" />
                    <Chip label="TensorFlow" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>⛓️</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Blockchain & Smart Contracts</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                    Development of decentralized applications, tokenomics, and cross-chain adapters. Built Orion Lights blockchain layer and integrated smart contract management for decentralized learning and token distribution.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Ethereum" size="small" variant="outlined" />
                    <Chip label="Polygon" size="small" variant="outlined" />
                    <Chip label="Binance Smart Chain" size="small" variant="outlined" />
                    <Chip label="Solana" size="small" variant="outlined" />
                    <Chip label="Solidity" size="small" color="primary" />
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>🧠</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Cognitive Infrastructure Engineer</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                    Designing neural ecosystems from silicon to symbols. Skilled in multi-GPU orchestration (3× RTX 3060 rig, 96GB RAM), quantization (int8), memory compression (BLT, MIRIX architecture), distributed training pipelines, and containerized AI deployments.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Multi-GPU (3× RTX 3060)" size="small" color="success" />
                    <Chip label="Docker" size="small" variant="outlined" />
                    <Chip label="Distributed Training" size="small" variant="outlined" />
                    <Chip label="Model Compression" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>⚛️</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Full-Stack Web & App Development</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                    Building apps with React, Next.js, Node.js, Express, MongoDB, Supabase, and mobile development with Kotlin/Android Studio. Creator of MyContactBloom, a Next.js + Supabase + Stripe platform for smart contact sharing and profile management.
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="React" size="small" color="primary" />
                    <Chip label="Next.js" size="small" color="primary" />
                    <Chip label="Node.js" size="small" variant="outlined" />
                    <Chip label="MongoDB" size="small" variant="outlined" />
                    <Chip label="Supabase" size="small" variant="outlined" />
                    <Chip label="Kotlin/Android" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>💻</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Programming Languages</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Python (PyTorch, TensorFlow)" size="small" color="primary" />
                    <Chip label="Java (OOP, backend)" size="small" color="secondary" />
                    <Chip label="Kotlin (mobile)" size="small" variant="outlined" />
                    <Chip label="JavaScript/TypeScript" size="small" variant="outlined" />
                    <Chip label="Solidity (smart contracts)" size="small" variant="outlined" />
                    <Chip label="Bash/PowerShell" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>☁️</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Data & Cloud Tools</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
                    Experience with Kaggle workflows, SQLite, Docker, uv package management, model checkpointing, streaming datasets; designing training evaluation pipelines (ARC datasets, Kaggle competitions).
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Kaggle" size="small" variant="outlined" />
                    <Chip label="SQLite" size="small" variant="outlined" />
                    <Chip label="Docker" size="small" variant="outlined" />
                    <Chip label="Model Checkpointing" size="small" variant="outlined" />
                  </Box>
                </CardContent>
              </Card>

              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: '2rem', mr: 2 }}>🎨</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Creative Technology</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    Music production and digital design using AI tools; blending Jamaican-Canadian cultural roots into technical projects.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Box>

          {/* Vision Section */}
          <Box sx={{ mt: 8 }}>
            <Card elevation={3} sx={{ bgcolor: 'primary.main', color: 'white' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography sx={{ fontSize: '2rem', mr: 2 }}>🔮</Typography>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>
                    My Vision in Technology
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
                  I don't just code projects — I architect systems with purpose.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Nebula
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Explores the future of self-learning AI with recursive reflection and symbolic awareness.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Vanta
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Pushes quantum-inspired streaming training, enabling large-scale AI to run on local rigs.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      VoxSigil
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Redefines human–AI interaction through a symbolic meta-language that fuses code, recursion, and culture.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      MyContactBloom
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Applies these ideas to everyday life — giving people a secure, decentralized, and creative way to manage identity and connections.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Identity Section */}
          <Box sx={{ mt: 8 }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography sx={{ fontSize: '2rem', mr: 2 }}>🌍</Typography>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>
                    My Identity as a Builder
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                    Scarborough shaped me with multicultural energy and resilience. That background drives my cosmopolitan outlook: I see technology as a bridge between local communities and the global village. My work reflects both my roots and my vision — building systems that merge AI, blockchain, and culture into tools that last.
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.7, fontWeight: 'bold', color: 'primary.main' }}>
                    I see myself not just as a software developer, but as a system architect, innovator, and cultural technologist. My story is about taking every barrier I faced and turning it into a new design, a new idea, a new possibility.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>


        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 4, md: 8 } }}>
              <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                Let's Connect
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 300, maxWidth: '36rem', mx: 'auto' }}>
                Ready to discuss your next project? I'd love to hear about your vision and explore how we can bring it to life.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 4 }}>
              <Button 
                variant="contained" 
                size="large" 
                endIcon={<span>💬</span>}
                component={Link}
                to="/contact"
              >
                Get In Touch
              </Button>
            </CardActions>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;