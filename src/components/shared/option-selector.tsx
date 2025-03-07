"use client";

import React, { useRef, useEffect } from "react";

interface OptionSelectorProps<T extends string> {
  title: string;
  options: T[];
  selected: T;
  onChange: (value: T) => void;
  formatOption?: (option: T) => string;
}

export function OptionSelector<T extends string>({
  title,
  options,
  selected,
  onChange,
  formatOption = (option) => option,
}: OptionSelectorProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRef.current && highlightRef.current && containerRef.current) {
      const container = containerRef.current;
      const selected = selectedRef.current;
      const highlight = highlightRef.current;

      const containerRect = container.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();

      highlight.style.left = `${selectedRect.left - containerRect.left}px`;
      highlight.style.width = `${selectedRect.width}px`;
    }
  }, [selected]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <span style={{
        fontSize: '0.875rem',
        color: 'rgba(51, 51, 51, 0.6)'
      }}>{title}</span>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display: 'inline-flex',
          backgroundColor: 'rgba(51, 51, 51, 0.05)',
          padding: '0.25rem',
          borderRadius: 'var(--radius)'
        }}
      >
        <div
          ref={highlightRef}
          style={{
            position: 'absolute',
            top: '0.25rem',
            height: 'calc(100% - 0.5rem)',
            backgroundColor: 'var(--primary)',
            transition: 'all 0.2s',
            borderRadius: 'calc(var(--radius) - 2px)'
          }}
        />
        {options.map((option) => (
          <button
            key={option}
            ref={option === selected ? selectedRef : null}
            onClick={() => onChange(option)}
            style={{
              position: 'relative',
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: option === selected ? 'white' : 'rgba(51, 51, 51, 0.8)',
              transition: 'all 0.2s',
              borderRadius: 'calc(var(--radius) - 2px)'
            }}
            className={option !== selected ? "scale-option" : ""}
          >
            {formatOption(option)}
          </button>
        ))}
      </div>
    </div>
  );
}
