import React, { useEffect, useReducer } from 'react';
import * as authActions from '../redux/user/authentication/authActions';
import ProductCard from '../components/ProductCard';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';


const reducer = (state, action) => {
  if (action.type === 'loading-product') {
    return {
      ...state,
      isLoadingProduct: true,
      productNotFound: false,
    };
  } else if (action.type === 'load-product-success') {
    return {
      ...state,
      isLoadingProduct: false,
      product: action.payload,
    };
  } else if (action.type === 'load-product-failure') {
    return {
      ...state,
      isLoadingProduct: false,
      productNotFound: true,
    };
  } else if (action.type === 'cancel') {
    let name = state.product.name;
    if (state.originalName) {
      name = state.originalName;
    }
    let description = state.product.description;
    if (state.originalDescription) {
        description = state.originalDescription;
    }
    let priceOnPack = state.product.priceOnPack;
    if (state.originalPriceOnPack) {
        priceOnPack = state.originalPriceOnPack;
    }
    let priceOnPiece = state.product.priceOnPiece;
    if (state.originalPriceOnPiece) {
        priceOnPiece = state.originalPriceOnPiece;
    }
    return {
      ...state,
      inEditMode: false,
      
      errors: {},
      product: {
        ...state.product,
        name,
        description,
        priceOnPack,
        priceOnPiece
      },
      originalName: undefined,
      originalDescription: undefined,
      originalPriceOnPack: undefined,
      originalPriceOnPiece: undefined
    };
  } else if (action.type === 'update-progress') {
    return {
      ...state,
      pendingUpdateCall: true,
    };
  } else if (action.type === 'update-success') {
    return {
      ...state,
      inEditMode: false,
      originalName: undefined,
      originalDescription: undefined,
      originalPriceOnPack: undefined,
      originalPriceOnPiece: undefined,
      pendingUpdateCall: false,
      product: {
        ...state.product,
        
      },
    };
  } else if (action.type === 'update-failure') {
    return {
      ...state,
      pendingUpdateCall: false,
      errors: action.payload,
    };
  } else if (action.type === 'update-name') {
    let originalName = state.originalName;
    if (!originalName) {
        originalName = state.product.originalName;
    }
    const errors = state.errors;
    errors.name = undefined;
    return {
      ...state,
      errors,
      originalName,
      product: {
        ...state.product,
        name: action.payload,
      },
    };
} else if (action.type === 'update-description') {
    let originalDescription = state.originalDescription;
    if (!originalDescription) {
        originalDescription = state.product.description;
    }
    const errors = state.errors;
    errors.description = undefined;
    return {
      ...state,
      errors,
      originalDescription,
      product: {
        ...state.product,
        description: action.payload,
      },
    };
} else if (action.type === 'update-priceOnPack') {
    let originalPriceOnPack = state.originalPriceOnPack;
    if (!originalPriceOnPack) {
        originalPriceOnPack = state.product.priceOnPack;
    }
    const errors = state.errors;
    errors.priceOnPack = undefined;
    return {
      ...state,
      errors,
      originalPriceOnPack,
      product: {
        ...state.product,
        priceOnPack: action.payload,
      },
    };
} else if (action.type === 'update-priceOnPiece') {
    let originalPriceOnPiece = state.originalPriceOnPiece;
    if (!originalPriceOnPiece) {
        originalPriceOnPiece = state.product.priceOnPiece;
    }
    const errors = state.errors;
    errors.priceOnPiece = undefined;
    return {
      ...state,
      errors,
      originalPriceOnPiece,
      product: {
        ...state.product,
        priceOnPiece: action.payload,
      },
    };    
  } else if (action.type === 'edit-mode') {
    return {
      ...state,
      inEditMode: true,
    };
  }
  return state;
};

const ProductPage = props => {
  const [state, dispatch] = useReducer(reducer, {
    product: undefined,
    productNotFound: false,
    isLoadingProduct: false,
    inEditMode: false,
    originalame: undefined,
    originalDescription: undefined,
    originalPriceOnPack: undefined,
    originalPriceOnPiece: undefined,
    pendingUpdateCall: false,
    image: undefined,
    errors: {},
  });

  useEffect(() => {
    const loadProduct = () => {
      const id = props.match.params.productId;
      
      if (!id) {
        
        return;
      }
      dispatch({ type: 'loading-product' });
      authActions
        .getProduct(props.match.params.productId)
        .then((response) => {

          dispatch({ type: 'load-product-success', payload: response.data });
          console.log({payload: response.data})
        })
        
        .catch((error) => {
          dispatch({ type: 'load-product-failure' });
        });
    };
    loadProduct();
  }, [props.match.params.productId]);

  const onClickSave = () => {
    const productId = props.match.params.productId;
    
    const productUpdate = {
      id: productId,
      name: state.product.name,
      description: state.product.description,
      priceOnPack: state.product.priceOnPack,
      priceOnPiece: state.product.priceOnPiece
      
    };
    dispatch({ type: 'update-progress' });
    authActions
      .updateProduct(props.match.params.productId, productUpdate)
      .then((response) => {
        dispatch({ type: 'update-success' });
        const updatedProduct = { ...state.product };
        
        const action = {
          type: 'update-success',
          payload: updatedProduct,
        };
        props.dispatch(action);
      })
      .catch((error) => {
        let errors = {};
        if (error.response.data.validationErrors) {
          errors = error.response.data.validationErrors;
        }
        dispatch({ type: 'update-failure', payload: errors });
      });
  };

 

  let pageContent;
  if (state.isLoadingProduct) {
    pageContent = <Spinner />;
  } else if (state.productNotFound) {
    pageContent = (
      <div className="alert alert-danger text-center">
        <div className="alert-heading">
          <i className="fas fa-exclamation-triangle fa-3x" />
        </div>
        <h5>Product not found</h5>
      </div>
    );
  } else {
    const isEditable =
      props.product.id === props.match.params.id;
    pageContent = state.product && (
      <ProductCard
        product={state.product}
        isEditable={isEditable} 
        inEditMode={state.inEditMode}
        onClickEdit={() => dispatch({ type: 'edit-mode' })}
        onClickCancel={() => dispatch({ type: 'cancel' })}
        onClickSave={onClickSave}
        onChangeName={(event) =>
          dispatch({ type: 'update-name', payload: event.target.value })
        }
        onChangeDescription={(event) =>
            dispatch({ type: 'update-description', payload: event.target.value })
          }
          onChangePriceOnPack={(event) =>
            dispatch({ type: 'update-priceOnPack', payload: event.target.value })
          }  
          onChangePriceOnPiece={(event) =>
            dispatch({ type: 'update-priceOnPiece', payload: event.target.value })
          }  
        pendingUpdateCall={state.pendingUpdateCall}
        
        errors={state.errors}
      />
    );
  }
  return (
    <div >
      <div className="row">
        <div className="col">{pageContent}</div>
        
      </div>
      
    </div>
    
  );
  
};
ProductPage.defaultProps = {
  match: {
    params: {},
  },
};

const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps)(ProductPage);
