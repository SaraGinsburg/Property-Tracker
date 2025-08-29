'use client';
import Link from 'next/link';

const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null; // No need to show pagination if only one page
  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {page > 1 && (
        <Link
          href={`/properties?page=${page - 1}&pageSize=${pageSize}`}
          className='mr-2 px-2 py-1 border border-customGray rounded'>
          Previous
        </Link>
      )}

      <span className='mx-2'>
        page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link
          href={`/properties?page=${page + 1}&pageSize=${pageSize}`}
          className={`ml-2 px-2 py-1 border border-customGray rounded ${
            page * pageSize >= totalItems ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
