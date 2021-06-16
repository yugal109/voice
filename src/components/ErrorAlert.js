import React from 'react'

const ErrorAlert = ({message,variant}) => {
    return (
        <div style={{color:"red"}}>
            {message}
        </div>
    )
}

export default ErrorAlert
