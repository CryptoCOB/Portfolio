import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { getApiBase, setToken } from './auth';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOk(false);
    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Login failed');
      if (json.token) setToken(json.token);
      setOk(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <section className="bg-black text-white min-h-[40vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Typography variant="h2" sx={{ fontWeight: 300 }}>Login</Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, mt: 1 }}>Sign in to access protected actions</Typography>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-xl mx-auto px-4">
          <Card elevation={3}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {ok && <Alert severity="success" sx={{ mb: 2 }}>Logged in! Token saved locally.</Alert>}
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Sign in</Typography>
              <form onSubmit={onSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField name="email" label="Email" type="email" value={form.email} onChange={onChange} required fullWidth />
                  <TextField name="password" label="Password" type="password" value={form.password} onChange={onChange} required fullWidth />
                  <Button type="submit" variant="contained" disabled={loading} endIcon={<span>{loading ? '⏳' : '🔐'}</span>}>
                    {loading ? 'Signing in…' : 'Sign in'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Login;
