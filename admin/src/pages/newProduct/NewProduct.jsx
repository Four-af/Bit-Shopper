import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import Wrapper from "../../components/wrapper";
import { userRequest } from "../../requestMethods";

export default function NewProduct() {
  const initialValue = { title: "", desc: "", price: "",categories: "" , inStock: false}
  const [inputs, setInputs] = useState(initialValue);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAddProduct = async () => {
    const categories = inputs.categories.split(',').map((s) => s.trim())
    try{
      const res = await userRequest.post('/products', {
        title: inputs.title,
        desc: inputs.desc,
        categories,
        price: inputs.price,
        inStock: inputs.inStock,
        
      })
      setInputs(initialValue)
    }catch(err) {
      console.log(err)
    }
  }
  
  const handleClick = (e) => {
    // e.preventDefault();
    // const fileName = new Date().getTime() + file.name;
    // const storage = getStorage(app);
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
      //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //       default:
    //     }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       const product = { ...inputs, img: downloadURL, categories: cat };
    //       addProduct(product, dispatch);
    //     });
    //   }
    // );
  };

  return (
    <Wrapper>
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              name="title"
              value={inputs.title}
              type="text"
              placeholder="Apple Airpods"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              name="desc"
              type="text"
              value={inputs.desc}
              placeholder="description..."
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              name="price"
              value={inputs.price}
              type="number"
              placeholder="100"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Categories</label>
            <input
              type="text"
              name="categories"
              value={inputs.categories}
              placeholder="jeans,skirts"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Stock</label>
            <select name="inStock" value={inputs.inStock} onChange={handleChange}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <button onClick={handleAddProduct} className="addProductButton">
            Create
          </button>
        </form>
      </div>
    </Wrapper>
  );
}
