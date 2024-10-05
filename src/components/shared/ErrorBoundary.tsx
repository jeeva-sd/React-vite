import React, { ErrorInfo, CSSProperties } from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: '',
        };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            errorMessage: error.message,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI when an error occurs
            return (
                <div style={styles.errorContainer}>
                    <h1 style={styles.errorTitle}>Something went wrong.</h1>
                    <p style={styles.errorMessage}>{this.state.errorMessage}</p>
                </div>
            );
        }

        return this.props.children; // Render children if no error
    }
}

const styles: { [key: string]: CSSProperties; } = {
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '20px',
        border: '1px solid #f5c6cb',
        borderRadius: '5px',
        textAlign: 'center',
    },
    errorTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    errorMessage: {
        fontSize: '16px',
    },
};

export { ErrorBoundary };
