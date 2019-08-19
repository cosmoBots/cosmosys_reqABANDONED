import React, { Component } from 'react';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';

import axios from 'axios';

//import treeData from './treeData';

const maxDepth = 5;

const alertNodeInfo = ({ node, path, treeIndex }) => {
  const objectString = Object.keys(node)
    .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
    .join(',\n   ');

  global.alert(
    'Info passed to the button generator:\n\n' +
      `node: {\n   ${objectString}\n},\n` +
      `path: [${path.join(', ')}],\n` +
      `treeIndex: ${treeIndex}`
  );
};

// Renders a basic button, disabled with the "disabled" property
function Button(props) {
  return (
      <button disabled={props.disabled} onClick={!props.disabled?props.onClick:null}>{props.label}</button>
    );
}

function openActionWindow(url) {
  return window.open(url, 'RedmineAction', 'height=250,width=250');
}

function ActionButton(props) {
  const styles = ['btn', 'btn-outline-success', props.type];
  return (
    <button
                  className={styles} 
                  style={{
                    verticalAlign: 'middle',
                  }}
                  disabled={props.disabled}
                  onClick={!props.disabled?props.onClick:null}>
                  {props.label}
                </button>
    );
}

function simplifyNode(nodes) {

  return nodes.reduce((acc, n) => {
      //console.log("simplifyNode()", acc, n)

      var obj = {
        id: n.id
      }

      if (n.children && n.children.length ) {
        obj.children = simplifyNode(n.children);
      }

      acc.push(obj);
      return acc;
    }, []);
}

export default class App extends  Component {
  state = {
    searchString: '',
    searchFocusIndex: 0,
    searchFoundCount: null,
    treeData: null,
    treeHasChanges: false,
  };

 componentDidMount = () => {
    this.retrieveTree();
 };

  retrieveTree = () => {
    axios.get(`${window.location.pathname}.json`, { crossdomain: true })
      .then(res => {
        //console.log("reqtreedata.json", res.data);
        this.setState({
          treeData: res.data,
          returnUrl: res.data[0].return_url
        });
      })
  };

  refreshTree = () => {
    this.setState({
              treeData: null,
              actionWindow: null,
              actionNode: null,
            }, this.retrieveTree
          );
  }

  onActionButtonClick = (node, url) => {
    const actionWindow = openActionWindow(url);

    this.setState( {
      actionWindow: actionWindow,
      actionNode: node
    });

    var timer = setInterval(() => {   
      if (actionWindow.closed) {  
          clearInterval(timer);  
          this.refreshTree();
      }  
    }, 500); 
  };

  doCommitJSON = () => {
    console.log("hola commit!", this.state.returnUrl, simplifyNode(this.state.treeData));

    axios.post(this.state.returnUrl, { 
          structure: simplifyNode(this.state.treeData)
        })
      .then(res => {
        console.log(res);
        console.log(res.data);

        this.refreshTree();
      })
  };

  handleTreeOnChange = (treeData) => {
    this.setState({
      treeData: treeData,
      treeHasChanges: true
    });
    console.log(treeData);
  };

  handleSearchOnChange = e => {
    this.setState({
      searchString: e.target.value,
    });
  };

  selectPrevMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1,
    });
  };

  selectNextMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0,
    });
  };

  toggleNodeExpansion = expanded => {
    this.setState(prevState => ({
      treeData: toggleExpandedForAll({
        treeData: prevState.treeData,
        expanded,
      }),
    }));
  };

  renderTree = () => {

console.log("renderTree()", !!this.state.treeData)

    if (this.state.treeData) {

      const {
        treeData,
        treeHasChanges,
        searchString,
        searchFocusIndex,
      } = this.state;

      return (
        <div style={{ height: '100vh' }}>
          <SortableTree
              treeData={treeData}
              onChange={this.handleTreeOnChange}
              onMoveNode={({ node, treeIndex, path }) =>
                global.console.debug(
                  'node:',
                  node,
                  'treeIndex:',
                  treeIndex,
                  'path:',
                  path
                )
              }
              maxDepth={maxDepth}
              searchQuery={searchString}
              searchFocusOffset={searchFocusIndex}
              canDrag={({ node }) => !node.noDragging}
              canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
              searchFinishCallback={matches =>
                this.setState({
                  searchFoundCount: matches.length,
                  searchFocusIndex:
                    matches.length > 0 ? searchFocusIndex % matches.length : 0,
                })
              }
              isVirtualized={true}
              generateNodeProps={rowInfo => ({
                buttons: [
                  <ActionButton
                    type="edit"
                    disabled={treeHasChanges}
                    label="Edit"
                    onClick={() => { this.onActionButtonClick(rowInfo.node, rowInfo.node.issue_edit_url);} }
                  />,
                  <ActionButton
                    type="new"
                    disabled={treeHasChanges}
                    label="New"
                    onClick={() => { this.onActionButtonClick(rowInfo.node, rowInfo.node.issue_new_url);} }
                  />,
                  <ActionButton
                    type="show"
                    disabled={treeHasChanges}
                    label="Show"
                    onClick={() => { this.onActionButtonClick(rowInfo.node, rowInfo.node.issue_show_url);} }
                  />,
                ],
              })}
            />
          </div>
        );
      } else {
        return (<span>Loading tree...</span>);
      }
  };

  renderVeil = (content) => {
    if (this.state.actionWindow) {
      return (content)
    } else {
      return (content)
    }
  };

  render() {
console.log("render()")

      const {
        searchFocusIndex,
        searchFoundCount,
        actionWindow,
      } = this.state;

    return this.renderVeil(
      <div className='wrapper'>
        <div className="bar-wrapper">
          <button onClick={this.toggleNodeExpansion.bind(this, true)}>
            Expand all
          </button>
          <button
            className="collapse"
            onClick={this.toggleNodeExpansion.bind(this, false)}
          >
            Collapse all
          </button>
          <label>Search: </label>
          <input onChange={this.handleSearchOnChange} />
          <button className="previous" onClick={this.selectPrevMatch}>
            Previous
          </button>
          <button className="next" onClick={this.selectNextMatch}>
            Next
          </button>
          <label>
            {searchFocusIndex} / {searchFoundCount}
          </label>
          <Button label="commit" disabled={!this.state.treeHasChanges} onClick={this.doCommitJSON}/>
        </div>
        <div className="tree-wrapper">
          { this.renderTree() }
        </div>
      </div>
    );
  }
}
