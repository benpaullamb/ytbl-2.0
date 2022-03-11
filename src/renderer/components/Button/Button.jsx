import style from './Button.module.scss';

export default function Button({ children, className = '', ...props }) {
  return (
    <button {...props} className={`${className} ${style.button}`}>
      {children}
    </button>
  );
}
