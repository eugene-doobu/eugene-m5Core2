'use client';

import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            문제가 발생했습니다
          </h2>
          <p className="text-slate-500 mb-6">
            예상치 못한 오류가 발생했어요. 페이지를 새로고침해 주세요.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
