import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material"; 
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  // console.log("product", product) 
  // console.log("handle", handleAddToCart)
  return (
    <Card className="card">
      <CardMedia component="img" alt={product.name} image={product.image} />
      <CardContent>
        <Typography variant="h5" component="div"> 
          {product.name}
        </Typography>
        <Typography
          variant="h5"
          component="div"        >
          ${product.cost}
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions className="card-actions">
        <Button
          variant="contained"
          className="card-button"
          startIcon={<AddShoppingCartOutlined />}
          onClick={handleAddToCart}
          fullWidth
        >
          ADD TO CART 
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
