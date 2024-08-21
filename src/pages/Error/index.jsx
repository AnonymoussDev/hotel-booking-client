import React from 'react';
import { Link } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

export const ErrorPage = () => {
    const { resetBoundary } = useErrorBoundary();
    return (
        <div>
            <h1>500 - Error</h1>
            <p>Sorry, an error orcurred.</p>
            <button onClick={resetBoundary}>Try again</button>
        </div>
    );
};

export const NotFound = () => {
    const { resetBoundary } = useErrorBoundary();
    return (
        <div>
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>

            <button onClick={resetBoundary}>
                <Link to={'/'}>Home</Link>
            </button>
        </div>
    );
};
