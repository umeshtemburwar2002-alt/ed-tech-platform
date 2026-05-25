import React from "react";

/**
 * ErrorBoundary — catches React render errors so the whole app doesn't go blank.
 *
 * Usage:
 *   <ErrorBoundary fallback={<SomeUI />}>
 *     <YourComponent />
 *   </ErrorBoundary>
 *
 * Or with the default futuristic fallback:
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 *
 * Why needed:
 *   Without an error boundary, ANY uncaught throw inside a React component
 *   causes the entire tree to unmount → blank black screen. The error exists
 *   only in the browser console (invisible to the user).
 *
 * Placed around:
 *   - StudentDashboardLayout outlet
 *   - InstructorDashboardLayout outlet
 *   - Individual dashboard pages
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Caught render error:", error, info.componentStack);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    // Custom fallback if provided
    if (this.props.fallback) return this.props.fallback;

    // Default futuristic dark fallback UI
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 gap-6">
        {/* Glowing error icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl scale-150" />
          <div className="relative w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2 max-w-md">
          <h2 className="text-xl font-bold text-white">Something went wrong</h2>
          <p className="text-sm text-slate-400">
            This section ran into an unexpected error. Your session and data are safe.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mt-3 text-left text-[10px] text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl p-4 overflow-auto max-h-32">
              {this.state.error.toString()}
            </pre>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={this.handleReset}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-sm font-bold text-[#00B4D8] hover:bg-[#00B4D8]/20 transition-all"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
