import style from './App.module.scss';
import Input from './components/Input';
import Button from './components/Button';
import Video from './components/Video';
import { useState } from 'react';

export default function App() {
  const [searchUrl, setSearchUrl] = useState(
    'https://www.youtube.com/watch?v=us8hYVeOJZw'
  );
  const [videos, setVideos] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const findSong = async () => {
    const isAlreadyFound = videos.some(
      ({ video_url }) => video_url === searchUrl
    );
    if (isAlreadyFound) {
      return;
    }

    const info = await electron.getInfo(searchUrl);
    console.log(info);
    setVideos((prevVideos) => [info, ...prevVideos]);
  };

  const handleKeyDown = ({ key }) => {
    if (key.toLowerCase() === 'enter' && !isDownloading) {
      findSong();
    }
  };

  const downloadAll = async () => {
    const videosToDownload = videos.filter(({ progress }) => progress !== 100);
    if (videosToDownload.length === 0) {
      return;
    }

    electron.onDownloadProgress((s, info, progress) => {
      console.log('Download progress', progress);

      setVideoProgress(info.videoId, progress);
    });
    electron.onDownloadError((s, info, err) => {
      console.error('Download error', err);

      setIsDownloading(false);
    });
    electron.onDownloadEnd((s, info) => {
      console.log('Download complete', info);

      setVideoProgress(info.videoId, 100);
      setIsDownloading(false);
    });

    setIsDownloading(true);

    const downloadedVideos = await electron.download(
      videosToDownload.map(({ video_url }) => video_url)
    );
  };

  const clearVideos = () => {
    setVideos([]);
  };

  const setVideoProgress = (videoId, progress) => {
    setVideos((videos) => {
      const videosCopy = [...videos];
      const video = videosCopy.find((video) => video.videoId === videoId);
      video.progress = progress;
      return videosCopy;
    });
  };

  return (
    <div className={style.app}>
      <div className={style.top}>
        <h1 className={style.title}>YouTube-BL v2.0</h1>

        <Input
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.currentTarget.value)}
          disabled={isDownloading}
          placeholder="YouTube URL..."
          inputClassName={style.input}
          onKeyDown={handleKeyDown}
          endComponent={
            <Button
              onClick={findSong}
              disabled={isDownloading}
              className={style.button}
            >
              Find
            </Button>
          }
        />
      </div>

      <div className={style.bottom}>
        <div className={style.header}>
          <h2 className={style.title}>Videos</h2>
          <div>
            <Button
              onClick={downloadAll}
              disabled={isDownloading}
              className={style.downloadAll}
            >
              Download All
            </Button>
            <Button
              onClick={clearVideos}
              disabled={isDownloading}
              className={style.clear}
            >
              Clear
            </Button>
          </div>
        </div>

        <div className={style.videos}>
          {videos.map((video, i) => (
            <Video key={`${video.videoId}${i}`} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}
