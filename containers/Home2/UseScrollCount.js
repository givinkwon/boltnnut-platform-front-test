import { useRef, useEffect, useCallback } from 'react';
import AnimationCount from 'react-count-animation';

const UseScrollCount = (end, start = 0, duration = 3000, delay = 0,addAmount=1) => {
  const element = useRef();
  const observer = useRef(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  const numRef=useRef(start);

  const onScroll = useCallback(
    ([entry]) => {
      const { current } = element;
      if (current && entry.isIntersecting) 
      {
        const counter = setInterval(() => {
          numRef.current+=addAmount;
          current.innerHTML = numRef.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");                             
          if (numRef.current >= end) {
            clearInterval(counter);
            current.innerHTML = end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
            observer.current.disconnect(element.current);
          }
        }, stepTime);
      }
    },
    [end, start, stepTime, element],
  );

  useEffect(() => {
    if (element.current) {
      observer.current = new IntersectionObserver(onScroll, { threshold: 0 });
      observer.current.observe(element.current);
    }
    return() =>observer && observer.disconnect;

  }, [onScroll]);

  return {
    ref: element,
  };
};

export default UseScrollCount;