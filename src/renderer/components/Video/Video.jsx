import { useMemo } from 'react';
import style from './Video.module.scss';
import numeral from 'numeral';
import { DateTime, Duration } from 'luxon';
import Progress from '../Progress';

export default function Video({
  embed,
  title,
  ownerChannelName,
  lengthSeconds,
  uploadDate,
  viewCount,
  progress = 0,
}) {
  const views = useMemo(() => numeral(viewCount).format('0a'), [viewCount]);

  const length = useMemo(
    () =>
      Duration.fromObject({ seconds: Number(lengthSeconds) }).toFormat('mm:ss'),
    [lengthSeconds]
  );

  const date = useMemo(
    () => DateTime.fromISO(uploadDate).toLocaleString(DateTime.DATE_MED),
    [uploadDate]
  );

  return (
    <div className={style.video}>
      <iframe title={title} src={embed.iframeUrl} width={350} height={200} />
      <div className={style.info}>
        <span className={style.title}>
          {title} ({length})
        </span>
        <span className={style.channel}>By {ownerChannelName}</span>
        <span className={style.viewsAndDate}>
          {views} - {date}
        </span>
        {!!progress && <Progress percent={progress} />}
      </div>
    </div>
  );
}
