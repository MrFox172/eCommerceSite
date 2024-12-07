const ProductPagination = ({ page, setPage, pageable }) => {

  const goToNextPage = (e) => {
    e.preventDefault();
    if (pageable.pageNumber === pageable.totalPages - 1) {
      return;
    }
    setPage(pageable.pageNumber + 1);
  };

  const goToPreviousPage = () => {
    e.preventDefault();
    if (pageable.pageNumber === 0) {
      return;
    }
    setPage(e, pageable.pageNumber - 1);
  };

  const goToPage = (e,page: number) => {
    e.preventDefault();
    setPage(page);
  };

  return (
    <>
      {pageable.totalPages > 1 && (
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={page === 0 ? "page-item disabled" : "page-item"}>
              <a className="page-link" href="#" onClick={goToPreviousPage}>
                Previous
              </a>
            </li>
            {Array.from(Array(pageable.totalPages).keys()).map((page) => (
              <>
                {pageable.pageNumber === page ? (
                  <li
                    className="page-item active"
                    aria-current="page"
                    key={page}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => goToPage(e,page)}
                    >
                      {page + 1}
                    </a>
                  </li>
                ) : (
                  <li className="page-item" key={page}>
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => goToPage(e,page)}
                    >
                      {page + 1}
                    </a>
                  </li>
                )}
              </>
            ))}
            <li className={page === pageable.totalPages - 1 ? "page-item disabled" : "page-item"}>
              <a className="page-link" href="#" onClick={goToNextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default ProductPagination;
