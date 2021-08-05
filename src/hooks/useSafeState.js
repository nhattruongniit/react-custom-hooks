import { useState, useCallback, useEffect, useRef } from 'react';

const useMounted = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};

export default function useSafeState(initialState) {
  const [state, setState] = useState(initialState);
  const mountedRef = useMounted();
  const safeSetState = useCallback(
    (updater) => {
      if (mountedRef.current) {
        setState(updater);
      }
    },
    [mountedRef],
  );

  return [state, safeSetState];
}

// usage

/*
function ComponentA() {
  const [data, setData] = useSafeState('');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(...)
      setData(res)
    } 
    fetchData();
  }, []);

  return (
    <div>
      use safe state
    </div>
  );
}

export default memo(ComponentA);
*/