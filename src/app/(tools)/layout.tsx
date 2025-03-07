"use client";
import Link from "next/link";

function BackButton() {
  return (
    <div style={{ position: 'fixed', left: '1rem', top: '1rem', zIndex: 50 }}>
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '0.625rem 0.625rem',
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--primary)',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.2s',
          borderRadius: 'var(--radius)'
        }}
        className="back-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: '0.875rem', width: '0.875rem' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </Link>
    </div>
  );
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, white, var(--secondary))'
    }}>
      <div style={{ 
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
        fontFamily: 'var(--font-geist-sans), Arial, sans-serif'
      }}>
        <BackButton />
        <main style={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {children}
        </main>
        <footer style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'rgba(51, 51, 51, 0.5)'
        }}>
          <a
            href="https://github.com/t3dotgg/quickpic"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
            className="github-link"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              style={{ height: '0.75rem', width: '0.75rem' }}
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}
