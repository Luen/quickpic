import Link from "next/link";

export default function Home() {
  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '2rem',
      fontFamily: 'var(--font-geist-sans), Arial, sans-serif'
    }}>
      <main style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Fast and efficient tools for your images</div>
        <div style={{ marginTop: '1rem' }}></div>
        <Link 
          href="/svg-to-png" 
          style={{ color: 'var(--primary)' }}
          className="github-link"
        >
          SVG to PNG converter
        </Link>
        <Link 
          href="/square-image" 
          style={{ color: 'var(--primary)' }}
          className="github-link"
        >
          Square image generator
        </Link>
        <Link 
          href="/rounded-border" 
          style={{ color: 'var(--primary)' }}
          className="github-link"
        >
          Corner Rounder
        </Link>
        <Link 
          href="/bg-remover" 
          style={{ color: 'var(--primary)' }}
          className="github-link"
        >
          Background Remover
        </Link>
        <Link 
          href="/size-compressor" 
          style={{ color: 'var(--primary)' }}
          className="github-link"
        >
          Image Size Compressor
        </Link>
      </main>
      <footer style={{ 
        marginTop: '2rem',
        textAlign: 'center',
        fontSize: '0.875rem',
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
  );
}
