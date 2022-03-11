import ytdl, { videoInfo } from 'ytdl-core';
import ffmpegInstall from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { Duration } from 'luxon';
import fs from 'fs';
import { Readable } from 'stream';
import { sendToRenderer } from './main';

interface FfmpegProgress {
  [key: string]: any;
  timemark: string;
}

ffmpeg.setFfmpegPath(ffmpegInstall.path);

const downloadSongs = async (urls: string[]) => {
  const allInfo = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const info = await download(url);
    allInfo.push(info);
  }
  return allInfo;
};

export default downloadSongs;

const download = async (url: string) => {
  const info = await ytdl.getInfo(url);

  const audioStream = ytdl(url, {
    quality: 'highestaudio',
    filter: 'audioonly',
  });

  saveAsMp3(audioStream, info);

  return info.videoDetails;
};

const saveAsMp3 = (audioStream: Readable, info: videoInfo) => {
  const writeStream = fs.createWriteStream(
    `C:/Users/benpa/Music/${info.videoDetails.title}.mp3`
  );

  ffmpeg({
    source: audioStream,
    logger: console,
  })
    .toFormat('mp3')
    .output(writeStream)
    .on('progress', (progress) => {
      sendToRenderer(
        'download-progress',
        info,
        progressPercent(progress, info)
      );
    })
    .on('error', (err) => {
      sendToRenderer('download-error', info, err);
    })
    .on('end', () => {
      sendToRenderer('download-end', info);
    })
    .run();
};

const progressPercent = (progress: FfmpegProgress, info: videoInfo) => {
  const currentTime = Duration.fromISOTime(progress.timemark).toMillis() / 1000;
  const totalDuration = Number(info.videoDetails.lengthSeconds);
  return Math.floor((currentTime / totalDuration) * 100);
};
