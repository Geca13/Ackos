import axios from 'axios'

export const getProduct = (id) => {
    
    return axios.get(`/auth/product/${id}`);
  };

  export const updateProduct = (id, product) => {
    return axios.post(`/auth/my-profile/${id}`, product);
  };