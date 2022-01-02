import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import Bike from '../Bike/Bike';

const Bikes = () => {

    const [bikes, setBikes] = useState([])

    useEffect(() => {
        fetch('https://salty-scrubland-71202.herokuapp.com/bikes')
            .then(res => res.json())
            .then(data => setBikes(data))
    }, [])

    return (
        <div>
            <Header />
            {
                !bikes.length ?
                <div className="text-center mt-5">
                    <Spinner animation="grow" />
                </div>
            :

           
                <Row xs={1} md={2} lg={4} className="g-4 my-5 w-100">
                    {bikes.map((bike, idx) => (
                        <Bike

                            bike={bike}
                        />
                    ))}
                </Row>}

            <Footer />

        </div>
    );
};

export default Bikes;