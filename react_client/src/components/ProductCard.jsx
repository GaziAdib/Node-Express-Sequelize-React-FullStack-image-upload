import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <>

            <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '18rem' }}>
                <Card.Img src={product.image} />
                <Card.Body>
                    <Card.Title>Title: {product.title}</Card.Title>
                    <Card.Title>Price: ${product.price}</Card.Title>
                    <Card.Text>
                        Description: {product.description.slice(0,10)}...
                    </Card.Text>
                 
                    <Link to={`product/${product.id}`}>
                        <Button>Detail</Button>
                    </Link>
                </Card.Body>

                
               
            </Card>
       
           
        </>
    )
}

export default ProductCard
