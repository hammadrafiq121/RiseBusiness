import React from "react";
import { Trash } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import { deleteProduct } from "../app/reducers/productSlice.js";
import productApi from "../services/productApi";
import { useDispatch } from "react-redux";

const DeleteProduct = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await productApi.deleteProduct(product._id);
    await dispatch(deleteProduct(product._id));
  };

  return (
    <Button variant="link" className="symbol-button" onClick={handleDelete}>
      <Trash />
    </Button>
  );
};

export default DeleteProduct;
