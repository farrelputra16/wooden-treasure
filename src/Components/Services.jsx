import React from 'react';
import Card from './Card';
import RewardData from './ServiceData';

const Rewards = () => {
    return (
        <>
            <div className="my-5">
                <h1 className="text-center">Our Rewards</h1>
            </div>
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row gy-4">
                            {
                                RewardData.map((val, index) => {
                                    return <Card 
                                        videoSrc={val.videoSrc}
                                        title={val.title}
                                        key={index}
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Rewards;