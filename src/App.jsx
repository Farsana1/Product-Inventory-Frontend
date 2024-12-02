import { useEffect, useState } from 'react';
import './App.css';
import { addApi, deleteApi, getApi, updateApi } from './services/allApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [named, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);
  const[deleteStatus,setDeleteStatus] = useState([])

  const pdt_details = { named, category, price, stock, quantity, description };

  const getProducts = async () => {
    try {
      const res = await getApi(); 
      setProducts(res.data); 
      console.log(res.data);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [deleteStatus]);

  const validate = (e) => {
    const { name, value } = e.target;
    if (name === 'named') setName(value);
    else if (name === 'category') setCategory(value);
    else if (name === 'price') setPrice(value);
    else if (name === 'stock') setStock(value);
    else if (name === 'quantity') setQuantity(value);
    else if (name === 'description') setDescription(value);
    else if(!named || !category || !price || !stock || !quantity || !description) alert('All fields required')
    else alert('Enter valid input');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addApi(pdt_details);
      console.log('Product added:', response.data);
      alert('Product successfully added!');

      // Clear the form
      setName('');
      setCategory('');
      setPrice('');
      setStock('');
      setQuantity('');
      setDescription('');

      // Refresh the product list
      getProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };
  const handleDelete = async(id) => {
    const result = await deleteApi(id)
    alert('Product successfully deleted!');
    console.log(result);
    if(result.status>=200 && result.status<300){
      setDeleteStatus(result)
      console.log(deleteStatus);
      
    }
  }
  const handleUpdate = async (id, product) => {
    // Populate the form with the product's current details for editing
    setName(product.named);
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
    setQuantity(product.quantity);
    setDescription(product.description);
  
    const updatedDetails = { named, category, price, stock, quantity, description };
    const response = await updateApi(id, updatedDetails);
    if (response.status >= 200 && response.status < 300) {
      alert('Product successfully updating!');
      getProducts(); 
      alert('Product successfully updated!');
    }
  };
  

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="text-light bg-dark d-flex justify-content-center align-items-center flex-column"
            style={{ height: '100vh', width: '100%' }}
          >
            <h2>Product Inventory</h2>
            <div className="mt-2 border p-3 shadow rounded">
              <form className="d-flex flex-column">
                <input
                  name="named"
                  type="text"
                  value={named}
                  placeholder="Name"
                  className="mb-3 text-light"
                  style={{ backgroundColor: 'transparent' }}
                  onChange={(e) => validate(e)}
                />
                <input
                  name="category"
                  type="text"
                  value={category}
                  placeholder="Category"
                  className="mb-3 text-light"
                  style={{ backgroundColor: 'transparent' }}
                  onChange={(e) => validate(e)}
                />
                <input
                  name="price"
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="mb-3 text-light"
                  style={{ backgroundColor: 'transparent' }}
                  onChange={(e) => validate(e)}
                />
                <input
                  name="stock"
                  type="number"
                  value={stock}
                  placeholder="Stock"
                  className="mb-3 text-light"
                  style={{ backgroundColor: 'transparent' }}
                  onChange={(e) => validate(e)}
                />
                <input
                  name="quantity"
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="mb-3 text-light"
                  style={{ backgroundColor: 'transparent' }}
                  onChange={(e) => validate(e)}
                />
                <textarea
                  name="description"
                  value={description}
                  placeholder="Description"
                  className="text-light"
                  style={{ backgroundColor: 'transparent' }}
                  onChange={(e) => validate(e)}
                ></textarea>
                <button className="btn btn-primary mt-5" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div> 
      <table className="table table-bordered bg-dark text-white p-3 d-flex justify-content-center flex-column align-items-center">
  <thead className="thead-dark ">
    <tr>
      <th className="p-3">Name</th>
      <th className="p-3">Category</th>
      <th className="p-3">Price</th>
      <th className="p-3">Stock</th>
      <th className="p-3">Quantity</th>
      <th className="p-3">Description</th>
      <th className="p-3">Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.length > 0 ? (
      products.map((product, index) => (
        <tr key={index}>
          <td className="p-3">{product.named}</td>
          <td className="p-3">{product.category}</td>
          <td className="p-3">{product.price}</td>
          <td className="p-3">{product.stock}</td>
          <td className="p-3">{product.quantity}</td>
          <td className="p-3">{product.description}</td>
          <td className="p-3">
            <button className='me-3 btn btn-danger' onClick={() => handleDelete(product?.id)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button onClick={() => handleUpdate(product?.id, product)} className="btn btn-warning ml-2">
              <FontAwesomeIcon icon={faPencil} />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7" className="text-center p-3">
          No products available
        </td>
      </tr>
    )}
  </tbody>
</table>

      </div>
    </>
  );
}

export default App;
