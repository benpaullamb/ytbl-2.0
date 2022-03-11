import ytdl, { MoreVideoDetails } from 'ytdl-core';
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

export const getInfo = async (url: string) => {
  const { videoDetails } = await ytdl.getInfo(url);
  return videoDetails;
};

const download = async (url: string) => {
  const { videoDetails } = await ytdl.getInfo(url);

  const audioStream = ytdl(url, {
    quality: 'highestaudio',
    filter: 'audioonly',
  });

  await saveAsMp3(audioStream, videoDetails);

  return videoDetails;
};

const saveAsMp3 = (audioStream: Readable, videoDetails: MoreVideoDetails) => {
  const writeStream = fs.createWriteStream(
    `C:/Users/benpa/Music/${videoDetails.title}.mp3`
  );

  return new Promise((res, rej) => {
    ffmpeg({
      source: audioStream,
      logger: console,
    })
      .toFormat('mp3')
      .output(writeStream)
      .on('progress', (progress) => {
        sendToRenderer(
          'download-progress',
          videoDetails,
          progressPercent(progress, videoDetails)
        );
      })
      .on('error', (err) => {
        sendToRenderer('download-error', videoDetails, err);
        rej(err);
      })
      .on('end', () => {
        sendToRenderer('download-end', videoDetails);
        res(videoDetails);
      })
      .run();
  });
};

const progressPercent = (
  progress: FfmpegProgress,
  videoDetails: MoreVideoDetails
) => {
  const currentTime = Duration.fromISOTime(progress.timemark).toMillis() / 1000;
  const totalDuration = Number(videoDetails.lengthSeconds);
  return Math.floor((currentTime / totalDuration) * 100);
};
