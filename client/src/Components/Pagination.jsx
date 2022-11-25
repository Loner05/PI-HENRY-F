import React from 'react';
import style from './StyleComponents/Pagination.module.css'
const Pagination = ({ cardsPerPage, totalCards, paginate }) => {
  const pageNumbers = [];
console.log(`soy pagenumber ${pageNumbers}`)
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }
    
  return (
    <nav className={style.Pagination_container}>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li onClick={() => paginate(number)} key={number}  >
                     <button className={style.Pagination_button}type="button">{number}</button> 
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

