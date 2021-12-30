import React from "react";

const CategoryColor = (props) => {
    const tagColors = {
        work: 'orange',
        document: 'red',
        social: 'blue',
        advertising: 'green',
        clients: 'grey'
    }
    const style = {
        backgroundColor: tagColors[props.text] || 'orange',
        height: 12,
        width: 12,
        display: 'inline-block',
        borderRadius: '100%',
        marginBottom: '-1px'
    }

    const tagStyle = {
        backgroundColor: tagColors[props.text] || 'orange',
        display: 'inline-block',
        borderRadius: '2px',
        fontSize:'10px',
        padding:'0 4px',
        textTransform:'capitalize'
    }

    return (
        props.type === 'tag' ? <span style={tagStyle}>{props.text}</span> : <span style={style}></span >
    )
}

export default CategoryColor;