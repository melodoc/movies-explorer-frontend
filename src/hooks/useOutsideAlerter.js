import { useEffect } from 'react';
// Источник хука: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

/**
 * Хук, который выполняет действие callback при клике 
 * за пределами переданного ref
 */
export function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);
}
