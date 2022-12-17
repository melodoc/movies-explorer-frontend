import { useEffect, useState } from 'react';

import './Toast.css';

export function Toast({ label }) {
  const [showClassName, setShowClassName] = useState(false);

  setTimeout(function () {
    setShowClassName(false);
  }, 3000);

  useEffect(() => {
    setShowClassName(true);
  }, [label]);

  return <div className={showClassName ? 'show snackbar' : 'snackbar'}>{label}</div>;
}
