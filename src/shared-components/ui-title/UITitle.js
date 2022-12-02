import './UITitle.css';

export function UITitle({ label }) {
  return <p className="title__header">{label ?? ""}</p>;
}
