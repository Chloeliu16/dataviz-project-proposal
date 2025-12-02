import { createElement } from 'react';

export const Legend = ({
  genres,
  colorScale,
  activeGenre,
  onGenreHover,
  onGenreClick,
}) => {
  return createElement(
    'div',
    {
      style: {
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '12px',
        fontFamily: 'sans-serif',
      },
    },
    createElement(
      'div',
      {
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#333',
        },
      },
      'Genre',
    ),
    createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        },
      },
      genres.map((genre) =>
        createElement(
          'div',
          {
            key: genre,
            onClick: () => onGenreClick(genre),
            onMouseEnter: () => onGenreHover(genre),
            onMouseLeave: () => onGenreHover(null),
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              padding: '4px 6px',
              borderRadius: '3px',
              backgroundColor:
                activeGenre === genre
                  ? '#e8e8e8'
                  : 'transparent',
              fontWeight:
                activeGenre === genre ? 'bold' : 'normal',
              fontSize: '12px',
              color: '#333',
              transition: 'all 0.2s ease',
              userSelect: 'none',
            },
          },
          createElement('div', {
            style: {
              width: '12px',
              height: '12px',
              borderRadius: '2px',
              backgroundColor: colorScale(genre),
              opacity: 0.7,
              flexShrink: 0,
            },
          }),
          createElement(
            'span',
            {
              style: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            },
            genre,
          ),
        ),
      ),
    ),
  );
};
