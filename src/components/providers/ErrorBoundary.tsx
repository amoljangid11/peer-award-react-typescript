import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Container } from '@material-ui/core';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_err: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <h1>Unhandled error</h1>
          <h2>Please refresh the page</h2>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
