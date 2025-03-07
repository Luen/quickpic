"use client";
import React from "react";

interface UploadBoxProps {
  title: string;
  subtitle?: string;
  description: string;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadBox({
  title,
  subtitle,
  description,
  accept,
  onChange,
}: UploadBoxProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '0.5rem'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.375rem'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--foreground)'
        }}>{title}</h2>
        {subtitle && (
          <p style={{
            display: 'inline-block',
            backgroundColor: 'var(--accent)',
            padding: '0.125rem 0.625rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--primary)',
            borderRadius: '9999px'
          }}>
            {subtitle}
          </p>
        )}
      </div>
      <div style={{
        display: 'flex',
        width: '15rem',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--radius)',
        backgroundImage: 'linear-gradient(to bottom, white, var(--secondary))',
        padding: '1.25rem'
      }} className="card">
        <div style={{
          backgroundColor: 'var(--accent)',
          padding: '0.75rem',
          borderRadius: '9999px'
        }}>
          <svg
            style={{
              height: '2.5rem',
              width: '2.5rem',
              color: 'var(--primary)'
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 12v5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 15l-3-3-3 3"
            />
          </svg>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'rgba(51, 51, 51, 0.7)'
          }}>Drag and Drop</p>
          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(51, 51, 51, 0.4)'
          }}>or</p>
        </div>
        <label className="btn-primary" style={{
          display: 'inline-flex',
          cursor: 'pointer',
          alignItems: 'center',
          gap: '0.375rem'
        }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            style={{
              height: '0.75rem',
              width: '0.75rem'
            }}
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <span>{description}</span>
          <input
            type="file"
            onChange={onChange}
            accept={accept}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
}
