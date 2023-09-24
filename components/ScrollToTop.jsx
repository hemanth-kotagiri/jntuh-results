import { useEffect, useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    toggleVisible();
    window.addEventListener("scroll", toggleVisible);
    return function unMount() {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    // setting for the first time
    setWindowSize(window.innerWidth);

    // setting when the window is resized
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  // if the width is greater than 768px, then show the scroll to top button
  return windowSize > 768 ? (
    <div>
      <BsArrowUpCircleFill
        onClick={scrollToTop}
        size={30}
        style={{
          display: visible ? "inline" : "none",
          position: "fixed",
          bottom: "20px",
          right: "30px",
          cursor: "pointer",
          fontSize: "22px",
        }}
      />
    </div>
  ) : (
    <></>
  );
};

export default ScrollToTop;
