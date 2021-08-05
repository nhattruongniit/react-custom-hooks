import { useEffect, useState } from 'react';

const useInfiniteScroll = callback => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching, callback]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];

}

export default useInfiniteScroll;

// usage

/*
const List = () => {
  const [items, setItems] = useState(Array.from(Array(30).keys(), n => n + 1));
  const fetchMoreListItems = () => {
    setTimeout(() => {
      setItems(prevState => ([...prevState, ...Array.from(Array(20).keys(), n => n + prevState.length + 1 )]))
      setIsFetching(false);
    }, 2000)
  }
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);


  return (
    <>
      <ul className="list-group mb-2">  
          {items.map(val => <li key={val} className="list-group-item">List Item {val}</li>)}
      </ul>
      {isFetching && 'Fetching more list items...'}
    </>
  )
}

export default List;
*/
