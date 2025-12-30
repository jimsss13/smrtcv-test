'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * Properties for the ErrorBoundary component.
 */
interface Props {
  /** The content to render if no error is caught. */
  children: ReactNode;
  /** An optional fallback UI to display when an error occurs. */
  fallback?: ReactNode;
}

/**
 * State for the ErrorBoundary component.
 */
interface State {
  /** Whether an error has been caught in the child component tree. */
  hasError: boolean;
}

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in their child component tree,
 * log those errors, and display a fallback UI instead of the component tree that crashed.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-4xl border-2 border-red-100">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong</h2>
          <p className="text-red-600 mb-8 text-center max-w-md">
            We encountered an unexpected error while loading this section. Please try refreshing the page.
          </p>
          <Button 
            onClick={() => this.setState({ hasError: false })}
            variant="outline"
            className="border-red-200 hover:bg-red-100 text-red-700"
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
