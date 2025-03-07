"use client";
import React, { useRef, useEffect } from "react";

interface BorderRadiusSelectorProps {
  title: string;
  options: number[];
  selected: number | "custom";
  onChange: (value: number | "custom") => void;
  customValue?: number;
  onCustomValueChange?: (value: number) => void;
}

export function BorderRadiusSelector({
  title,
  options,
  selected,
  onChange,
  customValue,
  onCustomValueChange,
}: BorderRadiusSelectorProps) {
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
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
              bottom: '0.25rem',
              backgroundColor: 'var(--primary)',
              transition: 'all 0.2s',
              borderRadius: 'calc(var(--radius) - 2px)'
            }}
          />
          {[...options, "custom" as const].map((option) => (
            <button
              key={String(option)}
              ref={option === selected ? selectedRef : null}
              onClick={() =>
                onChange(typeof option === "number" ? option : "custom")
              }
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
              {option === "custom" ? "Custom" : `${option}px`}
            </button>
          ))}
        </div>
        {selected === "custom" && (
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={customValue}
            onChange={(e) => {
              const value = Math.min(100, parseFloat(e.target.value));
              onCustomValueChange?.(value);
            }}
            onKeyDown={(e) => {
              if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

              e.preventDefault();
              const currentValue = customValue ?? 0;
              let step = 1;

              if (e.shiftKey) step = 10;
              if (e.altKey) step = 0.1;

              const newValue =
                e.key === "ArrowUp" ? currentValue + step : currentValue - step;

              const clampedValue = Math.min(
                100,
                Math.max(0, Number(newValue.toFixed(1))),
              );
              onCustomValueChange?.(clampedValue);
            }}
            style={{
              width: '6rem',
              border: '1px solid var(--border)',
              backgroundColor: 'white',
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              color: 'var(--foreground)',
              borderRadius: 'var(--radius)'
            }}
            placeholder="Enter radius"
          />
        )}
      </div>
    </div>
  );
}
