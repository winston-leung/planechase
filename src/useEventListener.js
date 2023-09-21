import { useEffect } from "react";

const useEventListener = (eventName, handler, element = window) => {
  useEffect(() => {
    // Ensure the element and handler exist before adding the listener
    if (element && handler) {
      // Add the event listener
      element.addEventListener(eventName, handler);

      // Remove the event listener when the component unmounts
      return () => {
        element.removeEventListener(eventName, handler);
      };
    }
  }, [eventName, handler, element]);
}

export default useEventListener;