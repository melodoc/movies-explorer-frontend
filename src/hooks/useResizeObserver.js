import { useEffect, useState } from 'react';
import debounce from 'lodash-es/debounce';

/**
 * Хук, который следит за ресайзом
 */

export function useResizeObserver() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }, 100);

    window.addEventListener('resize', debouncedHandleResize);

    return (_) => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });

  return dimensions;
}
