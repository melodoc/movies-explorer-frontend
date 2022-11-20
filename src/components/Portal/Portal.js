import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import './Portal.css';

export function Portal({ children }) {
  const mount = document.getElementById('portal-root');
  const element = document.createElement('div');
  element.className = 'portal_opened';

  useEffect(() => {
    mount.appendChild(element);
    return () => mount.removeChild(element);
  }, [element, mount]);

  return createPortal(children, element);
}
