import style from './App.module.scss';
import Input from './components/Input';
import Button from './components/Button';
import Video from './components/Video';
import { useState } from 'react';

export default function App() {
  const [videos, setVideos] = useState([]);

  const findSong = () => {
    console.log('Find');
  };

  const handleKeyDown = ({ key }) => {
    if (key.toLowerCase() === 'enter') {
      findSong();
    }
  };

  const downloadAll = async () => {
    electron.onDownloadProgress((s, info, progress) => {
      console.log('Download progress', info, progress);
    });
    electron.onDownloadError((s, info, err) => {
      console.log('Download error', info, err);
    });
    electron.onDownloadEnd((s, info) => {
      console.log('Download complete', info);
    });
    const downloadedVideos = await electron.download([
      'https://www.youtube.com/watch?v=us8hYVeOJZw',
    ]);
    setVideos(downloadedVideos);
    console.log(downloadedVideos);
  };

  return (
    <div className={style.app}>
      <div className={style.top}>
        <h1 className={style.title}>YouTube-BL v2.0</h1>

        <Input
          placeholder="YouTube URL..."
          inputClassName={style.input}
          onKeyDown={handleKeyDown}
          endComponent={
            <Button onClick={findSong} className={style.button}>
              Find
            </Button>
          }
        />
      </div>

      <div className={style.bottom}>
        <div className={style.header}>
          <h2 className={style.title}>Videos</h2>
          <div>
            <Button onClick={downloadAll} className={style.downloadAll}>
              Download All
            </Button>
            <Button className={style.clear}>Clear</Button>
          </div>
        </div>

        <div className={style.videos}>
          <Video />
        </div>
      </div>
    </div>
  );
}
