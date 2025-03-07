"use client";
import React, { useRef, useEffect } from "react";

interface SVGScaleSelectorProps {
  title: string;
  options: number[];
  selected: number | "custom";
  onChange: (value: number | "custom") => void;
  customValue?: number;
  onCustomValueChange?: (value: number) => void;
}

export function SVGScaleSelector({
  title,
  options,
  selected,
  onChange,
  customValue,
  onCustomValueChange,
}: SVGScaleSelectorProps) {
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
        fontSize: '0.75rem',
        fontWeight: 500,
        color: 'rgba(51, 51, 51, 0.7)'
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
            backgroundColor: 'var(--secondary)',
            padding: '0.125rem',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            borderRadius: 'var(--radius)'
          }}
        >
          <div
            ref={highlightRef}
            style={{
              position: 'absolute',
              top: '0.125rem',
              height: 'calc(100% - 0.25rem)',
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
                padding: '0.625rem 0.625rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: option === selected ? 'white' : 'rgba(51, 51, 51, 0.7)',
                transition: 'all 0.2s',
                borderRadius: 'calc(var(--radius) - 2px)'
              }}
              className={option !== selected ? "scale-option" : ""}
            >
              {option === "custom" ? "Custom" : `${option}×`}
            </button>
          ))}
        </div>
        {selected === "custom" && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input
              type="number"
              min="0"
              max="64"
              step="1"
              value={customValue}
              onChange={(e) => {
                const value = Math.min(64, parseFloat(e.target.value));
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
                  64,
                  Math.max(0, Number(newValue.toFixed(1))),
                );
                onCustomValueChange?.(clampedValue);
              }}
              style={{
                width: '5rem',
                border: '1px solid var(--border)',
                backgroundColor: 'white',
                padding: '0.5rem 0.5rem',
                fontSize: '0.75rem',
                color: 'var(--foreground)',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                borderRadius: 'var(--radius)'
              }}
              placeholder="Enter scale"
            />
            <span style={{
              fontSize: '0.75rem',
              color: 'rgba(51, 51, 51, 0.7)'
            }}>×</span>
          </div>
        )}
      </div>
    </div>
  );
}
