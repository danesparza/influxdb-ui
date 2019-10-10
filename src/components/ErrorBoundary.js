//  React
import React, { Component } from 'react';

class ErrorBoundary extends Component {

    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <div>Something went wrong.</div>;
      }
  
      return this.props.children; 
    }
}

export default ErrorBoundary;
