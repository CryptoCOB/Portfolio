import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver
 * @param {string} animationClass - The CSS class to add when element is visible (default: 'visible')
 * @param {object} options - IntersectionObserver options
 * @returns {ref} - Ref to attach to the element
 */
export const useScrollAnimation = (animationClass = 'visible', options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, defaultOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [animationClass, options]);

  return elementRef;
};

/**
 * Hook for staggered animations on multiple elements
 * @param {number} itemCount - Number of items to animate
 * @param {number} staggerDelay - Delay between each item (ms)
 * @returns {function} - Function to get ref for each item
 */
export const useStaggeredAnimation = (itemCount, staggerDelay = 100) => {
  const refs = useRef([]);

  useEffect(() => {
    refs.current = refs.current.slice(0, itemCount);

    const observers = refs.current.map((element, index) => {
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, index * staggerDelay);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [itemCount, staggerDelay]);

  const setRef = (index) => (element) => {
    refs.current[index] = element;
  };

  return setRef;
};

/**
 * Hook for parallax scrolling effect
 * @param {number} speed - Parallax speed multiplier (0.1 - 1.0)
 * @returns {ref} - Ref to attach to the element
 */
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const elementTop = element.offsetTop;
      const distance = scrolled - elementTop;
      const translateY = distance * speed;

      element.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return elementRef;
};
