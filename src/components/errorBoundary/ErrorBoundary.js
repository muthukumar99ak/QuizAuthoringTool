import React from "react";
import './errorBoundary.css'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div className="error_detail_container">
                    <h2>Something went wrong</h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;