import React, { useEffect, useState } from 'react';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import './Purchase.css'

const Purchase = () => {
    
    
    const { user } = useAuth()
    const { id } = useParams()
    const [bike, setBike] = useState({})
    const history = useHistory()
    // const [status, set]
    useEffect(() => {
        // addToDb(aId)
        const url = `https://salty-scrubland-71202.herokuapp.com/bikes/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setBike(data)
                
            })
    }, [])
    
   

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        
        data.status = 'pending'
        data.purchase = bike;
        
        console.log(data)
        fetch('https://salty-scrubland-71202.herokuapp.com/purchase', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Order processed Successfully');
                    // clearTheCart();
                    reset();
                    history.push('/dashboard/myOrder')
                }
            })
       
    }
    return (


        <div>
            <Header></Header>
            <Container >
                <Row>
                    <Col className="my-5">
                    <Card>
                    <Card.Img variant="top" src={bike.img}  style={{objectFit:"cover",height:"350px"}} />
                    <Card.Body>
                        <Card.Title>{bike.name}</Card.Title>
                        <Card.Text>
                            <Container>
                                <Row>
                                    <Col>
                                    {bike.price}
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Text>

                    </Card.Body>
                </Card>
                    </Col>

  
                    <Col  className="my-5">
                           <div className="form-class mx-auto">
                           <form onSubmit={handleSubmit(onSubmit)}>
                                <input defaultValue={user.displayName} {...register('name', { required: true })} readOnly /> 
                                {errors.name && <p className="text-white">Please Enter your name</p>}
                                <input defaultValue={user.email} {...register('email', { required: true })} readOnly />
                                {errors.email && <p className="text-white">Please Enter your email</p>}

                                <input placeholder="Phone" {...register('phone', { required: true })} />
                                {errors.phone && <p className="text-white">Please Enter your phone</p>}

                                <input placeholder="Address" {...register('address', { required: true })} />
                              
                             
                                

                                <input className="btn btn-outline-warning"  type="submit"/>
                            </form>
                           </div>
                        </Col>
                   
                </Row>
            </Container>
            <Footer></Footer>
        </div>
    );
};

export default Purchase;