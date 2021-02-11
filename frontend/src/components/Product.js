import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    // <container  className="flex-container" style={{display: "flex", height:"20rem", width:"100%"}}>
    //   <div id="wrapper" className="flex-item" style={{height:"20rem"}}>
    //     <div style={{marginRight:"75px"}}>
    //       <Link to={`/product/${product._id}`}>
    //         <img src={product.image} style={{width: "200px", height:"350px"}} />
    //       </Link>
    //       <strong>{product.name}</strong>
    //     </div>
    //   </div>
    // </container>


    <Card className='my-3 p-3 rounded' style={{height:"450px"}}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <h2>{product.name}</h2>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
