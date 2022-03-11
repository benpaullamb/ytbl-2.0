import style from './Video.module.scss';

export default function Video({
  title,
  uploader,
  thumbnail,
  duration,
  date,
  views,
  url,
}) {
  return (
    <a href={url} target="_blank" className={style.video}>
      <div
        style={{ backgroundImage: `url("${thumbnail}")` }}
        className={style.image}
      >
        <span className={style.duration}>{duration}</span>
      </div>

      <div className={style.info}>
        <span className={style.title}>{title}</span>
        <span className={style.uploader}>{uploader}</span>

        <div className={style.extra}>
          <span className={style.views}>{views}</span>
          <span className={style.date}>{date}</span>
        </div>
      </div>
    </a>
  );
}
