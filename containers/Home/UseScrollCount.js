import { useRef, useEffect, useCallback } from 'react';
import AnimationCount from 'react-count-animation';

const UseScrollCount = (end, start = 0, duration = 3000, delay = 0,addAmount=1) => {
  const element = useRef();
  const observer = useRef(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const countSettings = {
    start: 0,
    count : 10000,
    duration: 30000,
    decimals: 0,
    useGroup: true,
    animation: 'up'
  };

  const onScroll = useCallback(
    ([entry]) => {
      const { current } = element;
      if (entry.isIntersecting) {
        let currentNumber = start;
        const counter = setInterval(() => {
          currentNumber += addAmount;
          current.innerHTML = currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          if (currentNumber >= end) {
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
      observer.current = new IntersectionObserver(onScroll, { threshold: 0.7 });
      observer.current.observe(element.current);
    }

    // return () => observer && observer.disconnect();
  }, [onScroll]);

  return {
    ref: element,
  };
};

export default UseScrollCount;