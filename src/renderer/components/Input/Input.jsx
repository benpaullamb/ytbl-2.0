import style from './Input.module.scss';

export default function Input({
  label,
  className = '',
  inputClassName = '',
  endComponent = null,
  ...inputProps
}) {
  return (
    <div className={`${className} ${style.input}`}>
      {label && <label>{label}</label>}
      <div className={style.controls}>
        <input className={inputClassName} {...inputProps} />
        {endComponent}
      </div>
    </div>
  );
}
