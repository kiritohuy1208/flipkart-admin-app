import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Input from '../../../components/Ui/Input';
import NewModal from "../../../components/Ui/Modal";

const UpdateCategoryModal = (props) => {
    const {
        show,
        handleClose,
        handleSaveAndClose,
        modalTitle,
        size,
        expandedArray,
        handleCategoryInput,
        checkedArray,
        // categoryList,
        createCategoryList,
        category,
    } = props
    console.log(checkedArray)
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        handleSaveAndClose={handleSaveAndClose}
        modalTitle={modalTitle}
        size={size}
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  placeholder={"Enter name category...."}
                  value={item.name}
                  type={"text"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>Select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select 
                  className="form-control"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        <h6>Checked Categories</h6>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  placeholder={"Enter name category...."}
                  value={item.name}
                  type={"text"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>Select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select 
                      className="form-control"
                      value={item.type}
                      onChange={(e) =>
                        handleCategoryInput(
                          "type",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        {/* <Input
          label={"  "}
          name="categoryImage"
          defaultValue={categoryImage}
          type={"file"}
          onChange={handleCategoryImage}
        /> */}
      </NewModal>
    );
  }
export default UpdateCategoryModal