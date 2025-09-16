import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./Components/ui/button";
import { cn } from "./lib/utils";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex h-screen flex-col items-center justify-center text-center p-6">
          <h1 className="text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h1>
          <span>Please contact support if the problem persists.</span>
          <Link
            className={cn(buttonVariants({ size: "lg" }), "my-3")}
            to="/contact"
          >
            Contact Support
          </Link>
          <p className="text-red-500">
            {this.state.error?.message ?? "Unknown error"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
