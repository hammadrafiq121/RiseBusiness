import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const generatePagination = () => {
    const pagination = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(
          <Button
            key={i}
            variant=""
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          >
            {i}
          </Button>
        );
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pagination.push(
            <Button
              key={i}
              variant=""
              onClick={() => onPageChange(i)}
              className={`pagination-btn ${i === currentPage ? "active" : ""}`}
            >
              {i}
            </Button>
          );
        }
        pagination.push(
          <span key="end" variant="" disabled>
            {"..."}
          </span>
        );
        pagination.push(
          <Button
            key={totalPages}
            variant=""
            onClick={() => onPageChange(totalPages)}
            className={`pagination-btn ${
              totalPages === currentPage ? "active" : ""
            }`}
          >
            {totalPages}
          </Button>
        );
      } else if (currentPage >= totalPages - 3) {
        pagination.push(
          <Button
            key={1}
            variant=""
            onClick={() => onPageChange(1)}
            className={`pagination-btn ${1 === currentPage ? "active" : ""}`}
          >
            {1}
          </Button>
        );
        pagination.push(
          <span key="start" variant="" disabled>
            {"..."}
          </span>
        );
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pagination.push(
            <Button
              key={i}
              variant=""
              onClick={() => onPageChange(i)}
              className={`pagination-btn ${i === currentPage ? "active" : ""}`}
            >
              {i}
            </Button>
          );
        }
      } else {
        pagination.push(
          <Button
            key={1}
            variant=""
            onClick={() => onPageChange(1)}
            className={`pagination-btn ${1 === currentPage ? "active" : ""}`}
          >
            {1}
          </Button>
        );
        pagination.push(
          <span key="start" variant="" disabled>
            {"..."}
          </span>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pagination.push(
            <Button
              key={i}
              variant=""
              onClick={() => onPageChange(i)}
              className={`pagination-btn ${i === currentPage ? "active" : ""}`}
            >
              {i}
            </Button>
          );
        }
        pagination.push(
          <span key="end" variant="" disabled>
            {"..."}
          </span>
        );
        pagination.push(
          <Button
            key={totalPages}
            variant=""
            onClick={() => onPageChange(totalPages)}
            className={`pagination-btn ${
              totalPages === currentPage ? "active" : ""
            }`}
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pagination;
  };

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
        {generatePagination()}
        <Button
          className="pagination-btn next_btn"
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </Button>
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
                  {/* <option value={1}>1</option> */}
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
// import { Button, Form, Row, Col } from "react-bootstrap";

// const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   itemsPerPage,
//   onItemsPerPageChange,
// }) => {
//   const pageNumbers = [];

//   const generatePagination = () => {
//     const pagination = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         pagination.push(
//           <Button
//             key={i}
//             variant=""
//             onClick={() => onPageChange(i)}
//             className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//           >
//             {i}
//           </Button>
//         );
//       }
//     } else {
//       if (currentPage <= 4) {
//         for (let i = 1; i <= 5; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//         pagination.push(
//           <Button key="end" variant="" disabled>
//             {"..."}
//           </Button>
//         );
//         for (let i = totalPages - 1; i <= totalPages; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//       } else if (currentPage >= totalPages - 3) {
//         for (let i = 1; i <= 2; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//         pagination.push(
//           <Button key="start" variant="" disabled>
//             {"..."}
//           </Button>
//         );
//         for (let i = totalPages - 4; i <= totalPages; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//       } else {
//         pagination.push(
//           <Button key="start" variant="" disabled>
//             {"..."}
//           </Button>
//         );
//         for (let i = currentPage - 2; i <= currentPage + 2; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//         pagination.push(
//           <Button key="end" variant="" disabled>
//             {"..."}
//           </Button>
//         );
//       }
//     }

//     return pagination;
//   };

//   return (
//     <>
//       <div className="pagination-controls">
//         <Button
//           className="pagination-btn previous_btn"
//           variant="secondary"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           {"<"}
//         </Button>
//         {generatePagination()}
//         <Button
//           className="pagination-btn next_btn"
//           variant="secondary"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           {">"}
//         </Button>
//       </div>
//       <div>
//         <Form>
//           <Row>
//             <Col lg={10}></Col>
//             <Col lg={1}>
//               <Form.Label className="label">per page</Form.Label>
//             </Col>
//             <Col lg={1}>
//               <Form.Group controlId="userFilter" className="mb-2">
//                 <Form.Control
//                   className="col_7 Select-status"
//                   as="select"
//                   value={itemsPerPage}
//                   onChange={onItemsPerPageChange}
//                 >
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Pagination;

// import React from "react";
// import { Button, Form, Row, Col } from "react-bootstrap";

// const Pagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   itemsPerPage,
//   onItemsPerPageChange,
// }) => {
//   const pageNumbers = [];

//   const generatePagination = () => {
//     const pagination = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         pagination.push(
//           <Button
//             key={i}
//             variant=""
//             onClick={() => onPageChange(i)}
//             className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//           >
//             {i}
//           </Button>
//         );
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 5; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//         pagination.push(
//           <Button key="end" variant="" disabled>
//             {"..."}
//           </Button>
//         );
//         for (let i = totalPages - 1; i <= totalPages; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//       } else if (currentPage >= totalPages - 2) {
//         for (let i = 1; i <= 2; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//         pagination.push(
//           <Button key="start" variant="" disabled>
//             {"..."}
//           </Button>
//         );
//         for (let i = totalPages - 4; i <= totalPages; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//       } else {
//         for (let i = 1; i <= 2; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//         pagination.push(
//           <Button key="start" variant="" disabled>
//             {"..."}
//           </Button>
//         );
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//         pagination.push(
//           <Button key="end" variant="" disabled>
//             {"..."}
//           </Button>
//         );
//         for (let i = totalPages - 1; i <= totalPages; i++) {
//           pagination.push(
//             <Button
//               key={i}
//               variant=""
//               onClick={() => onPageChange(i)}
//               className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             >
//               {i}
//             </Button>
//           );
//         }
//       }
//     }

//     return pagination;
//   };

//   return (
//     <>
//       <div className="pagination-controls">
//         <Button
//           className="pagination-btn previous_btn"
//           variant="secondary"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           {"<"}
//         </Button>
//         {generatePagination()}
//         <Button
//           className="pagination-btn next_btn"
//           variant="secondary"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           {">"}
//         </Button>
//       </div>
//       <div>
//         <Form>
//           <Row>
//             <Col lg={10}></Col>
//             <Col lg={1}>
//               <Form.Label className="label">per page</Form.Label>
//             </Col>
//             <Col lg={1}>
//               <Form.Group controlId="userFilter" className="mb-2">
//                 <Form.Control
//                   className="col_7 Select-status"
//                   as="select"
//                   value={itemsPerPage}
//                   onChange={onItemsPerPageChange}
//                 >
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Pagination;

// import React from "react";
// import { Button, Form, Row, Col } from "react-bootstrap";

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

//   return (
//     <>
//       <div className="pagination-controls">
//         <Button
//           className="pagination-btn previous_btn"
//           variant="secondary"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           {"<"}
//         </Button>
//         {pageNumbers.map((number) => (
//           <Button
//             key={number}
//             variant=""
//             onClick={() => onPageChange(number)}
//             className={`pagination-btn ${
//               number === currentPage ? "active" : ""
//             }`}
//           >
//             {number}
//           </Button>
//         ))}
//         <Button
//           className="pagination-btn previous_btn"
//           variant="secondary"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           {">"}
//         </Button>
//       </div>
//       <div>
//         <Form>
//           <Row>
//             <Col lg={10}></Col>
//             <Col lg={1}>
//               <Form.Label className="label">per page</Form.Label>
//             </Col>
//             <Col lg={1}>
//               <Form.Group controlId="userFilter" className="mb-2">
//                 <Form.Control
//                   className="col_7 Select-status"
//                   as="select"
//                   value={itemsPerPage}
//                   onChange={onItemsPerPageChange}
//                 >
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Pagination;
