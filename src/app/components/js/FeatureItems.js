'use client';
import { useEffect } from 'react';

export default function FeatureItems() {
  useEffect(() => {
    const featureItems = document.querySelectorAll('.feature-item');

    function checkScroll() {
      featureItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return null; // Sẽ không hiển thị gì nhưng tránh lỗi

}
