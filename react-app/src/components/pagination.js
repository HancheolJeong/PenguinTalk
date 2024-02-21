import React from 'react';

const Pagination = ({ page, onPageChange, onNextPage, onPreviousPage }) => {
    const handleNext = () => {
        if (onNextPage) {
            onNextPage(page + 1);
        } else {
            onPageChange(page + 1);
        }
    };

    /**
     * 이전 페이지
     */
    const handlePrevious = () => {
        if (onPreviousPage) {
            onPreviousPage(Math.max(1, page - 1));
        } else {
            onPageChange(Math.max(1, page - 1));
        }
    };

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={handlePrevious}>이전 페이지</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={handleNext}>다음 페이지</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
