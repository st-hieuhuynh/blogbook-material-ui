import React, { useState } from 'react';

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setIsVisible(scrolled > 300);
  };

  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  window.addEventListener('scroll', toggleVisible);

  return (
    <>
      {isVisible && (
        <button className="btn btn-scroll" onClick={scrollToTopHandler}>
          <img
            className="btn-scroll-icon"
            src="./assets/icons/up-solid.svg"
            alt="Scroll"
          />
        </button>
      )}
    </>
  );
};

export default ScrollButton;
