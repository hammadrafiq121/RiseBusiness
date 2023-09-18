import React, { useEffect, useState } from "react";
import { Table, Container, Form } from "react-bootstrap";
import EditProductModal from "./EditProductModal";
import productApi from "../services/productApi";
import { useSelector, useDispatch } from "react-redux";
import { setsProducts } from "../app/reducers/productSlice.js";
import AddProductModal from "./AddProductModal";
import DeleteProduct from "./DeleteProduct";

const Product = () => {
  // const [productOptions, setProductOptions] = useState([]);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      await dispatch(setsProducts(await productApi.getProducts()));
      // setProductOptions(data);
    }
    fetchProducts();
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
          <Table style={{ width: "15%" }} className="user_list">
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
