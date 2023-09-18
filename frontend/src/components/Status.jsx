import React, { useEffect, useState } from "react";
import { Table, Container, Form } from "react-bootstrap";
import EditStatusModal from "./EditStatusModal";
import statusApi from "../services/statusApi";
import { useSelector, useDispatch } from "react-redux";
import { setsStatuses } from "../app/reducers/statusSlice.js";
import AddStatusModal from "./AddStatusModal";
import DeleteStatus from "./DeleteStatus";

const Status = () => {
  // const [statusOptions, setStatusOptions] = useState([]);
  const { statuses } = useSelector((state) => state.statuses);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchStatuses() {
      await dispatch(setsStatuses(await statusApi.getAllStatus()));
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
