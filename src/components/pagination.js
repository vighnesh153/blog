import React from "react";
import { navigate } from "@reach/router";

const Pagination = ({ currentPage, totalPages, rootPath }) => {
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const showPreviousPage = previousPage > 0;
  const showNextPage = nextPage <= totalPages;

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      alert("Itna gawaar samajh rakha hai kya be mereko?");
      return;
    }
    navigate(rootPath + pageNumber).then();
  };

  return (
    <div style={styles.root}>
      <div style={styles.previousArrows}>
        <div style={{...styles.halfHorizontalSpace}}>
          <button style={styles.btn} disabled={!showPreviousPage} onClick={() => goToPage(1)}>
            {"<<<"}
          </button>
        </div>
        <div style={{...styles.halfHorizontalSpace}}>
          <button style={styles.btn} disabled={!showPreviousPage} onClick={() => goToPage(previousPage)}>
            {"<"}
          </button>
        </div>
      </div>
      <div style={styles.numbers}>
        <div style={styles.flexGrowOne}>
          <button style={styles.btn} disabled={!showPreviousPage} onClick={() => goToPage(previousPage)}>
            {showPreviousPage ? previousPage : "-"}
          </button>
        </div>
        <div style={styles.flexGrowOne}>
          <button style={styles.btn} onClick={() => goToPage(currentPage)}>
            {currentPage}
          </button>
        </div>
        <div style={styles.flexGrowOne}>
          <button style={styles.btn} disabled={!showNextPage} onClick={() => goToPage(nextPage)}>
            {showNextPage ? nextPage : "-"}
          </button>
        </div>
      </div>
      <div style={styles.nextArrows}>
        <div style={{...styles.halfHorizontalSpace}}>
          <button style={styles.btn} disabled={!showNextPage} onClick={() => goToPage(nextPage)}>
            {">"}
          </button>
        </div>
        <div style={{...styles.halfHorizontalSpace}}>
          <button style={styles.btn} disabled={!showNextPage} onClick={() => goToPage(totalPages)}>
            {">>>"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

const styles = {
  root: {
    width: "70%",
    height: "50px",
    margin: "0 auto",
    display: 'flex',
    backgroundColor: "white",
  },
  previousArrows: {
    position: 'relative',
    display: "flex",
    flexGrow: '1',
  },
  numbers: {
    position: 'relative',
    display: "flex",
    flexGrow: '3',
  },
  nextArrows: {
    position: 'relative',
    display: "flex",
    flexGrow: '1',
  },
  halfHorizontalSpace: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
  flexGrowOne: {
    flexGrow: "1",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
};
