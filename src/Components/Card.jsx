import React from 'react';

const Card = (props) => {
    return (
        <div className="col-12 mx-auto mb-4">
            <div className="video-container">
                <iframe
                    className="youtube-short"
                    src={props.videoSrc}
                    title={props.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <div className="video-title">
                    <h5>{props.title}</h5>
                </div>
            </div>
        </div>
    );
};

export default Card;