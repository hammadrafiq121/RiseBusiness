import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import EditStatusModal from "./EditStatusModal";
import AddStatusModal from "./AddStatusModal";
// import DeleteStatus from "./DeleteStatus";
import {
  getAllStatus,
  reset as resetStatus,
} from "../app/reducers/statusSlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetUsers } from "../app/reducers/userSlice.js";

const Status = () => {
  const dispatch = useDispatch();
  const { statuses } = useSelector((state) => state.statuses);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(resetCustomer());
      await dispatch(resetUsers());
      await dispatch(resetProduct());
      await dispatch(resetStatus());

      await dispatch(getAllStatus());
    };
    fetchData();
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
