import React from 'react';

const ViewMail = (props) => {
    const { viewData, type } = props;
    const { name, from, to, cc, subject, body, attachment, category, date } = viewData;
    return (
        <div className="inboxContainer">
            <div style={{ margin: '5px', fontWeight: '500', cursor: 'pointer', borderBottom:'1px solid #00b494' }} onClick={props.onBack}>
                Back
            </div>
            <div className="viewMailLabel">From : <span>{type === 'sent' ? `${name}(${from})` : from}</span></div>
            <div className="viewMailLabel">To : <span>{to}</span></div>
            <div className="viewMailLabel">Cc : <span>{cc}</span></div>
            <div className="viewMailLabel">Subject : <span>{subject}</span></div>
            <div className="viewMailLabel" style={{fontSize:'10px'}}>{date}</div>
            <hr/>
            <div className="viewMailLabel" style={{margin:'25px 0'}}><p>{body}</p></div>
            {category && <div className="viewMailLabel">Category : <span>{category}</span></div>}
            <div className="viewMailLabel">Attachment : <span>{attachment ? "Yes" : "No"}</span></div>
        </div>
    )
}

export default ViewMail;