import React from 'react';
import PropTypes from "prop-types";
import ReactModalLogin from 'react-modal-login';

import ReactSignupLoginComponent from 'react-signup-login-component';
import Popup from "reactjs-popup";


import Thumb from '../Thumb';
import util from '../../util';


class Product extends React.Component {
     state = {
      error_status:false,
      valid_status:false,
      emailid:'',
      username:'',
      loggedIn:0,
      auth_details: []
      
    };

componentDidMount(){
const that = this;
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(function(json){
    that.setState({ auth_details: json});
  });     
}


handleChangeEmail = (e) =>{ 
    this.setState({
      emailid: e.target.value
    });
  }
handleChangeUsername = (e) =>{ 
    this.setState({
      username: e.target.value
    });
  }




onsubmit(){
    const auth = this.state.auth_details;
    const username = this.state.username;
    const email = this.state.emailid;
    
      var foundUsername = auth.some(function (el) {
      return el.username.toUpperCase() === username.toUpperCase();
        });
        var foundEmail = auth.some(function (el) {
          return el.email.toUpperCase() === email.toUpperCase();
        });

      if (foundUsername && foundEmail) 
      { 
       this.setState({loggedIn:1});
       
       const product = this.props.product;
       this.props.addProduct(product);
        alert("Successfully Logged in....Let's Enjoy the shopping Cart!...");

      }else
      {
        alert("Please Enter the Valid Authentications!...");
      }
  
   
   
       }
  
render(){
  console.log("status",this.state.loggedIn)
  let {
      emailid,
      username
         } = this.state;

  let loginButton;
  debugger
  var isLoggedIn = this.state.loggedIn;
   if (isLoggedIn == 1) {
      loginButton = <button className="shelf-item__buy-btn btn-padding" onClick={() => this.props.addProduct(product)} >Add to Cart</button>;
    } else {
      loginButton = <Popup trigger={<div  className="shelf-item__buy-btn" >Add to cart</div>} position="right center">
      <div>
         <div className="RML-login-modal-form">
            <div className="RML-form-group">
               <label htmlFor="username">Username</label>
               <input type="username" className="RML-form-control" id="username" name="username" placeholder="Username"
                  onChange={this.handleChangeUsername.bind(this)} 
                  value={this.state.username}/>
            </div>
            <div className="RML-form-group">
               <label htmlFor="email">Email</label>
               <input type="email" className="RML-form-control" id="email" name="email" placeholder="Email" value={this.state.emailid}
                  onChange={this.handleChangeEmail.bind(this)}/>
            </div>
            <button className="shelf-item__buy-btn btn-padding" id="submit" onClick={this.onsubmit.bind(this)} >Sign in To Add Cart</button>
            
            <div className="clearfix"></div>
         </div>
      </div>
      </Popup>;
    }
  const product = this.props.product;

  product.quantity = 1;

  let formattedPrice = util.formatPrice(product.price, product.currencyId);
  
  let productInstallment;

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
      
      <div value={isLoggedIn}>{loginButton}</div>
   </div>
</div>
);
}

 
}


Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default Product;




