import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generatePageRange = () => {
    const pageNumber = isMobile ? 2 : 4;
    const additionalPage = isMobile ? 1 : 2;
    const pages = [];
    let start = Math.max(1, currentPage - additionalPage);
    let end = Math.min(totalPages, currentPage + additionalPage);

    if (end - start < pageNumber) {
      if (start === 1) {
        end = Math.min(totalPages, start + pageNumber);
      } else {
        start = Math.max(1, end - pageNumber);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center gap-[10px]">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-h-[44px] h-[44px] w-16 p-0 rounded-[2px] flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: currentPage === 1 ? 'rgba(235, 234, 248, 0.08)' : 'rgb(142, 78, 198)',
        }}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {generatePageRange().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
          className="min-h-[44px] h-[44px] w-16 p-0 rounded-[2px] flex items-center justify-center text-white transition-all disabled:cursor-default"
          style={{
            background: page === currentPage ? 'rgba(235, 234, 248, 0.08)' : 'rgb(142, 78, 198)',
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-h-[44px] h-[44px] w-16 p-0 rounded-[2px] flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: currentPage === totalPages ? 'rgba(235, 234, 248, 0.08)' : 'rgb(142, 78, 198)',
        }}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
