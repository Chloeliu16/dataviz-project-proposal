import { createElement } from 'react';

export const TabControl = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return createElement(
    'div',
    {
      style: {
        display: 'flex',
        backgroundColor: '#f9f9f9',
        padding: '12px 16px',
        gap: '10px',
        overflow: 'auto',
        width: '100%',
        flexShrink: 0,
        borderBottom: '1px solid #ddd',
        alignItems: 'center',
      },
    },
    tabs.map((tab) =>
      createElement(
        'button',
        {
          key: tab.id,
          onClick: () => onTabChange(tab.id),
          style: {
            padding: '10px 20px',
            border:
              activeTab === tab.id
                ? '2px solid #0066cc'
                : '1px solid #ccc',
            backgroundColor:
              activeTab === tab.id ? '#0066cc' : '#ffffff',
            borderRadius: '6px',
            color:
              activeTab === tab.id ? '#ffffff' : '#333',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight:
              activeTab === tab.id ? '600' : '500',
            fontFamily: 'sans-serif',
            transition: 'all 0.25s ease',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            boxShadow:
              activeTab === tab.id
                ? '0 2px 8px rgba(0, 102, 204, 0.25)'
                : '0 1px 3px rgba(0, 0, 0, 0.08)',
            flexShrink: 0,
          },
          onMouseEnter: (e) => {
            if (activeTab === tab.id) {
              e.target.style.backgroundColor = '#0052a3';
              e.target.style.boxShadow =
                '0 4px 12px rgba(0, 102, 204, 0.35)';
            } else {
              e.target.style.backgroundColor = '#f0f0f0';
              e.target.style.borderColor = '#999';
            }
          },
          onMouseLeave: (e) => {
            if (activeTab === tab.id) {
              e.target.style.backgroundColor = '#0066cc';
              e.target.style.boxShadow =
                '0 2px 8px rgba(0, 102, 204, 0.25)';
            } else {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#ccc';
            }
          },
        },
        tab.label,
      ),
    ),
  );
};
