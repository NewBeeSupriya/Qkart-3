import {
  AddOutlined,
  RemoveOutlined, 
  ShoppingCart,
  ShoppingCartOutlined, 
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";  
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/** 
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  if(!cartData){
    return;
  }
  // console.log("data", productsData)

  const updatedCart= cartData.map((item) => {
    let obj = productsData.find(product => product._id === item.productId)
    return {
      ...obj,
      qty: item.qty
    }
  });

  // console.log("updated", updatedCart)
  return updatedCart;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  // console.log("fromcart", items)
  let value= 0;
  for(let i=0; i<items.length; i++){
    value += items[i].qty* items[i].cost;
  }
  // console.log("val", value);
  return value;
};


export const getTotalItems = (items = []) => {
  // console.log("Itemss", items);
  let total=0;
  for(let i=0; i<items.length; i++){
    total += items[i].qty;
  }
  return total;
};
// getTotalItems();
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */
const ItemQuantity = ({ value, handleAdd, handleDelete, isReadOnly }) => {
  if(isReadOnly){
    return <Box>Qty: {value}</Box>
  }
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 *
 */
const Cart = ({ products, items = [], handleQuantity, hasCheckoutButton=false, isReadOnly= false }) => {
  
  const token = localStorage.getItem('token');
  const history= useHistory();
  
  const routeToCheckout = () => {
    history.push('/checkout')
  }

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return ( 
    <>
      <Box className="cart">
        {items.map((item) => (
          <Box key={item._id}>
            {item.qty > 0 ? (
              <Box display="flex" alignItems="flex-start" padding="1rem">
                <Box className="image-container">
                  <img
                    // Add product image
                    src= {item.image}
                    // Add product name as alt eext
                    alt= {item.name}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="6rem"
                  paddingX="1rem"
                >
                  <div>{item.name}</div>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ItemQuantity
                    // Add required props by checking implementation
                    handleAdd ={async() => {
                      await handleQuantity(
                        token,
                        items,
                        products,
                        item._id,
                        item.qty+1
                      );
                    }}
                    handleDelete ={async() => {
                      await handleQuantity(
                        token,
                        items,
                        products,
                        item._id,
                        item.qty-1
                      );
                    }}
                    value= {item.qty}
                    isReadOnly={isReadOnly}
                    />
                    <Box padding="0.5rem" fontWeight="700">
                      ${item.cost}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
        ))}
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        { hasCheckoutButton ? (
        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={routeToCheckout}
          >
            Checkout
          </Button>
        </Box>): null }
      </Box>
      {!hasCheckoutButton ? (
        <Box className="cart">
          <Box justifyContent="space-between" display="flex" alignItems="center" padding="1rem" fontWeight="700" color="#3C3C3C"
            fontSize="1.5rem">
            Order Details
          </Box>
        <Box justifyContent="space-between" display="flex" alignItems="center" padding="1rem" color="#3C3C3C">
          <Box>Products</Box>
          <Box fontWeight="700" > {getTotalItems(items)} </Box>
        </Box><Box justifyContent="space-between" display="flex" alignItems="center" padding="1rem" color="#3C3C3C">
          <Box>Subtotal</Box>
          <Box fontWeight="700" >${getTotalCartValue(items)}</Box>
        </Box><Box justifyContent="space-between" display="flex" alignItems="center" padding="1rem" color="#3C3C3C">
          <Box>Shipping Charges </Box>
          <Box fontWeight="700">$0</Box>
        </Box><Box justifyContent="space-between" display="flex" alignItems="center" padding="1rem" fontSize="1rem" fontWeight="700">
          <Box>Total</Box>
          <Box fontWeight="700">${getTotalCartValue(items)}</Box>
        </Box>
      </Box> 
        
      ): null}
    </>
  );
};

export default Cart;
