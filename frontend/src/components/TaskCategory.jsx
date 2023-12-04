import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import EditTaskCategoryModal from "./EditTaskCategoryModal";
import AddTaskCategoryModal from "./AddTaskCategoryModal";
// import DeleteTaskCategory from "./DeleteTaskCategory";

import {
  getTaskCategories,
  reset as resetTaskCategory,
} from "../app/reducers/taskCategorySlice.js";
import { reset as resetProduct } from "../app/reducers/productSlice.js";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetUsers } from "../app/reducers/userSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";

const TaskCategory = () => {
  const dispatch = useDispatch();
  const { taskCategories } = useSelector((state) => state.taskCategories);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(resetCustomer());
      await dispatch(resetUsers());
      await dispatch(resetProduct());
      await dispatch(resetStatus());
      await dispatch(resetTaskCategory());

      await dispatch(getTaskCategories());
    };
    fetchData();
  }, []);

  const allCategories = taskCategories.map((taskCategory) => (
    <tr key={taskCategory._id} className="atim">
      <td>
        {taskCategory.taskCategory}{" "}
        <EditTaskCategoryModal taskCategory={taskCategory} />{" "}
        {/* <DeleteTaskCategory className="tdd" taskCategory={taskCategory} /> */}
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
                <th>Task Category</th>
              </tr>
            </thead>
            <tbody className="tbody">{allCategories}</tbody>
            <tfoot>
              <AddTaskCategoryModal />
            </tfoot>
          </Table>
        </Container>
      </section>
    </div>
  );
};

export default TaskCategory;
