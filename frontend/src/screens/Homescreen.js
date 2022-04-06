import React,{ useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch,useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import Message from '../components/Message';
import { listProducts } from '../store/actions/productListActions';
const Homescreen = ({match}) => {
    const keyword = match.params.keyword
    // const [products, setProducts] = useState([]);
    // useEffect(()=>{
    //         const fetchProducts = async () => {
    //             const {data} = await axios.get('/api/products')
    //             setProducts(data);
    //         }
    //         fetchProducts();
    //     },[]);
    const dispatch = useDispatch();
    const productList = useSelector((state)=>state.productList);
    const { loading,error,products } = productList;


    useEffect(()=>{
       dispatch(listProducts(keyword)) 
    },[dispatch,keyword])

    let execproduct = (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={6} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
    );
    return(
            <Container>
                <h1 style={{marginTop:'1rem'}}>Latest Products</h1>
                {loading?<Spinner />:error?<Message variant="danger">{error}</Message>:execproduct}  
            </Container>
    );
}

export default Homescreen;