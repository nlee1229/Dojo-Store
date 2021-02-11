import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{backgroundColor:"#272b30", width: "100%", paddingTop:"200px"}}>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Coding Dojo</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
