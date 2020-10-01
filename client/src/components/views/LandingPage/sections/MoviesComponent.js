import { Button, Row } from 'antd'
import Title from 'antd/lib/skeleton/Title'
import React, { Fragment } from 'react'
import { IMAGE_URL } from '../../../Config'
import GridCard from './gridCard'
import MainImage from './mainImage'

function MoviesComponent(props) {
    return (
        <div style={{ width: '100%', margin: 0}}>
            {props.result[0] && 
                <MainImage image={`${IMAGE_URL}w1280/${props.result[0].backdrop_path}`} title={props.result[0].original_title} text={props.result[0].overview} />
            }
            {/*Body*/}
            <div style={{width: '85%', margin: '1rem auto'}}>
                <Title level={2}>Latest {props.resultName}</Title>
                <hr/>
                {/* Movie cards*/}
                <Row gutter={[16, 16]}>
                    {props.result && props.result.map((resultIterator, index)=>(
                        <Fragment key={index}>
                            <GridCard image={`${IMAGE_URL}w500/${resultIterator.poster_path}`} movie  movieId={resultIterator.id}/>
                        </Fragment>
                    ))}
                </Row>
                <br/>
                {/*Load more button*/}
                <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <Button disabled={props.page===1 ? true : false} onClick={props.loadPrevious}>Load previous</Button>
                    <Button disabled={props.page >= 20 ? true : false} onClick={props.loadNext}>Load next</Button>
                </div>
            </div>
        </div>
    )
}

export default MoviesComponent
