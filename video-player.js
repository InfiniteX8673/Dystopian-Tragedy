/**
 * Custom Video Player with Dystopian Theme
 * Provides enhanced controls and interactive features
 */

class DystopianVideoPlayer {
    constructor(videoId = 'gameVideo', containerId = 'videoContainer') {
        this.video = document.getElementById(videoId);
        this.container = document.getElementById(containerId);
        
        if (!this.video || !this.container) {
            console.error('Video player elements not found');
            return;
        }
        
        this.isPlaying = false;
        this.isMuted = false;
        this.currentQuality = 'auto';
        this.playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
        this.currentRateIndex = 2; // Default to 1x
        
        this.init();
    }
    
    init() {
        this.createCustomControls();
        this.attachEventListeners();
        this.addKeyboardShortcuts();
    }
    
    createCustomControls() {
        // Create custom controls panel
        const controlsPanel = document.createElement('div');
        controlsPanel.className = 'custom-video-controls';
        controlsPanel.innerHTML = `
            <div class="video-controls-bottom">
                <div class="progress-bar-container">
                    <div class="progress-bar" id="videoProgress">
                        <div class="progress-fill"></div>
                        <div class="progress-handle"></div>
                    </div>
                </div>
                
                <div class="controls-row">
                    <div class="controls-left">
                        <button class="control-btn play-btn" id="playBtn" title="Play/Pause (Space)">
                            <span class="icon">▶</span>
                        </button>
                        
                        <div class="volume-control">
                            <button class="control-btn volume-btn" id="volumeBtn" title="Mute/Unmute (M)">
                                <span class="icon">🔊</span>
                            </button>
                            <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="100" title="Volume (↑↓)">
                        </div>
                        
                        <span class="time-display">
                            <span id="currentTime">0:00</span> / <span id="duration">0:00</span>
                        </span>
                    </div>
                    
                    <div class="controls-right">
                        <div class="speed-control">
                            <button class="control-btn speed-btn" id="speedBtn" title="Playback Speed">
                                <span class="speed-text">1x</span>
                            </button>
                            <div class="speed-menu" id="speedMenu">
                                ${this.playbackRates.map(rate => 
                                    `<button class="speed-option ${rate === 1 ? 'active' : ''}" data-rate="${rate}">${rate}x</button>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <button class="control-btn fullscreen-btn" id="fullscreenBtn" title="Fullscreen (F)">
                            <span class="icon">⛶</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.container.appendChild(controlsPanel);
        this.controlsPanel = controlsPanel;
    }
    
    attachEventListeners() {
        // Play/Pause
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());
        
        // Volume controls
        document.getElementById('volumeBtn').addEventListener('click', () => this.toggleMute());
        const volumeSlider = document.getElementById('volumeSlider');
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
        
        // Time update
        this.video.addEventListener('timeupdate', () => this.updateTimeDisplay());
        this.video.addEventListener('loadedmetadata', () => this.updateDuration());
        
        // Progress bar
        const progressBar = document.getElementById('videoProgress');
        progressBar.addEventListener('click', (e) => this.seek(e));
        progressBar.addEventListener('mousemove', (e) => this.showProgressPreview(e));
        
