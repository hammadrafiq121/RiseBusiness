import React, { useEffect, useState } from "react";
import { Table, Container, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllStatus } from "../app/reducers/statusSlice.js";
import EditStatusModal from "./EditStatusModal";
import AddStatusModal from "./AddStatusModal";
import DeleteStatus from "./DeleteStatus";

const Status = () => {
  // const [statusOptions, setStatusOptions] = useState([]);
  const dispatch = useDispatch();
  const { statuses } = useSelector((state) => state.statuses);

  useEffect(() => {
    async function fetchStatuses() {
      await dispatch(getAllStatus());
      // setStatusOptions(data);
    }
    fetchStatuses();
  }, []);

  const allStatus = statuses.map((status) => (
    <tr key={status._id} className="atim">
      <td>
        {status.status} <EditStatusModal status={status} />{" "}
        {/* <DeleteStatus className="tdd" status={status} /> */}
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
            <tbody className="tbody">{allStatus}</tbody>
            <tfoot>
              <AddStatusModal />
            </tfoot>
          </Table>
        </Container>
      </section>
    </div>
  );
};

export default Status;
