import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import Bike from '../Bike/Bike';


const Bikes = () => {

    const [bikes, setbikes] = useState([])
    

    useEffect(() => {
        fetch('https://morning-dusk-71032.herokuapp.com/bikes')
            .then(res => res.json())
            .then(data => setbikes(data))
    }, [])

    const bikeData = bikes.slice(0,8)

    return (
        <div id="latest">
          <h1>Our Latest Bike</h1>
            {
                !bikes.length ?  
                <div className="text-center mt-5">
                    <Spinner animation="grow" />
                </div>
           :

           
                <Row xs={1} md={2} lg={4} className="g-4 my-5 w-100">
                    {bikeData.map((bike, idx) => (
                        <Bike

                            bike={bike}
                        />
                    ))}
                </Row>}

         

        </div>
    );
};

export default Bikes;