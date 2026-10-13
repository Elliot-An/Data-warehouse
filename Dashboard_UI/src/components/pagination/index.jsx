import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (currentPage > totalPages || currentPage < 1) {
    currentPage = totalPages;
  }
  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <li
          key={page}
          className={`numb ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          <span>{page}</span>
        </li>
      ));
    }

    const pages = [];
    
    // Thêm nút trang đầu tiên và dấu ... nếu cần
    if (currentPage > 2) {
      pages.push(
        <li key="first" className="first numb" onClick={() => onPageChange(1)}>
          <span>1</span>
        </li>
      );
      if (currentPage > 3) {
        pages.push(
          <li key="dots1" className="dots">
            <span>...</span>
          </li>
        );
      }
    }

    // Tính toán các trang trước và sau trang hiện tại
    let beforePage = currentPage - 1;
    let afterPage = currentPage + 1;

    if (currentPage === totalPages) {
      beforePage = beforePage - 2;
    } else if (currentPage === totalPages - 1) {
      beforePage = beforePage - 1;
    }

    if (currentPage === 1) {
      afterPage = afterPage + 2;
    } else if (currentPage === 2) {
      afterPage = afterPage + 1;
    }

    // Thêm các trang ở giữa
    for (let i = beforePage; i <= afterPage; i++) {
      if (i > 0 && i <= totalPages) {
        pages.push(
          <li
            key={i}
            className={`numb ${currentPage === i ? "active" : ""}`}
            onClick={() => onPageChange(i)}
          >
            <span>{i}</span>
          </li>
        );
      }
    }

    // Thêm dấu ... và nút trang cuối nếu cần
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push(
          <li key="dots2" className="dots">
            <span>...</span>
          </li>
        );
      }
      pages.push(
        <li
          key="last"
          className="last numb"
          onClick={() => onPageChange(totalPages)}
        >
          <span>{totalPages}</span>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <ul>
        {currentPage > 1 && (
          <li className="btn prev" onClick={() => onPageChange(currentPage - 1)}>
            <span className="flex items-center gap-2">
              <ChevronLeft /> Prev
            </span>
          </li>
        )}

        {renderPageNumbers()}

        {currentPage < totalPages && (
          <li className="btn next" onClick={() => onPageChange(currentPage + 1)}>
            <span className="flex items-center gap-2">
              Next <ChevronRight />
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default memo(Pagination);