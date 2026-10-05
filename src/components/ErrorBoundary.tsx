import React, { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import ServerErrorPage from './ServerErrorPage';
interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {

  return (
    <ReactErrorBoundary
      FallbackComponent={ServerErrorPage}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
