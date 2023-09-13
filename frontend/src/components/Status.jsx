import React, { useEffect, useState } from "react";
import { Table, Container, Form } from "react-bootstrap";
import EditStatusModal from "./EditStatusModal";

const Status = () => {
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    // Fetch statuses from your API
    async function fetchStatuses() {
      try {
        const response = await fetch("http://localhost:3000/api/statuses/all");
        const data = await response.json();
        setStatusOptions(data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    }
    fetchStatuses();
  }, []);

  const statuses = statusOptions.map((status) => (
    <tr key={status._id} className="atim">
      <td>
        {status.status} <EditStatusModal status={status} />
      </td>
    </tr>
  ));

  return (
    <div>
      <section className="tab">
        <Container className="tab_div1">
          <Table style={{ width: "15%" }} className="user_list">
            <thead>
              <tr className="user_col_name">
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="tbody">{statuses}</tbody>
          </Table>
        </Container>
      </section>
    </div>
  );
};

export default Status;
