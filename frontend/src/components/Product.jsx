import React, { useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import EditProductModal from "./EditProductModal";
import { useSelector, useDispatch } from "react-redux";
import AddProductModal from "./AddProductModal";
// import DeleteProduct from "./DeleteProduct";
import {
  getProducts,
  reset as resetProduct,
} from "../app/reducers/productSlice.js";
import { reset as resetCustomer } from "../app/reducers/customerSlice.js";
import { reset as resetStatus } from "../app/reducers/statusSlice.js";
import { reset as resetUsers } from "../app/reducers/userSlice.js";

const Product = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(resetCustomer());
      await dispatch(resetUsers());
      await dispatch(resetProduct());
      await dispatch(resetStatus());

      await dispatch(getProducts());
    };
    fetchData();
  }, []);

  const allProduct = products.map((product) => (
    <tr key={product._id} className="atim">
      <td>
        {product.product}
        <EditProductModal product={product} />{" "}
        {/* <DeleteProduct className="tdd" product={product} /> */}
      </td>
    </tr>
  ));

  return (
    <div>
      <section className="tab">
        <Container className="tab_div1">
          <Table style={{ width: "20%" }} className="user_list">
            <thead>
              <tr className="user_col_name">
                <th>Product</th>
              </tr>
            </thead>
            <tbody className="tbody">{allProduct}</tbody>
            <tfoot>
              <AddProductModal />
            </tfoot>
          </Table>
        </Container>
      </section>
    </div>
  );
};

export default Product;
