import React, { useState, useEffect } from 'react';

export default function ArticleDropdown({ articleUrl }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('ArticleDropdown mounted with URL:', articleUrl);
  }, [articleUrl]);

  const handleCopyMarkdown = async () => {
    try {
      const response = await fetch(`${articleUrl}.md`);
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
    }
  };

  const handleViewMarkdown = () => {
    window.open(`${articleUrl}.md`, '_blank');
  };

  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: 'var(--ifm-color-emphasis-900)',
    border: '1px solid var(--ifm-color-emphasis-200)',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  };

  return (
    <div style={{
      position: 'relative',
      display: 'inline-block',
      zIndex: 1000,
    }}>
      <button 
        style={buttonStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-200)';
        }}
        onClick={() => {
          console.log('Button clicked, current isOpen:', isOpen);
          setIsOpen(!isOpen);
        }}
        aria-label="Article options"
      >
        <span>{copied ? 'Copied!' : 'Copy page'}</span>
        <svg
          style={{
            width: '12px',
            height: '12px',
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 0.5rem)',
          backgroundColor: '#ffffff',
          minWidth: '280px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          zIndex: 1000,
          padding: '0.5rem',
          border: '1px solid var(--ifm-color-emphasis-200)',
        }}>
          <button
            onClick={handleCopyMarkdown}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              background: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px',
              marginBottom: '0.25rem',
              transition: 'background-color 0.2s ease',
              color: 'var(--ifm-color-emphasis-900)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-50)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <div style={{ 
              fontWeight: 500,
              marginBottom: '0.25rem',
              color: 'var(--ifm-color-emphasis-900)',
            }}>
              Copy page
            </div>
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--ifm-color-emphasis-700)',
            }}>
              Copy page as Markdown for LLMs
            </div>
          </button>
          <button
            onClick={handleViewMarkdown}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem 1rem',
              textAlign: 'left',
              background: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease',
              color: 'var(--ifm-color-emphasis-900)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-50)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <div style={{ 
              fontWeight: 500,
              marginBottom: '0.25rem',
              color: 'var(--ifm-color-emphasis-900)',
            }}>
              View as Markdown
            </div>
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--ifm-color-emphasis-700)',
            }}>
              View this page as plain text
            </div>
          </button>
        </div>
      )}
    </div>
  );
} 