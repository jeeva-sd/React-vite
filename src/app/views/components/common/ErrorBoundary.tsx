import React, { ReactNode } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        console.log(error);
        return { hasError: true };
    }

    // componentDidCatch(_error: Error, _info: ErrorInfo): void {
    //     // Add logging logic here if needed.
    // }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4 text-red-500">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-lg text-gray-600">
                            We apologize for the inconvenience.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
