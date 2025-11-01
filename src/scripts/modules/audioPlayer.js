/**
 * Audio Player Manager avec WaveSurfer.js
 * Waveform visualizer premium
 */

import WaveSurfer from 'wavesurfer.js';

export class AudioPlayerManager {
  constructor() {
    this.players = [];
    this.currentPlayer = null;

    this.init();
  }

  init() {
    const playerElements = document.querySelectorAll('[data-audio-player]');

    playerElements.forEach((el, index) => {
      const waveformContainer = el.querySelector('[data-waveform]');
      const playBtn = el.querySelector('[data-play]');
      const currentTimeEl = el.querySelector('[data-current-time]');
      const durationEl = el.querySelector('[data-duration]');

      if (!waveformContainer || !playBtn) return;

      // Créer instance WaveSurfer
      const wavesurfer = WaveSurfer.create({
        container: waveformContainer,
        waveColor: 'rgba(184, 68, 30, 0.3)',
        progressColor: '#B8441E',
        cursorColor: '#E8924F',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 2,
        height: 80,
        barGap: 2,
        responsive: true,
        normalize: true,
        backend: 'WebAudio',
      });

      // Charger audio (placeholder - remplacer par vraies URLs)
      const audioUrl = el.dataset.audioUrl || `/assets/audio/sample-${index + 1}.mp3`;

      wavesurfer.load(audioUrl).catch((error) => {
        console.warn(`Audio ${index + 1} not found, using fallback`);
        // Afficher message fallback au lieu du player
        this.showFallback(el);
      });

      // Play/Pause
      playBtn.addEventListener('click', () => {
        // Pause autres players
        if (this.currentPlayer && this.currentPlayer !== wavesurfer) {
          this.currentPlayer.pause();
        }

        wavesurfer.playPause();
        this.currentPlayer = wavesurfer;

        // Toggle icon
        this.togglePlayIcon(playBtn, wavesurfer.isPlaying());
      });

      // Update time
      wavesurfer.on('audioprocess', () => {
        if (currentTimeEl) {
          currentTimeEl.textContent = this.formatTime(wavesurfer.getCurrentTime());
        }
      });

      // On ready
      wavesurfer.on('ready', () => {
        if (durationEl) {
          durationEl.textContent = this.formatTime(wavesurfer.getDuration());
        }
      });

      // On finish
      wavesurfer.on('finish', () => {
        this.togglePlayIcon(playBtn, false);
      });

      this.players.push({ element: el, wavesurfer, playBtn });
    });
  }

  showFallback(element) {
    const waveform = element.querySelector('[data-waveform]');
    if (waveform) {
      waveform.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 80px; background: var(--surface); border-radius: 8px; color: var(--text-secondary); font-size: 0.875rem;">
          <svg style="width: 24px; height: 24px; margin-right: 8px; color: var(--accent);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          Démo audio - Fichiers disponibles sur demande
        </div>
      `;
    }
  }

  togglePlayIcon(btn, isPlaying) {
    const playIcon = btn.querySelector('[data-icon="play"]');
    const pauseIcon = btn.querySelector('[data-icon="pause"]');

    if (playIcon && pauseIcon) {
      if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}
