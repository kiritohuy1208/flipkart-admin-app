import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  addCategory, 
  deleteCategoriesAction, 
  getAllCategory, 
  updatedCategories 
} from "../../actions";

import { Button, Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import NewModal from "../../components/Ui/Modal";
import CheckboxTree from "react-checkbox-tree";



import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "./style.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosTrash
 
} from "react-icons/io";

import{
  IoBrushSharp,
  IoAddCircle,
  
} from 'react-icons/io5'
import UpdateCategoryModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";

/**
 * @author
 * @function Category
 **/

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)

  const category = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const [categoryName, setCategoryName] = useState("")
  const [categoryImage, setCategoryImage] = useState("")
  const [parentCategoryId, setparentCategoryId] = useState("")

  // tree check box state
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])
  const [checkedArray, setCheckedArray] = useState([])
  const [expandedArray, setExpandedArray] = useState([])

  //  useEffect() chỉ gọi 1 lần khi render components (tương đương với componentDidMount)

  useEffect(() => {
   
      if(!category.loading){
        setShow(false)
        setCategoryName('')
        setCategoryImage('')
        setparentCategoryId('')
      }
   
  }, [category.loading])

  // -------------- Function handle-----------------------
  //-- Add new category -----
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSaveAndClose = () => {
    if(categoryName === ""){
      alert("Name is required")
      // setShow(false)
      return
    }
    // Create new form
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    setShow(false);
  }
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  }
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }
  //-----Edit category ---------------------------------
  const handleCloseEditCategory = () => setUpdateCategoryModal(false);

  const handleUpdateCategory = () => {
    // console.log(checked,expanded)
    updateStateCheckedAndExpandedCategories()
    setUpdateCategoryModal(true);
  }

  const updateStateCheckedAndExpandedCategories = () =>{
  const categories = createCategoryList(category.categories);  // get all category
  const checkedArray = [];
  const expandedArray = [];
  //get category has checked
  checked.length > 0 &&
    checked.forEach((categoryId, index) => {
      const category = categories.find(
        (category, _index) => categoryId === category.value
      );
      category && checkedArray.push(category);
    });

  // get category has expanded
  expanded.length > 0 &&
    expanded.forEach((categoryId, index) => {
      const category = categories.find(
        (category, _index) => categoryId === category.value
      );
      category && expandedArray.push(category);
    });
  setExpandedArray(expandedArray);
  setCheckedArray(checkedArray);
  }// => update state expandedArray and checkedArray: includes category has been expanded and checked
  
  // ý tưởng: state checkedArray chứa các categorty đã đc checked
  // khi thay đổi 1 category onchange callback function handleCategoryInput với các tham số
  // type: xđịnh input là checked hay expanded, value: giá trị thay đổi, index: vị trí của category đang thay đổi,
  // index này tương ứng với vị trí category đó trong arrayChecked.
  // key: property đã thay đổi trong tổng số property của category : name, parentId
  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };// => return update state expandedArray va checkedArray when change input

  const handleSaveAndCloseEditCategory = () => {
    const form = new FormData()
    expandedArray.forEach((item,index) =>{

      form.append('_id',item.value)
      form.append('name',item.name)
      form.append('parentId', item.parentId ? item.parentId : "")
      form.append('type',item.type)
    
    })
    checkedArray.forEach((item,index) =>{
      form.append('_id',item.value)
      form.append('name',item.name)
      form.append('parentId', item.parentId ? item.parentId : "")
      form.append('type',item.type)

    })
    dispatch(updatedCategories(form))
    
    setUpdateCategoryModal(false);
  };

  //--Function Delete Category----------------------------
  const handleDeleteCategory = () =>{

     updateStateCheckedAndExpandedCategories()
     setDeleteCategoryModal(true)
  }
  // onClick btn "Yes" of form confirm 
  const deleteCategories = () =>{
    // create 2 arrat  checkedIdArray & checkedIdArray with value  of element is _id
    const checkedIdArray  = checkedArray.map((item,index) => ({ _id: item.value }))
    const expandedIdArray = expandedArray.map((item,index) => ({ _id: item.value }))
    const idsArray = expandedIdArray.concat(checkedIdArray)
    if(checkedIdArray.length > 0){
      dispatch(deleteCategoriesAction(checkedIdArray))
      setDeleteCategoryModal(false)
    }
  
  }


  //------------------||| function render |||------------------------
  const renderCategories = (categoryList) => {
    let categories = [];
    for (let category of categoryList) {
      // can push jxs in array
      categories.push(
        {
          label: category.name,
          value: category._id,
          children:
            category.children.length > 0 && renderCategories(category.children),
        }
        // <li key={category.name}>
        //   {category.name}
        //   {category.children.length > 0 ? (
        //     <ul>{renderCategories(category.children)}</ul>
        //   ) : null}
        // </li>
      );
    }
    return categories;
  }

  const renderDeleteCategoryModal = () =>{
    return(
      <NewModal
        modalTitle="Confirm"
        show={deleteCategoryModal} 
        handleClose = {()=> setDeleteCategoryModal(false)} 
        buttons= {
          [
            {
              lable: 'No',
              color: 'primary',
              onClick: () =>{
                setDeleteCategoryModal(false)
              }
            },
            {
              lable: 'Yes',
              color: 'danger',
              onClick: deleteCategories
            }
          ]
        }
      >
        <h5>Expanded</h5>
       
          {
            expandedArray.map((item,index)=>
              <span key={index}>{item.name}</span>
            )
          }
       
        <h5>Checked</h5>
        {
          checkedArray.map((item,index)=>
            <span key={index}>{item.name}</span>
          )
        }
      </NewModal>
    )
  }
