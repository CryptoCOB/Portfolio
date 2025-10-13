import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Grid, Switch, FormControlLabel, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getApiBase, getToken } from './auth';

const useCrud = (path, protectedWrite = false) => {
  const base = useMemo(() => getApiBase(), []);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const headers = () => {
    const h = { 'Content-Type': 'application/json' };
    const t = getToken();
    if (protectedWrite && t) h['Authorization'] = `Bearer ${t}`;
    return h;
  };

  const list = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${base}${path}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Failed to load');
      setItems(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload) => {
    setError('');
    const res = await fetch(`${base}${path}`, { method: 'POST', headers: headers(), body: JSON.stringify(payload) });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Create failed');
    await list();
    return json;
  };

  const update = async (id, payload) => {
    setError('');
    const res = await fetch(`${base}${path}/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(payload) });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || 'Update failed');
    await list();
    return json;
  };

  const remove = async (id) => {
    setError('');
    const res = await fetch(`${base}${path}/${id}`, { method: 'DELETE', headers: headers() });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      throw new Error(json?.message || 'Delete failed');
    }
    await list();
    return true;
  };

  useEffect(() => { list(); }, []);

  return { items, error, loading, list, create, update, remove };
};

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{title}</Typography>
    {subtitle && <Typography variant="body2" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>}
  </Box>
);

const ServicesManager = () => {
  const { items, error, loading, create, update, remove, list } = useCrud('/api/services', true);
  const [form, setForm] = useState({ title: '', description: '', price: '', published: true });
  const [msg, setMsg] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', price: '', published: true });

  const submit = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      await create({ title: form.title, description: form.description, price: form.price ? Number(form.price) : undefined, published: !!form.published });
      setForm({ title: '', description: '', price: '', published: true });
      setMsg('Service created');
    } catch (e) { setMsg(e.message); }
  };

  const startEdit = (s) => {
    setEditId(s._id);
    setEditForm({ title: s.title || '', description: s.description || '', price: s.price ?? '', published: !!s.published });
  };

  const saveEdit = async () => {
    try {
      await update(editId, { ...editForm, price: editForm.price === '' ? undefined : Number(editForm.price) });
      setMsg('Service updated');
      setEditId(null);
    } catch (e) { setMsg(e.message); }
  };

  const seedDemo = async () => {
    try {
      setMsg('');
      const curated = [
        {
          title: 'Web Development',
          icon: '💻',
          blurb: 'Full-stack web applications built for performance and scalability',
          details: 'React, Node.js, Express, REST APIs, authentication, responsive UI, deployment workflows',
          features: ['React Apps', 'API Design', 'Database Modeling', 'Responsive UI'],
          gradient: 'from-blue-500 to-purple-500',
          description: 'Full-stack web applications built for performance and scalability',
          published: true
        },
        {
          title: 'AI Development',
          icon: '🧠',
          blurb: 'Intelligent solutions & cognitive agent architecture',
          details: 'LLM integration, prompt engineering, agent orchestration, multimodal data pipelines (text / audio / structured)',
          features: ['LLM Integration', 'Agents', 'Multimodal', 'Automation'],
          gradient: 'from-purple-500 to-pink-500',
          description: 'Intelligent solutions & cognitive agent architecture',
          published: true
        },
        {
          title: 'Creative & Branding',
          icon: '🎨',
          blurb: 'Visual identity and digital experience design',
          details: 'Brand systems, logo/sigil creation, interface aesthetics, accessible design systems',
          features: ['Brand Systems', 'Sigil Design', 'Design Systems', 'UI Polish'],
          gradient: 'from-pink-500 to-blue-500',
          description: 'Visual identity and digital experience design',
          published: true
        },
        {
          title: 'Music & Multimedia',
          icon: '🎵',
          blurb: 'Audio production + AI-assisted composition workflows',
          details: 'Suno / AI-assisted tracking, structure ideation, sonic identity crafting, multimedia alignment',
          features: ['Production', 'Sound Design', 'AI Composition', 'Mix Prep'],
          gradient: 'from-blue-500 to-pink-500',
          description: 'Audio production + AI-assisted composition workflows',
          published: true
        },
        {
          title: 'Consulting & Strategy',
          icon: '🧩',
          blurb: 'Architecture, technical discovery, and roadmap guidance',
          details: 'Feature scoping, technical audits, performance profiling, solution selection & PoC development',
          features: ['Technical Audit', 'Roadmaps', 'PoC Builds', 'Mentorship'],
          gradient: 'from-indigo-500 to-blue-500',
          description: 'Architecture, technical discovery, and roadmap guidance',
          published: true
        },
        {
          title: 'Performance Optimization',
          icon: '⚡',
          blurb: 'Speed, accessibility & reliability enhancements',
          details: 'Bundle trimming, Core Web Vitals tuning, caching layers, database query optimization, profiling',
          features: ['Core Vitals', 'Profiling', 'Caching', 'DB Tuning'],
          gradient: 'from-green-500 to-blue-500',
          description: 'Speed, accessibility & reliability enhancements',
          published: true
        }
      ];
      for (const d of curated) {
        await create(d);
      }
      await list();
      setMsg('Curated services seeded');
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <Card elevation={2} sx={{ mb: 4 }}>
      <CardContent>
        <SectionHeader title="Services" subtitle="Create and manage service offerings" />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {msg && <Alert severity={msg.includes('created') ? 'success' : 'error'} sx={{ mb: 2 }}>{msg}</Alert>}
        <form onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}><TextField label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} fullWidth required /></Grid>
            <Grid item xs={12} md={4}><TextField label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} fullWidth required multiline minRows={2} /></Grid>
            <Grid item xs={12} md={2}><TextField label="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} fullWidth /></Grid>
            <Grid item xs={12} md={2}><FormControlLabel control={<Switch checked={form.published} onChange={e=>setForm({...form, published:e.target.checked})} />} label="Published" /></Grid>
            <Grid item xs={12} sx={{ display:'flex', gap:1, flexWrap:'wrap' }}>
              <Button variant="contained" type="submit" disabled={loading}>Add Service</Button>
              <Button variant="outlined" onClick={seedDemo} disabled={loading}>Seed demo</Button>
            </Grid>
          </Grid>
        </form>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          {items.map(s => (
            <Grid key={s._id} item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  {editId === s._id ? (
                    <>
                      <TextField label="Title" value={editForm.title} onChange={e=>setEditForm({...editForm,title:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Description" value={editForm.description} onChange={e=>setEditForm({...editForm,description:e.target.value})} fullWidth multiline minRows={2} sx={{ mb:1 }}/>
                      <TextField label="Price" type="number" value={editForm.price} onChange={e=>setEditForm({...editForm,price:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <FormControlLabel control={<Switch checked={editForm.published} onChange={e=>setEditForm({...editForm,published:e.target.checked})}/>} label="Published" />
                      <Box sx={{ display:'flex', gap:1, mt:1 }}>
                        <Button size="small" variant="contained" onClick={saveEdit}>Save</Button>
                        <Button size="small" onClick={()=>setEditId(null)}>Cancel</Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">{s.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{s.description}</Typography>
                      <Typography variant="body2">Price: {s.price ?? '—'} | Published: {s.published ? 'Yes' : 'No'}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button size="small" onClick={()=>update(s._id, { published: !s.published })}>Toggle Publish</Button>
                        <Button size="small" color="primary" startIcon={<EditIcon />} variant="outlined" onClick={()=>startEdit(s)} sx={{ fontWeight: 'bold' }}>Edit</Button>
                        <Button size="small" color="error" onClick={()=>remove(s._id)}>Delete</Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const ProjectsManager = () => {
  const { items, error, loading, create, update, remove, list } = useCrud('/api/projects', true);
  const [form, setForm] = useState({ title:'', firstname:'', lastname:'', email:'', completion:'', description:'' });
  const [msg, setMsg] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title:'', firstname:'', lastname:'', email:'', completion:'', description:'' });
  const submit = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      await create(form);
      setForm({ title:'', firstname:'', lastname:'', email:'', completion:'', description:'' });
      setMsg('Project created');
    } catch (e) { setMsg(e.message); }
  };
  const seedProjects = async () => {
    try {
      setMsg('');
      const author = { firstname: 'Marc', lastname: 'Harty', email: 'marc@example.com' };
      const today = new Date().toISOString().slice(0,10);
      const curated = [
        {
          title: 'VoxSigil: Symbolic Meta-Language',
          description: 'A symbolic meta-language designed to define, orchestrate, and evolve cognitive components within AI systems. VoxSigil enables modeling of cognitive architectures using structured symbols (sigils) and programmatic constructs (pglyphs).',
          outcome: 'Comprehensive schema for recursive identity, strategic modularity, and developmental orchestration of AI systems. Features Marc\'s sigil ⟠∆∇𓂀 (Marc.pglyph) as foundational cognitive primitive, co-architected with ⎈🧭𓂀✶ SEEKER Helm for AI orchestration across Night City.',
          tech: ['Symbolic AI', 'Cognitive Architecture', 'Meta-Language', 'Schema Design'],
          icon: '⟠∆∇𓂀',
          status: 'Research',
          gradient: 'from-purple-600 to-indigo-600',
          githubUrl: null,
          hasNotebook: false,
          hasSchema: true,
          schemaUrl: '/music/VOXSIGIL COMPLETE SIGIL SCHEMA.md',
          liveUrl: null
        },
        {
          title: 'Stonemasonry.ca',
          description: 'Professional business website for a masonry company built with React and hosted on Netlify. Client project showcasing modern web design and deployment.',
          outcome: 'Successfully sold and delivered a production-ready website with responsive design, optimized performance, and seamless hosting.',
          tech: ['React', 'Netlify', 'Web Development', 'Client Project'],
          icon: '🏗️',
          status: 'Live',
          gradient: 'from-slate-600 to-stone-600',
          githubUrl: null,
          hasNotebook: false,
          liveUrl: 'https://stonemasonry.ca'
        },
        {
          title: 'VantaEchoNebula',
          description: 'Advanced AI + Blockchain network for decentralized intelligence applications and research workflows.',
          outcome: 'Active integration of model orchestration, secure ledger-based provenance, and collaborative research tooling.',
          tech: ['Python', 'AI/ML', 'Blockchain', 'Neural Networks'],
          icon: '🌌',
          status: 'In Development',
          gradient: 'from-blue-600 to-violet-600',
          githubUrl: 'https://github.com/CryptoCOB/VantaEchoNebula',
          hasNotebook: true,
          notebookUrl: 'https://notebooklm.google.com/notebook/c01c6f30-5327-4212-9ab9-e1e89603c8af?pli=1&authuser=2',
          liveUrl: null
        },
        {
          title: 'WebScraperSEOApp',
          description: 'Robust web scraping & SEO analysis pipeline that collects, normalizes and scores site signals for optimization.',
          outcome: 'Production-ready scraping system with analyzers that produce actionable SEO recommendations.',
          tech: ['Python', 'Web Scraping', 'SEO Analysis', 'Data Processing'],
          icon: '🕷️',
          status: 'Completed',
          gradient: 'from-green-500 to-blue-600',
          githubUrl: 'https://github.com/CryptoCOB/WebScraperSEOApp',
          liveUrl: null
        },
        {
          title: 'Telegram Bot',
          description: 'Feature-rich Telegram bot framework for automation, integration, and user interaction flows.',
          outcome: 'Deployed bots running scheduled jobs, integrations, and custom command handlers.',
          tech: ['Python', 'Telegram API', 'Bot Development', 'Automation'],
          icon: '🤖',
          status: 'Completed',
          gradient: 'from-blue-500 to-cyan-600',
          githubUrl: 'https://github.com/CryptoCOB/Telegram-bot',
          liveUrl: null
        },
        {
          title: 'Scarborough Psalms',
          description: 'AI-assisted music composition project blending R&B, Reggae, and Dancehall influences to tell cultural stories.',
          outcome: 'An ongoing creative exploration using generative tools and human curation to produce original tracks.',
          tech: ['AI Music', 'Suno', 'Audio Production', 'Creative Direction'],
          icon: '🎵',
          status: 'Ongoing',
          gradient: 'from-pink-500 to-purple-600',
          hasMusic: true,
          githubUrl: null,
          liveUrl: null
        }
      ];
      for (const p of curated) {
        await create({ ...author, completion: today, ...p });
      }
      await list();
      setMsg('Curated projects seeded');
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <Card elevation={2} sx={{ mb: 4 }}>
      <CardContent>
        <SectionHeader title="Projects" subtitle="Create and manage projects" />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {msg && <Alert severity={msg.includes('created') ? 'success' : 'error'} sx={{ mb: 2 }}>{msg}</Alert>}
        <form onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}><TextField label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={6} md={4}><TextField label="First Name" value={form.firstname} onChange={e=>setForm({...form,firstname:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={6} md={4}><TextField label="Last Name" value={form.lastname} onChange={e=>setForm({...form,lastname:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={4}><TextField label="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={4}><TextField label="Completion (YYYY-MM-DD)" value={form.completion} onChange={e=>setForm({...form,completion:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={4}><TextField label="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required fullWidth multiline minRows={2}/></Grid>
            <Grid item xs={12} sx={{ display:'flex', gap:1, flexWrap:'wrap' }}>
              <Button variant="contained" type="submit" disabled={loading}>Add Project</Button>
              <Button variant="outlined" onClick={seedProjects} disabled={loading}>Seed curated</Button>
            </Grid>
          </Grid>
        </form>
        <Divider sx={{ my: 2 }}/>
        <Grid container spacing={2}>
          {items.map(p => (
            <Grid key={p._id} item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  {editId === p._id ? (
                    <>
                      <TextField label="Title" value={editForm.title} onChange={e=>setEditForm({...editForm,title:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="First Name" value={editForm.firstname} onChange={e=>setEditForm({...editForm,firstname:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Last Name" value={editForm.lastname} onChange={e=>setEditForm({...editForm,lastname:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Email" type="email" value={editForm.email} onChange={e=>setEditForm({...editForm,email:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Completion (YYYY-MM-DD)" value={editForm.completion?.slice(0,10) || ''} onChange={e=>setEditForm({...editForm,completion:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Description" value={editForm.description} onChange={e=>setEditForm({...editForm,description:e.target.value})} fullWidth multiline minRows={2} sx={{ mb:1 }}/>
                      <Box sx={{ display:'flex', gap:1, mt:1 }}>
                        <Button size="small" variant="contained" onClick={()=>update(p._id, editForm)}>Save</Button>
                        <Button size="small" onClick={()=>setEditId(null)}>Cancel</Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">{p.title}</Typography>
                      <Typography variant="body2" sx={{ color:'text.secondary' }}>{p.description}</Typography>
                      <Typography variant="caption">By {p.firstname} {p.lastname} • {new Date(p.completion).toLocaleDateString()}</Typography>
                      <Box sx={{ mt:1, display:'flex', gap:1 }}>
                        <Button size="small" color="primary" startIcon={<EditIcon />} variant="outlined" onClick={()=>{setEditId(p._id); setEditForm({ ...p, completion: (p.completion ? new Date(p.completion).toISOString().slice(0,10) : '') });}} sx={{ fontWeight: 'bold' }}>Edit</Button>
                        <Button size="small" color="error" onClick={()=>remove(p._id)}>Delete</Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const QualificationsManager = () => {
  const { items, error, loading, create, update, remove, list } = useCrud('/api/qualifications', true);
  const [form, setForm] = useState({ title:'', firstname:'', lastname:'', email:'', completion:'', description:'' });
  const [msg, setMsg] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title:'', firstname:'', lastname:'', email:'', completion:'', description:'' });
  const submit = async (e) => {
    e.preventDefault(); setMsg('');
    try { await create(form); setForm({ title:'', firstname:'', lastname:'', email:'', completion:'', description:'' }); setMsg('Qualification created'); }
    catch (e) { setMsg(e.message); }
  };
  const seedQualifications = async () => {
    try {
      setMsg('');
      const author = { firstname: 'Marc', lastname: 'Harty', email: 'marc@example.com' };
      const today = new Date().toISOString().slice(0,10);
      const curated = [
        { title:'AI Software Development', description:'Centennial College program focusing on AI, ML, and software engineering.' },
        { title:'AWS Academy Cloud Foundations', description:'Foundational cloud concepts and AWS services.' },
        { title:'FreeCodeCamp Responsive Web Design', description:'Modern responsive UI development and best practices.' },
        { title:'Google AI Essentials', description:'Core AI literacy and applied foundations.' },
      ];
      for (const q of curated) {
        await create({ ...author, completion: today, ...q });
      }
      await list();
      setMsg('Curated qualifications seeded');
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <Card elevation={2} sx={{ mb: 4 }}>
      <CardContent>
        <SectionHeader title="Qualifications" subtitle="Create and manage education/qualifications" />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {msg && <Alert severity={msg.includes('created') ? 'success' : 'error'} sx={{ mb: 2 }}>{msg}</Alert>}
        <form onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}><TextField label="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={6} md={4}><TextField label="First Name" value={form.firstname} onChange={e=>setForm({...form,firstname:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={6} md={4}><TextField label="Last Name" value={form.lastname} onChange={e=>setForm({...form,lastname:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={4}><TextField label="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={4}><TextField label="Completion (YYYY-MM-DD)" value={form.completion} onChange={e=>setForm({...form,completion:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={4}><TextField label="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required fullWidth multiline minRows={2}/></Grid>
            <Grid item xs={12} sx={{ display:'flex', gap:1, flexWrap:'wrap' }}>
              <Button variant="contained" type="submit" disabled={loading}>Add Qualification</Button>
              <Button variant="outlined" onClick={seedQualifications} disabled={loading}>Seed curated</Button>
            </Grid>
          </Grid>
        </form>
        <Divider sx={{ my: 2 }}/>
        <Grid container spacing={2}>
          {items.map(q => (
            <Grid key={q._id} item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  {editId === q._id ? (
                    <>
                      <TextField label="Title" value={editForm.title} onChange={e=>setEditForm({...editForm,title:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="First Name" value={editForm.firstname} onChange={e=>setEditForm({...editForm,firstname:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Last Name" value={editForm.lastname} onChange={e=>setEditForm({...editForm,lastname:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Email" type="email" value={editForm.email} onChange={e=>setEditForm({...editForm,email:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Completion (YYYY-MM-DD)" value={editForm.completion?.slice(0,10) || ''} onChange={e=>setEditForm({...editForm,completion:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Description" value={editForm.description} onChange={e=>setEditForm({...editForm,description:e.target.value})} fullWidth multiline minRows={2} sx={{ mb:1 }}/>
                      <Box sx={{ display:'flex', gap:1, mt:1 }}>
                        <Button size="small" variant="contained" onClick={()=>update(q._id, editForm)}>Save</Button>
                        <Button size="small" onClick={()=>setEditId(null)}>Cancel</Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">{q.title}</Typography>
                      <Typography variant="body2" sx={{ color:'text.secondary' }}>{q.description}</Typography>
                      <Typography variant="caption">By {q.firstname} {q.lastname} • {new Date(q.completion).toLocaleDateString()}</Typography>
                      <Box sx={{ mt:1, display:'flex', gap:1 }}>
                        <Button size="small" color="primary" startIcon={<EditIcon />} variant="outlined" onClick={()=>{setEditId(q._id); setEditForm({ ...q, completion: (q.completion ? new Date(q.completion).toISOString().slice(0,10) : '') });}} sx={{ fontWeight: 'bold' }}>Edit</Button>
                        <Button size="small" color="error" onClick={()=>remove(q._id)}>Delete</Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const ContactsManager = () => {
  const { items, error, loading, create, update, remove, list } = useCrud('/api/contacts', false);
  const [form, setForm] = useState({ firstname:'', lastname:'', email:'' });
  const [msg, setMsg] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ firstname:'', lastname:'', email:'' });
  const submit = async (e) => {
    e.preventDefault(); setMsg('');
    try { await create(form); setForm({ firstname:'', lastname:'', email:'' }); setMsg('Contact created'); }
    catch (e) { setMsg(e.message); }
  };
  const seedContacts = async () => {
    try {
      setMsg('');
      const curated = [
        { firstname:'Marc', lastname:'Harty', email:'marc@example.com' },
        { firstname:'Business', lastname:'Inquiry', email:'inquiries@example.com' },
        { firstname:'Support', lastname:'Desk', email:'support@example.com' },
      ];
      for (const c of curated) {
        await create(c);
      }
      await list();
      setMsg('Curated contacts seeded');
    } catch (e) { setMsg(e.message); }
  };

  return (
    <Card elevation={2} sx={{ mb: 4 }}>
      <CardContent>
        <SectionHeader title="Contacts" subtitle="Create and view contacts" />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {msg && <Alert severity={msg.includes('created') ? 'success' : 'error'} sx={{ mb: 2 }}>{msg}</Alert>}
        <form onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}><TextField label="First Name" value={form.firstname} onChange={e=>setForm({...form,firstname:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={3}><TextField label="Last Name" value={form.lastname} onChange={e=>setForm({...form,lastname:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={4}><TextField label="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required fullWidth/></Grid>
            <Grid item xs={12} md={2} sx={{ display:'flex', gap:1, flexWrap:'wrap' }}>
              <Button variant="contained" type="submit" disabled={loading}>Add</Button>
              <Button variant="outlined" onClick={seedContacts} disabled={loading}>Seed curated</Button>
            </Grid>
          </Grid>
        </form>
        <Divider sx={{ my: 2 }}/>
        <Grid container spacing={2}>
          {items.map(c => (
            <Grid key={c._id} item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  {editId === c._id ? (
                    <>
                      <TextField label="First Name" value={editForm.firstname} onChange={e=>setEditForm({...editForm,firstname:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Last Name" value={editForm.lastname} onChange={e=>setEditForm({...editForm,lastname:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <TextField label="Email" type="email" value={editForm.email} onChange={e=>setEditForm({...editForm,email:e.target.value})} fullWidth sx={{ mb:1 }}/>
                      <Box sx={{ display:'flex', gap:1, mt:1 }}>
                        <Button size="small" variant="contained" onClick={()=>update(c._id, editForm)}>Save</Button>
                        <Button size="small" onClick={()=>setEditId(null)}>Cancel</Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">{c.firstname} {c.lastname}</Typography>
                      <Typography variant="body2" sx={{ color:'text.secondary' }}>{c.email}</Typography>
                      <Box sx={{ mt:1, display:'flex', gap:1 }}>
                        <Button size="small" color="primary" startIcon={<EditIcon />} variant="outlined" onClick={()=>{setEditId(c._id); setEditForm({ ...c });}} sx={{ fontWeight: 'bold' }}>Edit</Button>
                        <Button size="small" color="error" onClick={()=>remove(c._id)}>Delete</Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-mesh">
      <section className="bg-black text-white min-h-[30vh] flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Typography variant="h3" sx={{ fontWeight: 300 }}>Admin Dashboard</Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, mt: 1 }}>Manage Services, Projects, Qualifications, and Contacts</Typography>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ServicesManager />
          <ProjectsManager />
          <QualificationsManager />
          <ContactsManager />
        </div>
      </section>
    </div>
  );
};

export default Admin;
