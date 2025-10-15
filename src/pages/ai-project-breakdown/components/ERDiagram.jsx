import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ERDiagram = ({ projectData, onDownloadPNG }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mock ER diagram data based on project type
  const generateERData = (project) => {
    const nodes = [
      { id: 'users', name: 'Users', type: 'entity', x: 100, y: 100, fields: ['id', 'name', 'email', 'created_at'] },
      { id: 'projects', name: 'Projects', type: 'entity', x: 300, y: 100, fields: ['id', 'title', 'description', 'user_id'] },
      { id: 'tasks', name: 'Tasks', type: 'entity', x: 500, y: 100, fields: ['id', 'title', 'status', 'project_id'] },
      { id: 'comments', name: 'Comments', type: 'entity', x: 300, y: 300, fields: ['id', 'content', 'task_id', 'user_id'] }
    ];

    const links = [
      { source: 'users', target: 'projects', relationship: 'owns', type: 'one-to-many' },
      { source: 'projects', target: 'tasks', relationship: 'contains', type: 'one-to-many' },
      { source: 'tasks', target: 'comments', relationship: 'has', type: 'one-to-many' },
      { source: 'users', target: 'comments', relationship: 'writes', type: 'one-to-many' }
    ];

    return { nodes, links };
  };

  useEffect(() => {
    if (!projectData) return;

    const svg = d3?.select(svgRef?.current);
    const container = d3?.select(containerRef?.current);
    
    // Clear previous content
    svg?.selectAll("*")?.remove();
    
    const width = containerRef?.current?.clientWidth || 800;
    const height = 500;
    
    svg?.attr("width", width)?.attr("height", height);
    
    const { nodes, links } = generateERData(projectData);
    
    // Create zoom behavior
    const zoom = d3?.zoom()?.scaleExtent([0.5, 3])?.on("zoom", (event) => {
        g?.attr("transform", event?.transform);
        setZoomLevel(event?.transform?.k);
      });
    
    svg?.call(zoom);
    
    const g = svg?.append("g");
    
    // Create links
    const link = g?.selectAll(".link")?.data(links)?.enter()?.append("g")?.attr("class", "link");
    
    link?.append("line")?.attr("stroke", "var(--color-border)")?.attr("stroke-width", 2)?.attr("x1", d => nodes?.find(n => n?.id === d?.source)?.x + 75)?.attr("y1", d => nodes?.find(n => n?.id === d?.source)?.y + 50)?.attr("x2", d => nodes?.find(n => n?.id === d?.target)?.x + 75)?.attr("y2", d => nodes?.find(n => n?.id === d?.target)?.y + 50);
    
    // Add relationship labels
    link?.append("text")?.attr("x", d => (nodes?.find(n => n?.id === d?.source)?.x + nodes?.find(n => n?.id === d?.target)?.x) / 2 + 75)?.attr("y", d => (nodes?.find(n => n?.id === d?.source)?.y + nodes?.find(n => n?.id === d?.target)?.y) / 2 + 45)?.attr("text-anchor", "middle")?.attr("fill", "var(--color-text-secondary)")?.attr("font-size", "12px")?.text(d => d?.relationship);
    
    // Create entity nodes
    const node = g?.selectAll(".node")?.data(nodes)?.enter()?.append("g")?.attr("class", "node")?.attr("transform", d => `translate(${d?.x}, ${d?.y})`)?.call(d3?.drag()?.on("start", dragstarted)?.on("drag", dragged)?.on("end", dragended));
    
    // Entity rectangles
    node?.append("rect")?.attr("width", 150)?.attr("height", d => 30 + d?.fields?.length * 20)?.attr("fill", "var(--color-card)")?.attr("stroke", "var(--color-primary)")?.attr("stroke-width", 2)?.attr("rx", 8);
    
    // Entity names
    node?.append("text")?.attr("x", 75)?.attr("y", 20)?.attr("text-anchor", "middle")?.attr("fill", "var(--color-text-primary)")?.attr("font-weight", "600")?.attr("font-size", "14px")?.text(d => d?.name);
    
    // Entity fields
    node?.selectAll(".field")?.data(d => d?.fields)?.enter()?.append("text")?.attr("class", "field")?.attr("x", 10)?.attr("y", (d, i) => 40 + i * 20)?.attr("fill", "var(--color-text-secondary)")?.attr("font-size", "12px")?.text(d => d);
    
    function dragstarted(event, d) {
      d3?.select(this)?.raise()?.attr("stroke", "var(--color-primary)");
    }
    
    function dragged(event, d) {
      d.x = event?.x;
      d.y = event?.y;
      d3?.select(this)?.attr("transform", `translate(${d?.x}, ${d?.y})`);
      
      // Update connected links
      link?.selectAll("line")?.attr("x1", d => nodes?.find(n => n?.id === d?.source)?.x + 75)?.attr("y1", d => nodes?.find(n => n?.id === d?.source)?.y + 50)?.attr("x2", d => nodes?.find(n => n?.id === d?.target)?.x + 75)?.attr("y2", d => nodes?.find(n => n?.id === d?.target)?.y + 50);
      
      link?.selectAll("text")?.attr("x", d => (nodes?.find(n => n?.id === d?.source)?.x + nodes?.find(n => n?.id === d?.target)?.x) / 2 + 75)?.attr("y", d => (nodes?.find(n => n?.id === d?.source)?.y + nodes?.find(n => n?.id === d?.target)?.y) / 2 + 45);
    }
    
    function dragended(event, d) {
      d3?.select(this)?.attr("stroke", null);
    }
    
  }, [projectData]);

  const handleZoomIn = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.transform,
      d3?.zoomTransform(svg?.node())?.scale(Math.min(3, zoomLevel * 1.2))
    );
  };

  const handleZoomOut = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.transform,
      d3?.zoomTransform(svg?.node())?.scale(Math.max(0.5, zoomLevel * 0.8))
    );
  };

  const handleReset = () => {
    const svg = d3?.select(svgRef?.current);
    svg?.transition()?.call(
      d3?.zoom()?.transform,
      d3?.zoomIdentity
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${isFullscreen ? 'fixed inset-4 z-50' : 'relative'}`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Entity Relationship Diagram</h3>
          <p className="text-sm text-text-secondary">Interactive database schema visualization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            iconName="ZoomOut"
            iconSize={16}
          />
          <span className="text-sm text-text-secondary min-w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            iconName="ZoomIn"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            iconName="RotateCcw"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onDownloadPNG}
            iconName="Download"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            iconName={isFullscreen ? "Minimize2" : "Maximize2"}
            iconSize={16}
          />
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className={`bg-muted/30 overflow-hidden ${isFullscreen ? 'h-full' : 'h-96'}`}
      >
        <svg
          ref={svgRef}
          className="w-full h-full cursor-move"
          style={{ background: 'var(--color-muted)' }}
        />
      </div>
      
      <div className="p-4 bg-muted/50 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Move" size={16} />
            <span>Drag entities to reposition</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ZoomIn" size={16} />
            <span>Scroll to zoom</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MousePointer" size={16} />
            <span>Click and drag to pan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERDiagram;