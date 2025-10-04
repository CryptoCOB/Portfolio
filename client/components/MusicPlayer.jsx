import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Slider from '@mui/material/Slider';
import VolumeUp from '@mui/icons-material/VolumeUp';

const MusicPlayer = ({ tracks = [] }) => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  // Default tracks if none provided
  const defaultTracks = [
    {
      title: "LightSeed Rising",
      artist: "Elijah Tait",
      src: "/music/LightSeedRising.mp3",
      description: "Scarborough Psalms - AI-assisted R&B/Reggae/Dancehall fusion"
    },
    {
      title: "Nebula Intro",
      artist: "Elijah Tait",
      src: "/music/🌌 Nebula _Intro.mp3",
      description: "Cosmic soundscape for the AI ecosystem"
    },
    {
      title: "From Scarborough",
      artist: "Elijah Tait",
      src: "/music/FromScarborough.mp4",
      description: "Video showcase from Scarborough"
    }
  ];

  const playlistTracks = tracks.length > 0 ? tracks : defaultTracks;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', nextTrack);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', nextTrack);
    };
  }, [currentTrack]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlistTracks.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlistTracks.length) % playlistTracks.length);
    setIsPlaying(false);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (playlistTracks.length === 0) {
    return (
      <Card sx={{ p: 3, textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h1" sx={{ fontSize: '3rem', mb: 2 }}>🎵</Typography>
        <Typography variant="h6" gutterBottom>Music Player</Typography>
        <Typography variant="body2" color="text.secondary">
          Drop your music files in the /public/music folder to start listening!
        </Typography>
      </Card>
    );
  }

  const currentTrackData = playlistTracks[currentTrack];

  return (
    <Card sx={{ display: 'flex', maxWidth: 500, width: '100%', mx: 'auto' }} elevation={3}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" gutterBottom>
            {currentTrackData.title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary', mb: 1 }}
          >
            {currentTrackData.artist}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            {currentTrackData.description}
          </Typography>
        </CardContent>

        {/* Progress Bar */}
        <Box sx={{ px: 2 }}>
          <Slider
            size="small"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            aria-label="time-indicator"
            sx={{ color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {formatTime(currentTime)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {formatTime(duration)}
            </Typography>
          </Box>
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pl: 1, pb: 1, pt: 1 }}>
          <IconButton 
            aria-label="previous"
            onClick={prevTrack}
          >
            <SkipPreviousIcon />
          </IconButton>
          <IconButton 
            aria-label={isPlaying ? 'pause' : 'play'}
            onClick={togglePlayPause}
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              mx: 1,
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          <IconButton 
            aria-label="next"
            onClick={nextTrack}
          >
            <SkipNextIcon />
          </IconButton>
        </Box>

        {/* Volume Control */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pb: 2 }}>
          <VolumeUp sx={{ mr: 1, color: 'text.secondary' }} />
          <Slider
            aria-label="Volume"
            value={volume * 100}
            onChange={(e, newValue) => {
              const newVolume = newValue / 100;
              setVolume(newVolume);
              audioRef.current.volume = newVolume;
            }}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>
      
      <audio
        ref={audioRef}
        src={currentTrackData.src}
        preload="metadata"
      />
    </Card>
  );
};

export default MusicPlayer;