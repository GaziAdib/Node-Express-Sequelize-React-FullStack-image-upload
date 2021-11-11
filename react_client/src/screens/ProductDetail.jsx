import React, { useEffect, useState } from 'react'
import {Card, Button, Container, Form, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'


const ProductDetail = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [productDescription, setProductDescription] = useState('')
    const [published, setPublished] = useState(true)
    const [productImage, setProductImage] = useState('')


    // review rating  description
    const [reviews, setReviews] = useState([])
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')


    useEffect(() => {

        const getSingleProductData = async () => {
            const { data } = await axios.get(`/api/products/getProductReviews/${id}`)
            console.log(data)

            setTitle(data.title)
            setPrice(data.price)
            setProductDescription(data.description)
            setPublished(data.published)
            setProductImage(data.image)

            // for reviews
            setReviews(data.review)


        }
        getSingleProductData()

    },[id])



    // handling Delete
    const handleDelete = async (id) => {
        await axios.delete(`/api/products/${id}`)
        history.push('/products')
    }

    // to add review

    const addReviewHandler = async (e) => {

        e.preventDefault()

        let review = {
            product_id: id,
            rating: rating,
            description: description
        }

        await axios.post(`/api/products/addReview/${id}`, review)

        history.push('/products')
    }



    

    return (
        <>

        <Container className="mt-10 p-4">
        <h1 className="text-center">Detail Product</h1>
        <hr />

        <Row>
            <Col md={8} lg={8} sm={8}>
                <Card className='shadow-lg m-3 p-2 rounded'>
                        <Card.Img src={`http://localhost:3000/${productImage}`} fluid />
                        <Card.Body>
                            <Card.Title>Title: {title}</Card.Title>
                            <Card.Title className="text-success">Price: ${price}</Card.Title>
                            <Card.Text>
                                Description: {productDescription}
                            </Card.Text>
                            <Card.Text>
                                Published: {published ? (<small>True</small>) : (<small>false</small>)}
                            </Card.Text>
                        <br />

                    
                            <Link to={`/product/edit/${id}`}>
                                <Button>Edit</Button>
                            </Link>
                            
                            <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button> 
                        
                    </Card.Body>        
                </Card>
            </Col>


                <Col md={4} lg={4} sm={4}>

                    <h2 className='text-center'>Add Review</h2>
                    <hr />

                        <Form onSubmit={addReviewHandler}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    type="number"
                                />
                            </Form.Group>

                        

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                    />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Add Review
                            </Button>
                        </Form>

                         <br />

                        <h5>Product Reviews</h5>
                        <hr />

                        {reviews.length > 0 ? (
                            reviews.map(review => {
                                return <p key={review.id}>Rating: {review.rating} <br /> {review.description}</p>
                            })
                        ): ( <p> No reviews for this product </p> )}

                        
                </Col>
        </Row>



                
        </Container>

       



        </>
    )
}

export default ProductDetail
