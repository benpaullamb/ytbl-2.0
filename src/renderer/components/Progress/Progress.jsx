import style from './Progress.module.scss';

export default function Progress({ percent }) {
  return (
    <div className={style.container}>
      <div style={{ width: `${percent}%` }} className={style.bar} />
      <span className={style.percent}>
        {percent < 100 ? `${percent}%` : 'Downloaded'}
      </span>
    </div>
  );
}
