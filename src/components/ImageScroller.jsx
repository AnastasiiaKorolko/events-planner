import { useRef } from 'react';
import { useEffect } from 'react';
import './ImageScroller.scss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const images = [
  { id: 1, src: '/events-planner/images/third.jpg'},
  { id: 2, src: '/events-planner/images/1.jpg'},
  { id: 3, src: '/events-planner/images/2.jpg'},
  { id: 4, src: '/events-planner/images/3.jpg'},
  { id: 5, src: '/events-planner/images/4.jpg'},
]

export const ImageScroller = () => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const scroller = scrollerRef.current;

      if (!scroller) {
        return;
      }

      const isAtEnd = Math.ceil(scroller.scrollLeft + scroller.offsetWidth) >= scroller.scrollWidth;

      if (isAtEnd) {
        scroller.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRight();
      }
    }, 3000);

    return () => clearInterval(intervalId)

  }, [])

  const scrollLeft = () => {
    scrollerRef.current.scrollBy({
      left: -450,
      behavior: 'smooth',
    })
  }
  const scrollRight = () => {
    scrollerRef.current.scrollBy({
      left: 450,
      behavior: 'smooth',
    })
  }

  return (
    <div className='image-scroller-wrapper'>
      <button className='scroll-button left' onClick={scrollLeft}>
        <FaArrowLeft /></button>

      <div className='image-scroller' ref={scrollerRef}>
        {images.map((img) => (
          <div key={img.id} className='image-scroller__item'>
            <img src={img.src} loading='lazy' />
          </div>
        ))}
      </div>

      <button className='scroll-button right' onClick={scrollRight}>
        <FaArrowRight />
      </button>
    </div>
  )
}