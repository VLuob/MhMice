import React from 'react';
import { Link } from 'react-router-dom'

const Error = (props) => {

    return (
        <div>
            <nav>
                <Link to={{ pathname: '/home' }}>Error</Link>
            </nav>
            <h1>This is Error page!</h1>
        </div>
    )
}

export default Error