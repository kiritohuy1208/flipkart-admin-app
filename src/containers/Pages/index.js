import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'

import createCategoryList from "../../helpers/linearCategories";
import { addNewPage } from "../../actions/page.action";

import { Button, Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../components/Ui/Input";
import NewModal from "../../components/Ui/Modal";

/**
 * @author
 * @function Page
 **/

const Page = (props) => {
  const dispatch = useDispatch()
  const category = useSelector(state => state.category)
  const page = useSelector(state => state.page)
  const [createModal, setCreateModal] = useState(false);

  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [desc, setDesc] = useState("")
  const [type, setType] = useState("")
  const [banners, setBanners] = useState([])
  const [products, setProducts] = useState([])
  // use effect
  useEffect(()=>{

    setCategories(createCategoryList(category.categories))
    
  },[category])
  useEffect(()=>{

    if(!page.loading){
      setCreateModal(false)
      setTitle('')
      setDesc('')
      setType('')
      setBanners([])
      setProducts([])
      setCategoryId('')
    }
    
  },[page])
  //------------- add new page---------------------------
  const onCategoryChange = (e) =>{
    setCategoryId(e.target.value)
    const categoryParent = categories.find((cat) => cat.value == e.target.value )
    setType(categoryParent.type)
  
  }
  const handleProductImages = (e) =>{
    let files = [];
    const fileList = e.target.files;
   
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
    setProducts([...products, ...files]);
  }
  const handleBannerImages = (e) =>{
    let files = [];
    const fileList = e.target.files;
   
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList[i]);
    }
     setBanners([...banners, ...files]);
   
  }
  const handleSaveAndClose = (e) => {
    e.preventDefault()
    if(title === ""){
      alert("Title is required")
      // setCreateModal(false)
      return
    }
    const form = new FormData()
    form.append('title',title)
    form.append('category',categoryId)
    form.append('description',desc)
    form.append('type', type)
    for(let pic of banners){
        form.append('banners',pic)
    }
    for(let pic of products){
      form.append('products',pic)
    }
  
    dispatch(addNewPage(form))
    .then(()=> setCreateModal(false))
   
  };
  const renderCreatePageModal = () => {
    return (
    <NewModal
        show={createModal}
        modalTitle="Create new page"
        handleClose={() => setCreateModal(false)}
        handleSaveAndClose={handleSaveAndClose}
      >
     <Container>
        <Row>
          <Col>
            <Input
              value={title}
              label= "Title Page"
              placeholder="Enter Page Title..."
              onChange={(e) => setTitle(e.target.value)}
              className="form-control-sm"
            />
          </Col>
        </Row>
        <Row>
          <Col>
          {/* <label style={{fontWeight:"bold"}}>Select category parent:</label> */}
           {/* <select
            style={{marginBottom: '10px'}}
            value={categoryId}
            onChange={onCategoryChange}
            className="form-control form-control-sm"
           >
                    <option>Select category </option>
                    {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                    ))}
           </select> */}
           <Input
            label ="Select category parent"
            type="select"
            value={categoryId}
            onChange={onCategoryChange}
            placeholder ="Select category parent"
            options={categories}
           />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={desc}
              label= "Description Page"
              placeholder="Enter description page..."
              onChange={(e) => setDesc(e.target.value)}
              className="form-control-sm"
            />
          </Col>
        </Row>
        <Row>
            <Col>
            <label style={{fontWeight:"bold"}}>Select images banner:</label>
            {
              banners.length > 0 ?
              banners.map((banner,index)=>
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              ) : null
            }
            <input
                className="form-control form-control-sm"
                name="banners"
                type="file"
                multiple="multiple"
                onChange={handleBannerImages}
            />
            </Col>
        </Row>
        <Row>
            <Col>
            <label style={{fontWeight:"bold",marginTop: '10px'}}>Select images product:</label>
            {
              products.length > 0 ?
              products.map((product,index)=>
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              ) : null
            }
            <input
                className="form-control form-control-sm"
                name="products"
                type="file"
                multiple="multiple"
                onChange={handleProductImages}
            />
            </Col>
        </Row>
      </Container>
    </NewModal>
    );
  };
  //-----------------------------||----------------------------
  return (
    <Layout sidebar>
      {
        page.loading ? <> <p>Creating page ... please wait</p> </>
        :
         <>
           <Button variant="success" onClick={() => setCreateModal(true)}>Create page</Button>
           {renderCreatePageModal()}
        </>
      }
   
    </Layout>
  );
};

export default Page;
