import React from 'react';
import home from "../images/home.png";
import Common from './Common';

const Home = () => {
    return (
        <>
            <Common 
                name='Hold 10M Tokens and get rewards' 
                imgsrc={home} 
                isCompName={true}
                compName="CA : "
                visit='/claimreward' 
                btnname="Get Reward" 
            />
        </>
    )
}

export default Home;