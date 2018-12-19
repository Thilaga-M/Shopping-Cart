import React from 'react';
import PropTypes from "prop-types";
import ReactModalLogin from 'react-modal-login';
 



import Thumb from '../Thumb';
import util from '../../util';


const Product = (props) => {
  const product = props.product;

  product.quantity = 1;

  let formattedPrice = util.formatPrice(product.price, product.currencyId);
  
  let productInstallment;


 const constructor=(props) =>{
 }
    state = {
      showModal: false,
      loading: false,
      error: null
    };
 

 
 const openModal=()=> {
    this.setState({
      showModal: true,
    });
  }
 
 const closeModal=()=> {
    this.setState({
      showModal: false,
      error: null
    });
  }
  
 const onLoginSuccess=(method, response)=> {
    console.log('logged successfully with ' + method);
  }
 
 const onLoginFail=(method, response)=> {
    console.log('logging failed with ' + method);
    this.setState({
      error: response
    })
  }
 
 const startLoading=()=> {
    this.setState({
      loading: true
    })
  }
 
 const finishLoading=()=> {
    this.setState({
      loading: false
    })
  }
 
 const afterTabsChange=()=> {
    this.setState({
      error: null
    });
  }
  
  if(!!product.installments) {
    const installmentPrice = (product.price / product.installments);

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span><b> {product.currencyFormat} {util.formatPrice(installmentPrice, product.currencyId)}</b>
      </div>
    );
  }

  return (
    <div className="shelf-item" data-sku={product.sku}>
      {product.isFreeShipping && 
        <div ></div>
      }
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../static/products/${product.sku}_1.jpg`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val"><small>{product.currencyFormat}</small>
          <b>
            {formattedPrice.substr(0, formattedPrice.length - 3)}
          </b>
          <span>
            {formattedPrice.substr(formattedPrice.length - 3, 3)}
          </span>
        </div>
        {productInstallment}
      </div>


<div>
  <button
    onClick={openModal}
  >
    Open Modal
  </button>

  <ReactModalLogin
    visible={this.state.showModal}
    onCloseModal={closeModal}
    loading={this.state.loading}
    error={this.state.error}
    tabs={{
      afterChange:afterTabsChange
    }}
    loginError={{
      label: "Couldn't sign in, please try again."
    }}
    registerError={{
      label: "Couldn't sign up, please try again."
    }}
    startLoading={startLoading}
    finishLoading={finishLoading}
  />
</div>
    <div onClick={() => props.addProduct(product)} className="shelf-item__buy-btn">Add to cart</div>
    </div>
  );
}


Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default Product;