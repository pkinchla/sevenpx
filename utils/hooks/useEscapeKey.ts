import { useEffect } from "preact/hooks";

const useEscapeKey = (handler: () => void): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Use event.key === 'Escape' for cross-browser compatibility
      if (event.key === "Escape") {
        handler();
      }
    };

    // Add a global event listener to the document
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handler]); // Ensure the effect runs if the handler function changes
};

export default useEscapeKey;
