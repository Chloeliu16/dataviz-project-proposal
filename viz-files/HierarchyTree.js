import { useRef, useEffect, createElement } from 'react';
import {
  select,
  hierarchy,
  tree,
  linkHorizontal,
  zoom,
} from 'd3';

export const HierarchyTree = ({
  hierarchyData,
  width,
  height,
  margin,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!hierarchyData) return;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const treeLayout = tree()
      .size([innerHeight, innerWidth])
      .separation(() => 2);

    const svg = select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main zoom group
    const zoomG = svg.append('g');

    // Create content group with initial transform
    const g = zoomG
      .append('g')
      .attr('class', 'container')
      .attr(
        'transform',
        `translate(${margin.left},${margin.top})`,
      );

    // Add zoom behavior
    const zoomBehavior = zoom().on('zoom', (event) => {
      zoomG.attr('transform', event.transform);
    });

    svg.call(zoomBehavior);

    // Create hierarchy and layout
    const root = hierarchy(hierarchyData);
    const links = treeLayout(root).links();

    // Create link path generator (horizontal tree)
    const linkPathGenerator = linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    // Add title - centered display
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .attr('pointer-events', 'none')
      .text(' ');

    // Draw links
    g.selectAll('path')
      .data(links)
      .join('path')
      .attr('d', linkPathGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#4caf50')
      .attr('stroke-width', 1.2)
      .attr('stroke-opacity', 0.6);

    // Draw nodes
    const nodes = g
      .selectAll('g.node')
      .data(root.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', (d) => `translate(${d.y},${d.x})`);

    // Add circles ONLY for leaf nodes (movies)
    nodes
      .filter((d) => !d.children)
      .append('circle')
      .attr('r', 3.5)
      .attr('fill', '#1E88E5')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.4);

    // Add white background rectangles for text labels (except genre layer and movies layer)
    nodes
      .filter((d) => d.depth !== 2 && d.depth !== 3)
      .append('rect')
      .attr('class', 'label-background')
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('fill', '#ffffff')
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 0.5)
      .attr('pointer-events', 'none');

    // Add text labels
    nodes
      .append('text')
      .attr('dy', '0.32em')
      .attr('dx', (d) => (d.depth === 3 ? '8px' : '0px'))
      .attr('text-anchor', (d) =>
        d.depth === 3 ? 'start' : 'middle',
      )
      .style('font-size', (d) => {
        if (d.depth === 0) return '14px';
        if (d.depth === 1) return '12px';
        if (d.depth === 2) return '10px';
        return '8px';
      })
      .style('font-weight', (d) =>
        d.depth === 0
          ? 'bold'
          : d.depth <= 2
            ? '600'
            : 'normal',
      )
      .style('fill', '#333')
      .style('pointer-events', 'none')
      .text((d) => d.data.name);

    // Update background rectangle dimensions based on text
    const textPaddingX = 6;
    const textPaddingY = 3;

    nodes.each(function (d) {
      const textElement = select(this).select('text');
      const bbox = textElement.node().getBBox();
      const rectElement = select(this).select(
        'rect.label-background',
      );

      const rectWidth = bbox.width + textPaddingX * 2;
      const rectHeight = bbox.height + textPaddingY * 2;
      const rectX = bbox.x - textPaddingX;
      const rectY = bbox.y - textPaddingY;

      rectElement
        .attr('x', rectX)
        .attr('y', rectY)
        .attr('width', rectWidth)
        .attr('height', rectHeight);
    });

    // Position rectangles relative to nodes
    nodes.select('rect.label-background').attr('dx', 0);

    // Add reset zoom button functionality via SVG element
    const resetButton = svg
      .append('g')
      .attr('class', 'reset-button')
      .attr('transform', `translate(${width - 80}, 10)`)
      .style('cursor', 'pointer');

    resetButton
      .append('rect')
      .attr('width', 70)
      .attr('height', 30)
      .attr('rx', 4)
      .attr('fill', '#2196F3')
      .attr('fill-opacity', 0.8)
      .attr('stroke', '#1976D2')
      .attr('stroke-width', 1.5);

    resetButton
      .append('text')
      .attr('x', 35)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-family', 'sans-serif')
      .attr('fill', '#ffffff')
      .attr('font-weight', 'bold')
      .attr('pointer-events', 'none')
      .text('Reset Zoom');

    resetButton.on('click', () => {
      svg
        .transition()
        .duration(750)
        .call(
          zoomBehavior.transform,
          zoom().transform(svg, {
            x: 0,
            y: 0,
            k: 1,
          }),
        );
    });

    resetButton.on('mouseenter', function () {
      select(this).select('rect').attr('fill-opacity', 1);
    });

    resetButton.on('mouseleave', function () {
      select(this).select('rect').attr('fill-opacity', 0.8);
    });
  }, [hierarchyData, width, height, margin]);

  return createElement('svg', {
    ref: svgRef,
    width,
    height,
    style: {
      backgroundColor: '#f8f9fa',
      borderRadius: '4px',
      border: '1px solid #ddd',
    },
  });
};
