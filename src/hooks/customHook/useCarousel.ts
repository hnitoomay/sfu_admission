import { useCallback, useEffect, useState } from "react";

function useCarousel(ref: React.RefObject<HTMLDivElement>) {
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const getMetrics = useCallback(() => {
    const carousel = ref.current;

    if (!carousel) {
      return null;
    }

    const firstCard = carousel.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.clientWidth ?? carousel.clientWidth;
    const gap = 24;
    const step = cardWidth + gap;
    const maxScrollLeft = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
    const maxIndex = Math.max(Math.round(maxScrollLeft / step), 0);
    const currentIndex = Math.min(
      Math.round(carousel.scrollLeft / step),
      maxIndex
    );

    return { carousel, currentIndex, maxIndex, step };
  }, [ref]);

  const updateButtons = useCallback(() => {
    const metrics = getMetrics();

    if (!metrics) {
      return;
    }

    setCanScrollPrevious(metrics.currentIndex > 0);
    setCanScrollNext(metrics.currentIndex < metrics.maxIndex);
  }, [getMetrics]);

  const scroll = useCallback(
    (direction: "left" | "right", shouldLoop = false) => {
      const metrics = getMetrics();

      if (!metrics) {
        return;
      }

      const { carousel, currentIndex, maxIndex, step } = metrics;
      let nextIndex = direction === "right" ? currentIndex + 1 : currentIndex - 1;

      if (nextIndex > maxIndex) {
        nextIndex = shouldLoop ? 0 : maxIndex;
      }

      if (nextIndex < 0) {
        nextIndex = shouldLoop ? maxIndex : 0;
      }

      carousel.scrollTo({
        left: nextIndex * step,
        behavior: "smooth",
      });
    },
    [getMetrics]
  );

  useEffect(() => {
    updateButtons();

    window.addEventListener("resize", updateButtons);

    return () => {
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  return { canScrollPrevious, canScrollNext, scroll, updateButtons };
}

export default useCarousel;
