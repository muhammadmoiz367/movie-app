import React from 'react'
import {Col} from 'antd'
import { Link } from 'react-router-dom'

function GridCard(props) {
    return (
        <div>
            {props.actor 
            ? (
                <Col lg={6} md={8} xs={24}>
                <div style={{position: 'relative'}}>
                    <img style={{width:'100%', height: '320px'}} src={props.image} />
                </div>
            </Col>    
            )
            : (
                <Col lg={6} md={8} xs={24}>
                    <div style={{position: 'relative'}}>
                        <Link to={`/movies/${props.movieId}`}>
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
