import React from "react";
import Error_404 from "../assets/error-404.gif";
import Boundary from "../assets/boundary.gif";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.pathname = "/"; // Redirect to home page
  };

  renderErrorPage = (image) => (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold text-red-500 drop-shadow-lg">
          Oops! Something Went Wrong
        </h1>
        <p className="text-lg mt-4 opacity-90">
          The server encountered an issue. Please try again later.
        </p>
        <button
          onClick={this.handleReload}
          className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );

  render() {
    if (this.state.hasError) {
      return window.location.pathname === "/404"
        ? this.renderErrorPage(Error_404)
        : this.renderErrorPage(Boundary);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
