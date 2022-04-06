import React , { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col,Row,Image,ListGroup,Card,Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Spinner from '../Spinner/Spinner';
import Message from '../components/Message';
import { listProductsDetails, createProductReview } from '../store/actions/productListActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../store/actions/actionTypes';
const Product = ({history,match}) => {
    // const product = products.find((p)=> p._id===match.params.id);
    // const [product, setProduct] = useState([]);
    // useEffect(()=>{
    //         const fetchProduct = async () => {
    //             const {data} = await axios.get(`/api/products/${match.params.id}`)
    //             setProduct(data);
    //         }
    //         fetchProduct();
    //     },[match]);
    const [qty,setQty] = useState();
    const [rating,setRating] = useState();
    const [comment,setComment] = useState();

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const {loading,error,product} = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReview = useSelector(state => state.productReview);
    const {error:errorReview,success:successReview} = productReview;


    useEffect(()=>{
        if(successReview){
            alert('Review Submitted !!!');
            setRating(0);
            setComment('');
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET});
        }
        dispatch(listProductsDetails(match.params.id));
    },[dispatch,match,successReview]);
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}/qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProductReview( product._id,{rating,comment}));
    }

    let prod = (
        <>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Price: ${product.price}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price: </Col>
                                <Col>${product.price}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status: </Col>
                                <Col>{product.countInStock>0?"In Stock":"Out of Stock"}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty : </Col>
                                <Col>
                                    <Form.Control as='select' value={qty} onChange={(e)=>{setQty(e.target.value)}} >
                                        {[...Array(product.countInStock).keys()].map(x=>(
                                            <option key={x+1} value={x+1} >
                                                {x+1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Button type="button" onClick={addToCartHandler} className="btn-block" disabled={product.countInStock===0}>Add to Cart</Button>
                            </Row>
                        </ListGroup.Item>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message variant='success'>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map((review)=>(
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Review </h2>
                            {errorReview && <Message variant='danger'>{errorReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1- Not Satisfied</option>
                                            <option value='2'>2- Fair</option>
                                            <option value='3'>3- Good</option>
                                            <option value='4'>4- Satisfied</option>
                                            <option value='5'>5- Completely Satisfied</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3'
                                            value={comment}
                                            onChange={(e)=>setComment(e.target.value)}
                                        ></Form.Control>
                                        <Button type='submit' variant='primary'>Submit</Button>
                                    </Form.Group>
                                </Form>
                            ):(
                                <Message>
                                    Please <Link to='/login'>Sign In</Link> to write a review.....
                                </Message>
                            )
                                
                        }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
    
    return(
        <Container>
            <Link style={{border:'1px solid black'}} to='/' className="btn btn-light my-3"> Home </Link>
            {loading?<Spinner />:error?<Message variant='danger'>{error}</Message>:prod}
        </Container>
    );
}

export default Product;