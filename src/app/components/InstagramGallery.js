'use client';
import { useEffect } from 'react';

export default function InstagramGallery() {
  useEffect(() => {
    const images = document.querySelectorAll('.gallery img');

    function checkScroll() {
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
          img.classList.add('show');
        } else {
          img.classList.remove('show');
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
