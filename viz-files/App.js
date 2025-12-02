import {
  useRef,
  useEffect,
  createElement,
  useState,
} from 'react';
import {
  select,
  csv,
  scaleLinear,
  scaleOrdinal,
  schemeTableau10,
  json,
} from 'd3';
import { viz } from './viz.js';
import { vizStackedBar } from './vizStackedBar.js';
import { vizBar } from './vizBar.js';
import { HierarchyTree } from './HierarchyTree.js';
import { Legend } from './Legend.js';
import { TabControl } from './TabControl.js';
import { CHART_CONFIGS } from './chartConfigs.js';
import {
  initializeData,
  parseMovieData,
} from './dataParser.js';

const width = 635;
const height = 400;
const margin = { top: 30, right: 30, bottom: 50, left: 60 };

const ControlPanel = ({
  decades,
  selectedDecade,
  onDecadeChange,
  showRegression,
  onRegressionToggle,
  showRegressionToggle,
  showTrendLines,
  onTrendLinesToggle,
  showTrendLineToggle,
}) => {
  return createElement(
    'div',
    {
      style: {
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '6px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontFamily: 'sans-serif',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        marginTop: '-19px',
      },
    },
    // Filter Row
    createElement(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        },
      },
      createElement(
        'label',
        {
          style: {
            fontWeight: '500',
            color: '#333',
            fontSize: '13px',
            whiteSpace: 'nowrap',
          },
        },
        'Filter:',
      ),
      createElement(
        'select',
        {
          value: selectedDecade,
          onChange: onDecadeChange,
          style: {
            padding: '6px 10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            fontSize: '13px',
            fontFamily: 'sans-serif',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease',
            flex: 1,
          },
        },
        [
          createElement(
            'option',
            { key: 'all', value: 'all' },
            'All Decades',
          ),
          ...decades.map((decade) =>
            createElement(
              'option',
              { key: decade.value, value: decade.value },
              decade.label,
            ),
          ),
        ],
      ),
    ),
    // Regression Button Row (only if supported)
    showRegressionToggle
      ? createElement(
          'button',
          {
            onClick: () =>
              onRegressionToggle(!showRegression),
            style: {
              padding: '3px 12px',
              backgroundColor: showRegression
                ? '#43a047'
                : '#808080',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              fontFamily: 'sans-serif',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              width: '100%',
              textAlign: 'center',
            },
            onMouseEnter: (e) => {
              e.target.style.backgroundColor =
                showRegression ? '#5a5a5a' : '#696969';
            },
            onMouseLeave: (e) => {
              e.target.style.backgroundColor =
                showRegression ? '#696969' : '#808080';
            },
          },
          showRegression
            ? 'Hide Regression Lines'
            : 'Show Regression Lines',
        )
      : null,
    // Trend Lines Button Row (only for year_rating chart)
    showTrendLineToggle
      ? createElement(
          'button',
          {
            onClick: () =>
              onTrendLinesToggle(!showTrendLines),
            style: {
              padding: '3px 12px',
              backgroundColor: showTrendLines
                ? '#43a047'
                : '#808080',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              fontFamily: 'sans-serif',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              width: '100%',
              textAlign: 'center',
            },
            onMouseEnter: (e) => {
              e.target.style.backgroundColor =
                showTrendLines ? '#388e3c' : '#696969';
            },
            onMouseLeave: (e) => {
              e.target.style.backgroundColor =
                showTrendLines ? '#43a047' : '#808080';
            },
          },
          showTrendLines
            ? 'Hide Trend Lines'
            : 'Show Trend Lines',
        )
      : null,
  );
};

