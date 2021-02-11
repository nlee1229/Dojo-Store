import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
      <Carousel>
        <Carousel.Item interval={6000}>
            <img
                className="d-block w-100"
                src="/images/Retail.jpg"
                alt="First slide"
                style={{height: "auto"}}
            />
            <Carousel.Caption>
                <h3>WELCOME THE THE CODING DOJO MERCH STORE!</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={6000}>
            <img
                className="d-block w-100"
                src="/images/Retail.jpg"
                alt="Third slide"
                style={{height: "auto"}}
            />
            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={6000}>
            <img
                className="d-block w-100"
                src="/images/Retail.jpg"
                alt="Third slide"
                style={{height: "auto"}}
            />
            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>

  )
}
export default ProductCarousel