        // Speed controls
        document.getElementById('speedBtn').addEventListener('click', () => this.toggleSpeedMenu());
        document.querySelectorAll('.speed-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.setPlaybackRate(parseFloat(e.target.dataset.rate)));
        });
        
        // Fullscreen
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        
        // Controls visibility
        this.container.addEventListener('mousemove', () => this.showControls());
        this.container.addEventListener('mouseleave', () => this.hideControls());
        this.video.addEventListener('play', () => this.hideControls());
        this.video.addEventListener('pause', () => this.showControls());
    }
    
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger if focus is on an input field
            if (document.activeElement.tagName === 'INPUT') return;
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.togglePlay();
                    break;
                case 'KeyM':
                    this.toggleMute();
                    break;
                case 'KeyF':
                    this.toggleFullscreen();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.video.currentTime += 5;
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.video.currentTime -= 5;
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.setVolume(Math.min(100, this.video.volume * 100 + 10));
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.setVolume(Math.max(0, this.video.volume * 100 - 10));
                    break;
                case 'KeyJ':
                    this.video.currentTime = Math.max(0, this.video.currentTime - 10);
                    break;
                case 'KeyL':
                    this.video.currentTime += 10;
                    break;
                case 'KeyP':
                    this.cyclePlaybackRate();
                    break;
            }
        });
    }
    
    togglePlay() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }
    
    onPlay() {
        this.isPlaying = true;
        const playBtn = document.getElementById('playBtn');
        playBtn.innerHTML = '<span class="icon">⏸</span>';
        this.container.classList.remove('video-paused');
        this.container.classList.add('video-playing');
    }
    
    onPause() {
        this.isPlaying = false;
        const playBtn = document.getElementById('playBtn');
        playBtn.innerHTML = '<span class="icon">▶</span>';
        this.container.classList.remove('video-playing');
        this.container.classList.add('video-paused');
    }
    
    toggleMute() {
        this.video.muted = !this.video.muted;
        this.updateVolumeIcon();
    }
    
    setVolume(value) {
        const vol = value / 100;
        this.video.volume = vol;
        document.getElementById('volumeSlider').value = value;
        
        if (vol === 0) {
            this.video.muted = true;
        } else {
            this.video.muted = false;
        }
        this.updateVolumeIcon();
    }
    
    updateVolumeIcon() {
        const volumeBtn = document.getElementById('volumeBtn');
        const vol = this.video.volume * 100;
        
        if (this.video.muted || vol === 0) {
            volumeBtn.innerHTML = '<span class="icon">🔇</span>';
        } else if (vol < 33) {
            volumeBtn.innerHTML = '<span class="icon">🔈</span>';
        } else if (vol < 66) {
            volumeBtn.innerHTML = '<span class="icon">🔉</span>';
        } else {
            volumeBtn.innerHTML = '<span class="icon">🔊</span>';
        }
    }
    
    updateTimeDisplay() {
        const current = this.formatTime(this.video.currentTime);
        document.getElementById('currentTime').textContent = current;
        
        const progressFill = document.querySelector('.progress-fill');
        const percent = (this.video.currentTime / this.video.duration) * 100;
        progressFill.style.width = percent + '%';
    }
    
    updateDuration() {
        const duration = this.formatTime(this.video.duration);
        document.getElementById('duration').textContent = duration;
    }
    
    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    seek(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.video.currentTime = percent * this.video.duration;
    }
    
    showProgressPreview(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const time = percent * this.video.duration;
        const timeStr = this.formatTime(time);
        
        // Optionally show a tooltip here
    }
    
    toggleSpeedMenu() {
        const speedMenu = document.getElementById('speedMenu');
        speedMenu.classList.toggle('active');
    }
    
    setPlaybackRate(rate) {
        this.video.playbackRate = rate;
        document.getElementById('speedBtn').querySelector('.speed-text').textContent = `${rate}x`;
        
        // Close menu
        document.getElementById('speedMenu').classList.remove('active');
        
        // Update active button
        document.querySelectorAll('.speed-option').forEach(btn => {
            btn.classList.toggle('active', parseFloat(btn.dataset.rate) === rate);
        });
    }
    
    cyclePlaybackRate() {
        this.currentRateIndex = (this.currentRateIndex + 1) % this.playbackRates.length;
        this.setPlaybackRate(this.playbackRates[this.currentRateIndex]);
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    showControls() {
        this.controlsPanel.classList.add('visible');
        
        if (this.isPlaying) {
            clearTimeout(this.hideControlsTimeout);
            this.hideControlsTimeout = setTimeout(() => {
                this.hideControls();
            }, 3000);
        }
    }
    
    hideControls() {
        if (this.isPlaying) {
            this.controlsPanel.classList.remove('visible');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const player = new DystopianVideoPlayer('gameVideo', 'videoContainer');
});
