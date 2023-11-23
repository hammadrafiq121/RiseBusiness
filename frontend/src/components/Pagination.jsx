import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="pagination-controls">
        <Button
          className="pagination-btn previous_btn"
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </Button>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant=""
            onClick={() => onPageChange(number)}
            className={`pagination-btn ${
              number === currentPage ? "active" : ""
            }`}
          >
            {number}
          </Button>
        ))}
        <Button
          className="pagination-btn previous_btn"
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </Button>

        {/* <select value={itemsPerPage} onChange={onItemsPerPageChange}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select> */}
      </div>
      <div>
        <Form>
          <Row>
            <Col lg={10}></Col>
            <Col lg={1}>
              <Form.Label className="label">per page</Form.Label>
            </Col>
            <Col lg={1}>
              <Form.Group controlId="userFilter" className="mb-2">
                <Form.Control
                  className="col_7 Select-status"
                  as="select"
                  value={itemsPerPage}
                  onChange={onItemsPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Pagination;

// import React from "react";
// import { Button, ButtonGroup } from "react-bootstrap";

// const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   itemsPerPage,
//   onItemsPerPageChange,
// }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   const renderPaginationButtons = () => {
//     if (totalPages <= 10) {
//       return pageNumbers.map((number) => (
//         <Button
//           key={number}
//           variant=""
//           onClick={() => onPageChange(number)}
//           className={`pagination-btn ${number === currentPage ? "active" : ""}`}
//         >
//           {number}
//         </Button>
//       ));
//     } else {
//       if (currentPage <= 5) {
//         // Show first 5 pages, then dots, and the last page.
//         return [
//           ...pageNumbers.slice(0, 5),
//           <span key="ellipsis-right" className="pagination-ellipsis">
//             ...
//           </span>,
//           <Button
//             key={totalPages}
//             variant=""
//             onClick={() => onPageChange(totalPages)}
//             className={`pagination-btn ${
//               totalPages === currentPage ? "active" : ""
//             }`}
//           >
//             {totalPages}
//           </Button>,
//         ];
//       } else if (currentPage >= totalPages - 4) {
//         // Show the first page, dots, and the last 5 pages.
//         return [
//           <Button
//             key={1}
//             variant=""
//             onClick={() => onPageChange(1)}
//             className={`pagination-btn ${1 === currentPage ? "active" : ""}`}
//           >
//             1
//           </Button>,
//           <span key="ellipsis-left" className="pagination-ellipsis">
//             ...
//           </span>,
//           ...pageNumbers.slice(totalPages - 5, totalPages),
//         ];
//       } else {
//         // Show the first page, dots on both sides, and the middle 5 pages.
//         return [
//           <Button
//             key={1}
//             variant=""
//             onClick={() => onPageChange(1)}
//             className={`pagination-btn ${1 === currentPage ? "active" : ""}`}
//           >
//             1
//           </Button>,
//           <span key="ellipsis-left" className="pagination-ellipsis">
//             ...
//           </span>,
//           ...pageNumbers.slice(currentPage - 2, currentPage + 3),
//           <span key="ellipsis-right" className="pagination-ellipsis">
//             ...
//           </span>,
//           <Button
//             key={totalPages}
//             variant=""
//             onClick={() => onPageChange(totalPages)}
//             className={`pagination-btn ${
//               totalPages === currentPage ? "active" : ""
//             }`}
//           >
//             {totalPages}
//           </Button>,
//         ];
//       }
//     }
//   };

//   return (
//     <div className="pagination-controls">
//       <Button
//         className="pagination-btn previous_btn"
//         variant="secondary"
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         {"<"}
//       </Button>
//       <ButtonGroup>{renderPaginationButtons()}</ButtonGroup>
//       <Button
//         className="pagination-btn previous_btn"
//         variant="secondary"
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         {">"}
//       </Button>
//       <select value={itemsPerPage} onChange={onItemsPerPageChange}>
//         <option value={10}>10</option>
//         <option value={25}>25</option>
//         <option value={50}>50</option>
//         <option value={100}>100</option>
//       </select>
//     </div>
//   );
// };

// export default Pagination;
