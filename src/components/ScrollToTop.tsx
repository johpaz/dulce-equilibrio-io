
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  showScrollToTop: boolean;
  scrollToTop: () => void;
}

const ScrollToTop = ({ showScrollToTop, scrollToTop }: ScrollToTopProps) => {
  if (!showScrollToTop) return null;
  
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-dulce-green text-white p-3 rounded-full shadow-lg hover:bg-dulce-green-dark transition-all z-50"
      aria-label="Volver arriba"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
