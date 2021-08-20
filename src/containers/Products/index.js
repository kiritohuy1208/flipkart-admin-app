import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import Layout from "../../components/Layout";
import NewModal from "../../components/Ui/Modal";
import Input from "../../components/Ui/Input";

import { addProduct, deleteProductById } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const [show, setShow] = useState(false);
  // ---------Add new product----------------
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  //---------Product detail-----------------
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  //---------Action-------------------------
  const dispatch = useDispatch();
  const myCategoryList = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  useEffect(() => {
    if (!show) {
      setName("");
      setQuantity("");
      setPrice("");
      setDescription("");
      setCategory("");
      setProductPictures([]);
    }
  }, [show]);

  const handleSaveAndClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", category);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then(() => setShow(false));
  };
  // ------delete ProductById:
  const onDeleteProductById = (productId) => {
    const payload = {
      productId,
    };
    // console.log(payload);
    dispatch(deleteProductById(payload));
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //-------------------------begin--------------------------
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductPicture = (e) => {
    let files = [];
    const fileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    setProductPictures([...productPictures, ...files]);
  };
  //---------------------------End------------------------

  //------------------------Begin---------------------------
  const renderProducts = () => {
    return (
      <Table
        style={{ marginTop: "10px", fontSize: 12 }}
        striped
        bordered
        hover
        responsive="sm"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => {
                return (
                  <tr style={{ cursor: "pointer" }} key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.category.name}</td>
                    <td>
                      <button onClick={() => showProductDetailsModal(product)}>
                        info
                      </button>
                      <button onClick={() => onDeleteProductById(product._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };
  //-------------------------End--------------------------

  //--------------------------Begin-------------------------
  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        handleSaveAndClose={handleSaveAndClose}
        modalTitle={"Add new product"}
      >
        <Input
          label={"Product name:"}
          placeholder={"Enter name ...."}
          value={name}
          type={"text"}
          onChange={(e) => setName(e.target.value)}
        />
        <label style={{ fontWeight: "bold" }}> Category :</label>
        <select
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select parent category</option>
          {createCategoryList(myCategoryList.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <Input
          label={"Product quantity:"}
          placeholder={"Enter quantity ...."}
          value={quantity}
          type={"text"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label={"Product price:"}
          placeholder={"Enter price ...."}
          value={price}
          type={"text"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label style={{ fontWeight: "bold" }}> Description :</label>
        <textarea
          cols="55"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        ></textarea>
        {/* <Input
                      label={"Product description:"}
                      placeholder={"Enter description ...."}
                      value= {description}
                      type={"text"}
                      onChange={(e)=> setDescription(e.target.value) }
                  /> */}
        <label style={{ fontWeight: "bold" }}>
          {" "}
          Choose pictures for product :
        </label>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          multiple="multiple"
          name="productPicture"
          onChange={handleProductPicture}
        />
      </NewModal>
    );
  };
  //-------------------------End--------------------------

  //------------- Render details product------------------------
  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };
  const renderShowProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product details"}
        size={"lg"}
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p>{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p>{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p>{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((pic) => {
                return (
                  <div className="productImgCtn">
                    <img alt={`${pic.img}`} src={pic.img} />q
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };
  //----------------------------------------------------
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="ctn-category">
              <h3>Manage Products of Shop</h3>
              <Button fixed="top" variant="dark" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul></ul>
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderShowProductDetailsModal()}
    </Layout>
  );
};

export default Products;
