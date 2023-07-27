import { useEffect, useState } from "react";

const useBodyScrollable = () => {
  const [bodyScrollable, setBodyScrollable] = useState(
    document.body.scrollHeight >= window.innerHeight
  );

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setBodyScrollable(document.body.scrollHeight >= window.innerHeight);
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);

  return bodyScrollable;
}

export default useBodyScrollable;
