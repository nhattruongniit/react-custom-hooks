import { useState, useEffect } from 'react';

const useDebounce = (text, delay = 500) => {
  const [debounced, setDebounced] = useState(text);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(text);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, delay]);

  return debounced;
};

export default useDebounce;

// usage

/*
function ComponentA() {
  const [keyword, setKeyWord] = useState('');
  const debounceVal = useDebounce(keyword);

  const _onChange = event => {
    setKeyWord(event.target.value);
  };

  useEffect(() => {
    console.log('...someting')
  }, [debounceVal]);

  return (
    <div>
      <input type="text" value={keyword} placeholder={placeholder} onChange={_onChange} />
    </div>
  );
}

export default memo(ComponentA);
*/