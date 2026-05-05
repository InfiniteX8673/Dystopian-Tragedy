# Dystopian Video Player Theme

A custom, futuristic video player theme designed to match the Dystopian Tragedy aesthetic with neon cyan accents and immersive controls.

## Current Implementation

**YouTube Embed Player** - Using YouTube's iframe embed with custom styling to maintain the dystopian aesthetic while leveraging YouTube's robust video player features.

### Visual Design
- **Neon Glow Effects**: Cyber-inspired border glow that activates on hover
- **Gradient Overlays**: Smooth transitions and gradient backgrounds
- **Glassmorphism**: Backdrop blur effects on the container
- **Color Coordination**: Seamless integration with light and dark themes
- **Responsive Design**: Adapts to different screen sizes

### YouTube Features
- **Full YouTube Controls**: Play, pause, volume, fullscreen, quality selection
- **HD Quality Support**: Automatic quality selection based on connection
- **Mobile Optimization**: Touch-friendly controls for mobile devices
- **Privacy Enhanced**: Uses YouTube's privacy-enhanced embed mode
- **Accessibility**: Full keyboard navigation and screen reader support

### Theme Integration
- **Dark Theme**: Deep blues with cyan accents matching the site
- **Light Theme**: Light backgrounds with navy accents
- **Smooth Transitions**: Theme changes animate smoothly
- **Consistent Styling**: Matches the overall site design language

## Technical Implementation

### Files
- **style.css**: Complete styling for YouTube iframe container
- **index.html**: YouTube iframe embed with proper attributes

### YouTube Embed Configuration
```html
<iframe
    width="100%"
    height="450"
    src="https://www.youtube.com/embed/spfj9stziMY?si=xQ7ZAgM3DJDGgRN4"
    title="Dystopian Tragedy Game Trailer"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    id="gameVideo">
</iframe>
```

### CSS Classes
- `.video-container`: Main player wrapper with glow effects
- `.video-glow`: Animated neon glow overlay
- `.video-container iframe`: Styled YouTube embed

### Browser Compatibility
- **Chrome/Edge**: Full support with all YouTube features
- **Firefox**: Full support
- **Safari**: Full support including picture-in-picture
- **Mobile**: Optimized for iOS Safari and Android Chrome

## Alternative: Custom HTML5 Video Player

If you prefer custom controls instead of YouTube's player, the original implementation included:

### Custom Controls (Previously Available)
- **Play/Pause Button** (Spacebar)
- **Volume Control** - Slider with dynamic icons
- **Progress Bar** - Click to seek with animated progress
- **Playback Speed** - 0.5x to 2x with dropdown menu
- **Fullscreen** - Immersive viewing mode
- **Time Display** - Current time and duration

### Keyboard Shortcuts (Custom Player)
| Key | Action |
|-----|--------|
| Space | Play/Pause |
| M | Mute/Unmute |
| F | Toggle Fullscreen |
| ←/→ | Seek ±5 seconds |
| ↑/↓ | Volume ±10% |
| J/L | Jump ±10 seconds |
| P | Cycle playback speed |

## Switching Between Implementations

### To Use YouTube Embed (Current)
- Uses `iframe` with YouTube URL
- Automatic quality selection
- Built-in analytics and features
- No custom JavaScript required

### To Use Custom HTML5 Player
1. Replace iframe with video element
2. Add `video-player.js` script
3. Restore custom controls CSS
4. Use local video file or direct video URL

## Usage

The current YouTube embed works automatically. Simply embed any YouTube video by:
1. Getting the video ID from the YouTube URL
2. Using format: `https://www.youtube.com/embed/{VIDEO_ID}`
3. Adding the iframe to your HTML

## Performance Considerations
- **Lightweight**: No additional JavaScript for YouTube embed
- **CDN Optimized**: YouTube serves video from global CDN
- **Adaptive Streaming**: Automatic quality adjustment
- **Mobile Optimized**: Touch controls and responsive design

## Future Enhancements
- **Multiple Video Support**: Playlist functionality
- **Custom Thumbnails**: Branded video previews
- **Analytics Integration**: Track video engagement
- **Picture-in-Picture**: Enhanced multitasking
- **Offline Support**: Service worker caching