import './UITitle.css';

export function UITitle({ label }) {
  return <p class="title__header">{label ?? ""}</p>;
}
