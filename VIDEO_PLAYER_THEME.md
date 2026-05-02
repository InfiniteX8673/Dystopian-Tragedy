# Dystopian Video Player Theme

A custom, futuristic video player theme designed to match the Dystopian Tragedy aesthetic with neon cyan accents and immersive controls.

## Features

### Visual Design
- **Neon Glow Effects**: Cyber-inspired border glow that activates on hover
- **Gradient Overlays**: Smooth transitions and gradient backgrounds
- **Glassmorphism**: Backdrop blur effects on controls
- **Color Coordination**: Seamless integration with light and dark themes

### Interactive Controls

#### Playback
- **Play/Pause Button** (Spacebar)
  - Dynamic icon changes based on state
  - Smooth hover animations

#### Volume Control
- **Volume Button** (M key to mute)
  - Icon changes based on volume level (🔇 → 🔈 → 🔉 → 🔊)
- **Volume Slider**
  - Range: 0-100%
  - Keyboard shortcuts: ↑/↓ for +/- 10%

#### Progress Bar
- **Interactive Seek Bar**
  - Click anywhere to jump to that time
  - Animated progress fill with glow effect
  - Handle appears on hover
  - Displays current time and duration

#### Playback Speed
- **Speed Control** (P key cycles through speeds)
  - Available speeds: 0.5x, 0.75x, 1x, 1.5x, 2x
  - Dropdown menu with active indicator
  - Quick visual feedback

#### Fullscreen
- **Fullscreen Button** (F key)
  - Full immersive experience
  - Maintains custom controls styling

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| Space | Play/Pause |
| M | Mute/Unmute |
| F | Toggle Fullscreen |
| ← Arrow | Seek backward 5s |
| → Arrow | Seek forward 5s |
| ↑ Arrow | Increase volume +10% |
| ↓ Arrow | Decrease volume -10% |
| J | Jump backward 10s |
| L | Jump forward 10s |
| P | Cycle playback speed |

### Auto-Hide Controls
- Controls automatically hide when video is playing
- Reappear on mouse movement
- Always visible when paused
- 3-second hide timeout after playback starts

### Theme Support
- **Dark Theme**: Deep blues with cyan accents
- **Light Theme**: Light backgrounds with navy accents
- Both themes maintain visual hierarchy and readability
- Smooth transitions between theme changes

## Technical Implementation

### Files
- **video-player.js**: Custom video player class with event handling
- **style.css**: Complete styling for player and controls
- **index.html**: HTML markup with video container

### Browser Compatibility
- Chrome/Edge: Full support including WebGL controls
- Firefox: Full support
- Safari: Full support with webkit prefixes
- Mobile: Responsive controls optimized for touch

### CSS Classes
- `.video-container`: Main player wrapper
- `.custom-video-controls`: Control panel
- `.control-btn`: Individual buttons
- `.progress-bar-container`: Progress bar wrapper
- `.speed-menu`: Speed selector dropdown
- `.video-playing`: State class when video plays
- `.video-paused`: State class when video pauses

## Customization

### Change Accent Color
Update the CSS variable in `style.css`:
```css
:root {
    --accent-color: #00aaff; /* Change this */
}
```

### Adjust Speed Options
Edit the `playbackRates` array in `video-player.js`:
```javascript
this.playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
```

### Modify Auto-Hide Timeout
Change the timeout value in `showControls()` method:
```javascript
this.hideControlsTimeout = setTimeout(() => {
    this.hideControls();
}, 3000); // milliseconds
```

## Usage

The video player initializes automatically when the page loads. Simply embed a video element with:
```html
<div class="video-container" id="videoContainer">
    <video width="100%" height="450" controls id="gameVideo" preload="metadata">
        <source src="your-video.mp4" type="video/mp4">
    </video>
</div>
```

The `DystopianVideoPlayer` class will automatically:
1. Create custom controls
2. Attach event listeners
3. Enable keyboard shortcuts
4. Manage responsive styling

## Performance Considerations
- Lightweight JavaScript (no dependencies)
- CSS-based animations for smooth 60fps performance
- Efficient event delegation
- Minimal DOM manipulation
- Optimized for mobile and desktop

## Future Enhancements
- Picture-in-picture mode
- Subtitle/Caption support
- Playlist management
- Video quality selector
- Analytics tracking
- Streaming protocol support (HLS, DASH)
