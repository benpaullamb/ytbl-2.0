# YouTube-BL v2.0

![status: in-progress](https://img.shields.io/badge/status-in--progress-green)

## About this Project

A YouTube music downloader desktop app.

![Screenshot of the app](./screenshot.png)

This app uses `ytdl-core` to download the best quality audio from YouTube and then uses "Fluent ffmpeg-API" to format the audio as `.mp3` (most compatible with Spotify).

Improvements from YTBL v1:

- No server to run
- Desktop app
- No requirement to install YouTube-DL or Ffmpeg before
- Real progress bar when downloading
- Embedded YouTube videos
- Separated the "finding" and "downloading" phases
- Re-design in React

[Link to v1](https://github.com/benpaullamb/ytbl)

### Built with

- Electron
- React
- Sass
- ytdl-core
- Ffmpeg Installer
- Fluent ffmpeg-API

## Getting Started

### Prerequisites

- Node

### Installation

1. Install the dependencies.

```
npm i
```

2. Run Electron.

```
npm run start
```

## Deployment

...

## Usage

1. Paste a YouTube video URL in the bar at the top of the app.

2. Press "Find".

3. Repeat for any number of videos.

4. Press "Download all".

5. Find your downloaded music in your music folder.

## Roadmap

- [ ] Ffmpeg in build looking into `win_unpacked/resources/app.asar/...` There is no `app.asar.unpacked`. There's an `ffmpeg.dll` in `win_unpacked/`
- [ ] Update `package.json` meta fields
- [ ] Fix empty URL error
- [ ] Auto find music folder
- [ ] Animated toasts

## Release History

- v0.1.0
  - Initial design
