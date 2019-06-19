import React from 'react';

const maxDepth = 5;

const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;

var treeData = require('../reqtreedata.json'); //(with path)

export default treeData;
