import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorName: "", errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error(error, info);
    this.setState({
      errorName: error.name,
      errorMessage: error.message
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <div>
          <h4>{"Error Occured"}</h4>
          <p>
            {this.state.errorName} : {this.state.errorMessage}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