// -----------------------------||===||------------------------------
  const array = ['a', 'b','c']

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="ctn-category">
              <h3>Manage Category of Shop</h3>
           <div className="actionBtnContainer">
             {/* <span>Action: </span> */}
              <Button variant="success" onClick={handleShow}>
                <IoAddCircle className="icon-size"/> Add
              </Button>
              <Button variant="danger" onClick={() => handleDeleteCategory()}>
               <IoIosTrash  className="icon-size"/>  Delete
              </Button>
              <Button  variant="info" onClick={() => handleUpdateCategory()}>
                <IoBrushSharp  className="icon-size"/>  Edit
              </Button>
            </div>
            </div>
          </Col>
        </Row>
        <Row>
          {/* <Col md={12}>
                    <ul>{renderCategories(category.categories)}</ul>
                </Col> */}
          <CheckboxTree
            nodes={renderCategories(category.categories)}
            checked={checked}
            expanded={expanded}
            onCheck={(checked) => setChecked(checked)}
            onExpand={(expanded) => setExpanded(expanded)}
            icons={{
              check: <IoIosCheckbox />,
              uncheck: <IoIosCheckboxOutline />,
              halfCheck: <IoIosCheckboxOutline />,
              expandClose: <IoIosArrowDown />,
              expandOpen: <IoIosArrowForward />,
            }}
          />
        </Row>
      
      </Container>

      {/* Add new category */}
      <AddCategoryModal
          show={show}
          handleClose={handleClose}
          handleSaveAndClose={handleSaveAndClose}
          modalTitle={"Add new category"}
          setparentCategoryId = {setparentCategoryId}
          parentCategoryId  = {parentCategoryId}
          categoryName = {categoryName}
          setCategoryName = {setCategoryName}
          categoryList = {createCategoryList(category.categories)}
          handleCategoryImage ={handleCategoryImage}
      />

      {/* ---Edit category----- */}
      
      <UpdateCategoryModal
          show={updateCategoryModal}
          handleClose={handleCloseEditCategory}
          handleSaveAndClose={handleSaveAndCloseEditCategory}
          modalTitle={"Update category"}
          size="lg"
          expandedArray ={expandedArray}
          checkedArray = {checkedArray}
          handleCategoryInput = {handleCategoryInput}
          createCategoryList = {createCategoryList}
          category = {category}
        />
      {/* ---Delete category---- */}
      { renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
