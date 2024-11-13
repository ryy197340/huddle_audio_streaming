import { useEffect, useRef } from 'react';

function useChatScroll(dep: object) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);

  return ref;
}

export default useChatScroll;
