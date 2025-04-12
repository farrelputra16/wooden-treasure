import React from 'react';
import home from "../images/home.png";
import Common from './Common';

const Home = () => {
    return (
        <>
            <Common 
                name='Hold 10M Tokens and get reward from' 
                imgsrc={home} 
                isCompName={true}
                compName="Wooden Treasures"
                visit='/claimreward' 
                btnname="Get Reward" 
            />
        </>
    )
}

export default Home;