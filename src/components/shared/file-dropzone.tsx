"use client";
import React, { useCallback, useState, useRef } from "react";

interface FileDropzoneProps {
  children: React.ReactNode;
  acceptedFileTypes: string[];
  dropText: string;
  setCurrentFile: (file: File) => void;
}

export function FileDropzone({
  children,
  acceptedFileTypes,
  dropText,
  setCurrentFile,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;

    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;

    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const droppedFile = files[0];

        if (!droppedFile) {
          alert("How did you do a drop with no files???");
          throw new Error("No files dropped");
        }

        if (
          !acceptedFileTypes.includes(droppedFile.type) &&
          !acceptedFileTypes.some((type) =>
            droppedFile.name.toLowerCase().endsWith(type.replace("*", "")),
          )
        ) {
          alert("Invalid file type. Please upload a supported file type.");
          throw new Error("Invalid file");
        }

        // Happy path
        setCurrentFile(droppedFile);
      }
    },
    [acceptedFileTypes, setCurrentFile],
  );

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      style={{ height: '100%', width: '100%' }}
    >
      {isDragging && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            backdropFilter: 'blur(4px)'
          }} />
          <div style={{
            position: 'relative',
            display: 'flex',
            height: '80%',
            width: '80%',
            transform: 'scale(1)',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed rgba(59, 130, 246, 0.3)',
            borderRadius: 'var(--radius)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            transition: 'all 0.2s ease-out',
            animation: 'fadeIn 0.2s ease-out'
          }} className="card">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                backgroundColor: 'var(--accent)',
                padding: '1rem',
                borderRadius: '9999px'
              }}>
                <svg
                  style={{
                    height: '3rem',
                    width: '3rem',
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
              <p style={{
                fontSize: '1.125rem',
                fontWeight: 500,
                color: 'var(--primary)'
              }}>{dropText}</p>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
