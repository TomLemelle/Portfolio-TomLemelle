import { useEffect, useRef } from "react";

// Typage plus précis des triggerRefs comme étant un tableau de `RefObject<HTMLDivElement>`
export default function useClickOutside(
  handler: () => void,
  triggerRefs: React.RefObject<HTMLDivElement>[] = [] // Modification ici
) {
  const ref = useRef<HTMLDivElement | null>(null); // Typage du `ref` en HTMLDivElement

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }

      const isClickOnTrigger = triggerRefs.some(
        (triggerRef) =>
          triggerRef.current &&
          triggerRef.current.contains(event.target as Node)
      );

      if (!isClickOnTrigger) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler, triggerRefs]);

  return ref;
}
