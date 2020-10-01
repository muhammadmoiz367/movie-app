import React, { useState } from 'react'
import {Col} from 'antd'
import { Link } from 'react-router-dom'
import ReactCardFlip from 'react-card-flip';

function GridCard(props) {
    const [isFlipped, setIsFlipped]=useState(false);

    const handleMouseOver=()=>{
        setIsFlipped(!isFlipped);
    }
    
    return (
        <div>
            {props.actor 
            ? (
                <Col lg={6} md={8} xs={24}>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                        <div style={{position: 'relative'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver} >
                            <img style={{width:'100%', height: '320px'}} src={props.image} />
                        </div>
                
                        <div style={{position: 'relative'}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>
                            <div style={{width:'100%', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column', backgroundColor: '#d4d4d4'}}>
                                <h4>Name: </h4>
                                <p><em>{props.name}</em></p>
                                <br/>
                                <h4>Character name: </h4>
                                <p><em>{props.character}</em></p>
                            </div>
                        </div>
                    </ReactCardFlip>
                </Col>
            )
            : (
                <Col lg={6} md={8} xs={24}>
                    <div style={{position: 'relative'}}>
                        <Link to={props.movie ? `/movies/${props.movieId}` : `/tv/${props.tvId}`}>
                            <img style={{width:'100%', height: '320px'}} src={props.image} />
                        </Link>
                    </div>
                </Col>
               )
            }
        </div>
    )
}

export default GridCard