export const App = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [hierarchyData, setHierarchyData] = useState(null);
  const [selectedDecade, setSelectedDecade] =
    useState('all');
  const [allGenres, setAllGenres] = useState([]);
  const [colorScale, setColorScale] = useState(null);
  const [xScale, setXScale] = useState(null);
  const [yScale, setYScale] = useState(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const [showRegression, setShowRegression] =
    useState(false);
  const [showTrendLines, setShowTrendLines] =
    useState(false);
  const [activeGenre, setActiveGenre] = useState(null);
  const [activeChart, setActiveChart] = useState(
    'runtime_rating',
  );
  const [xDomain, setXDomain] = useState(null);
  const [yDomain, setYDomain] = useState(null);

  useEffect(() => {
    // Load CSV data
    csv('data.csv').then((loadedData) => {
      const preprocessedData = initializeData(loadedData);
      const formattedData =
        preprocessedData.map(parseMovieData);
      setData(formattedData);
      setFilteredData(formattedData);

      const genres = [
        ...new Set(
          formattedData.map((d) => d.genreSimplified),
        ),
      ];
      setAllGenres(genres);

      const innerW = width - margin.left - margin.right;
      const innerH = height - margin.top - margin.bottom;
      setInnerWidth(innerW);
      setInnerHeight(innerH);

      const xSc = scaleLinear().range([0, innerW]);
      const ySc = scaleLinear().range([innerH, 0]);
      setXScale(() => xSc);
      setYScale(() => ySc);

      // Initialize color scale
      const cSc = scaleOrdinal()
        .domain(genres)
        .range(schemeTableau10);
      setColorScale(() => cSc);
    });

    // Load JSON hierarchy data
    json('data.json').then((loadedHierarchyData) => {
      setHierarchyData(loadedHierarchyData);
    });
  }, []);

  const decades = [];
  for (let i = 1920; i <= 2020; i += 10) {
    if (i === 2020) {
      decades.push({
        label: '2020s',
        value: '2020',
      });
    } else {
      decades.push({
        label: `${i}s`,
        value: i.toString(),
      });
    }
  }

  const handleDecadeChange = (event) => {
    const decade = event.target.value;
    setSelectedDecade(decade);

    if (decade === 'all') {
      setFilteredData(data);
    } else {
      const startYear = parseInt(decade);
      const endYear =
        decade === '2020' ? 2025 : startYear + 9;
      const filtered = data.filter(
        (d) => d.year >= startYear && d.year <= endYear,
      );
      setFilteredData(filtered);
    }
  };

  // Update domains when chart or filtered data changes
  useEffect(() => {
    if (filteredData.length > 0) {
      const config = CHART_CONFIGS[activeChart];
      if (config && config.getDomain) {
        const domains = config.getDomain(filteredData);
        setXDomain(domains.xDomain);
        setYDomain(domains.yDomain);
      }
    }
  }, [activeChart, filteredData]);

  useEffect(() => {
    const config = CHART_CONFIGS[activeChart];

    // Handle hierarchy tree chart
    if (config && config.isHierarchyTree) {
      // Hierarchy tree doesn't need the SVG ref, it handles its own DOM
      return;
    }

    if (
      data.length > 0 &&
      allGenres.length > 0 &&
      colorScale &&
      innerWidth > 0 &&
      innerHeight > 0
    ) {
      // Apply data transformation if available
      let dataToVisualize = filteredData;
      if (config && config.transformData) {
        dataToVisualize =
          config.transformData(filteredData);
      }

      const svg = select(svgRef.current);

      // Use stacked bar chart for specific config
      if (config && config.isStackedBar) {
        vizStackedBar(svg, {
          data: dataToVisualize,
          width,
          height,
          margin,
          xValue: config.xValue,
          xLabel: config.xLabel,
          yLabel: config.yLabel,
          xlabelOffset:
            config.xlabelOffset !== undefined
              ? config.xlabelOffset
              : 10,
          title: '',
          allGenres,
          colorScale,
          innerWidth,
          innerHeight,
        });
      } else if (config && config.isBar) {
        // Use simple bar chart
        vizBar(svg, {
          data: dataToVisualize,
          width,
          height,
          margin,
          xValue: config.xValue,
          yValue: config.yValue,
          xLabel: config.xLabel,
          yLabel: config.yLabel,
          xlabelOffset:
            config.xlabelOffset !== undefined
              ? config.xlabelOffset
              : 10,
          title: '',
          colorScale,
          innerWidth,
          innerHeight,
        });
      } else {
        // Use regular scatter/bubble chart
        if (!xScale || !yScale || !xDomain || !yDomain) {
          return;
        }

        viz(svg, {
          data: dataToVisualize,
          width,
          height,
          margin,
          xValue: config.xValue,
          yValue: config.yValue,
          rValue: (d) => d.year,
          fill: (d) => d.genreSimplified,
          xLabel: config.xLabel,
          yLabel: config.yLabel,
          xlabelOffset: margin.bottom - 10,
          ylabelOffset: margin.left - 15,
          xTickFormat: config.xTickFormat || '.1f',
          title: '',
          allGenres,
          colorScale,
          xScale,
          yScale,
          innerWidth,
          innerHeight,
          showRegression,
          activeGenre,
          xDomain,
          yDomain,
          showTrendLines:
            config.showTrendLines && showTrendLines,
          onToggleTrendLines: config.showTrendLines
            ? () => setShowTrendLines(!showTrendLines)
            : null,
          supportsRegression:
            config.supportsRegression !== false,
        });
      }
    }
  }, [
    filteredData,
    allGenres,
    colorScale,
    xScale,
    yScale,
    innerWidth,
    innerHeight,
    showRegression,
    activeGenre,
    activeChart,
    xDomain,
    yDomain,
    showTrendLines,
  ]);

  const rightPanelWidth = 220;
  const chartTabs = Object.values(CHART_CONFIGS).map(
    (config) => ({
      id: config.id,
      label: config.label,
    }),
  );

  const currentConfig = CHART_CONFIGS[activeChart];
  const showTrendLineToggle =
    currentConfig && currentConfig.showTrendLines;
  const showRegressionToggle =
    currentConfig &&
    currentConfig.supportsRegression !== false &&
    !currentConfig.isHierarchyTree;

  // Check if current chart is one of the first 4 (not hierarchy tree)
  const isFirstFourCharts =
    currentConfig && !currentConfig.isHierarchyTree;
  const rightPanelMarginLeft = isFirstFourCharts
    ? '4px'
    : '0px';

  return createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        backgroundColor: '#fff',
      },
    },
    // Tab Control at the very top
    createElement(TabControl, {
      tabs: chartTabs,
      activeTab: activeChart,
      onTabChange: (chartId) => {
        setActiveChart(chartId);
        setShowTrendLines(false);
      },
    }),
    // Title section (between tab and main content)
    !currentConfig || !currentConfig.isHierarchyTree
      ? createElement(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              minHeight: '32px',
              paddingLeft: '40px',
              paddingRight: '40px',
              paddingTop: '6px',
              paddingBottom: '6px',
              backgroundColor: '#fafafa',
              borderBottom: '0px solid #f0f0f0',
              flexShrink: 0,
            },
          },
          createElement(
            'div',
            {
              style: {
                width: width,
                textAlign: 'center',
              },
            },
            createElement(
              'h2',
              {
                style: {
                  margin: '0',
                  fontSize: '20px',
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  color: '#333',
                },
              },
              currentConfig?.title || '',
            ),
          ),
        )
      : null,
    // Main content area
    createElement(
      'div',
      {
        style: {
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          width: '100%',
        },
      },
      // Left side: Chart
      createElement(
        'div',
        {
          style: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 40px',
            overflow: 'auto',
            backgroundColor: '#fafafa',
          },
        },
        currentConfig && currentConfig.isHierarchyTree
          ? createElement(HierarchyTree, {
              hierarchyData,
              width: Math.min(width * 1.5, 900),
              height: Math.min(height * 1.5, 800),
              margin,
            })
          : createElement('svg', {
              ref: svgRef,
              width,
              height,
              style: {
                backgroundColor: 'white',
                borderRadius: '4px',
                border: '1px solid #ddd',
              },
            }),
      ),
      // Right side: Legend and Controls
      isFirstFourCharts
        ? createElement(
            'div',
            {
              style: {
                width: rightPanelWidth,
                padding: '20px 8px',
                overflowY: 'auto',
                backgroundColor: '#fafafa',
                borderLeft: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flexShrink: 0,
              },
            },
            createElement(ControlPanel, {
              decades,
              selectedDecade,
              onDecadeChange: handleDecadeChange,
              showRegression,
              onRegressionToggle: setShowRegression,
              showRegressionToggle,
              showTrendLines,
              onTrendLinesToggle: setShowTrendLines,
              showTrendLineToggle,
            }),
            createElement(Legend, {
              genres: allGenres,
              colorScale,
              activeGenre,
              onGenreHover: setActiveGenre,
              onGenreClick: (genre) => {
                setActiveGenre(
                  activeGenre === genre ? null : genre,
                );
              },
            }),
          )
        : null,
    ),
  );
};
