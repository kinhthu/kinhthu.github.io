import {useState, useEffect} from 'react';

export const useActiveElement = () => {
  const [active, setActive] = useState(document.activeElement);
  
  const handleScroll = (e) => {
    debugger
    setActive(document.activeElement);
  }
  
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
  };
  }, [])
  
  return active;
}