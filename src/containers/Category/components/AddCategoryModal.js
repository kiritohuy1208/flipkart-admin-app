import React from "react";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/Ui/Input";
import NewModal from "../../../components/Ui/Modal";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    handleSaveAndClose,
    modalTitle,
    setparentCategoryId,
    parentCategoryId,
    categoryName,
    setCategoryName,
    categoryList,
    handleCategoryImage,
  } = props;
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      handleSaveAndClose={handleSaveAndClose}
      modalTitle={modalTitle}
    >
      <Row>
        <Col>
          <Input
            label={"Category name:"}
            placeholder={"Enter name category...."}
            value={categoryName}
            type={"text"}
            onChange={(e) => setCategoryName(e.target.value)}
            className = "form-control-sm "
           
          />
        </Col>
        <Col>
          <label style={{fontWeight:"bold"}}>Select category parent:</label>
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => setparentCategoryId(e.target.value)}
          >
            <option>Select category </option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            label={"  "}
            name="categoryImage"
            // defaultValue={categoryImage}
            type={"file"}
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </NewModal>
  );
};
export default AddCategoryModal;
