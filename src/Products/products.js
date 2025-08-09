import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Products() {
    var [products, setProducts] = useState([]);

    function handleHeartClick(data) {
        console.log(data);
        console.log("Heart clicked");

        let tempData = products.map(product => {
            if (product.id == data.id) {
                if (data.heart == false) {
                    data.heart = true;
                    console.log("Added to favorites");
                } else {
                    data.heart = false;
                    console.log("Removed from favorites");
                }
            }
            return product; // keep product in new array
        });

        setProducts(tempData);
    } // <-- this was missing

    useEffect(() => {
        async function getProducts() {
            try {
                let ApiRespose = await axios.get('https://dummyjson.com/products');
                let data = ApiRespose.data.products;
                data.map(heartKey => {
                    heartKey.heart = false;
                });
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, []);

    return (
        <div className='container'>
            <div className='row text'>
                <div className='col text-center mt-5'>
                    <h1>Products</h1>
                </div>
            </div>

            <div className='row'>
                {products.map(product => (
                    <div className='col-3' key={product.id}>
                        <div className='card mt-5 mb-5'>
                            <div className='card-header'>
                                <i
                                    onClick={() => handleHeartClick(product)}
                                    className={product.heart ? 'bi bi-heart-fill' : 'bi bi-heart'}
                                >
                                </i>
                                <img src={product.images[0]} className="card-img-top" alt="..." />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="btn btn-warning card-text d-grid">Price: {product.price}</p>
                                <p className="card-text btn btn-info d-grid">Rating: {product.rating} </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
