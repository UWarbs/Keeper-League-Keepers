/**
*Class that searches through DB of players. Created by github user: mathieudutour
*This version is modified enough to take it out of the npm module for future update issues.
*To be replaced by elastic saerch implementation down the line.
*/
'use strict'; 
var React = require('react');
var PureRenderMixin = require('pure-render-mixin').PureRenderMixin;


function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Search = React.createClass({
	mixins: [PureRenderMixin],
  propTypes: {
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    caseSensitive: React.PropTypes.bool,
    defaultStyle: React.PropTypes.bool,
    throttle: React.PropTypes.number,
    filterKeys: React.PropTypes.oneOf([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    value: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      className: '',
      onChange: function() {},
      caseSensitive: false,
      defaultStyle: true,
      throttle: 5
    };
  },

  getInitialState: function() {
    return {
      searchTerm: this.props.value || ''
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      var e = {
        target: {
          value: nextProps.value
        }
      };
      this.updateSearch(e);
    }
  },

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   maybe
	// },

  render: function() {
  	var generatedElements;
    var inputProps = _objectWithoutProperties(this.props, ["className", "onChange", "caseSensitive", "throttle", "filterKeys", "value", "onError"]);
    inputProps.type = inputProps.type || 'search';
    inputProps.value = this.props.value;  //change from state.searchTerm to props.value
    inputProps.onChange = this.updateSearch
    inputProps.placeholder = inputProps.placeholder || 'Search';

   	if (this.props.defaultStyle) {
   		inputProps.className = 'search-field';
   		generatedElements = React.createElement('div', {className: 'search-input ' + this.props.className},
	         React.createElement('div', {className: 'search-wrapper'},
	           React.createElement('span', {className: 'search-icon'}, String.fromCharCode(9906)),
	           React.createElement('input', inputProps)
	         )
	       );
   	}else {
   		inputProps.className = this.props.className || 'search-field';
   		generatedElements =  React.createElement('input', inputProps);
   	}
   	
   	return (
   		generatedElements
	   );
   },

  updateSearch: function(e) {
    var searchTerm = e.target.value;
    this.setState({
      searchTerm: searchTerm
    }, function() {
      if (this._throttleTimeout) {
        clearTimeout(this._throttleTimeout);
      }

      this._throttleTimeout = setTimeout(this.props.onChange, this.props.throttle, searchTerm);
    }.bind(this));
  },

  filter: function(keys) {
    return Search.filter(this.state.searchTerm,
                  keys || this.props.filterKeys, this.props.caseSensitive);
  },

  statics: {
    filter: function(term, keys, caseSensitive) {
      return function(item) {
        if (term === '') {return true;}

        if (!caseSensitive) {
          term = term.toLowerCase();
        }

        var terms = term.split(' ');
        var foundCount = 0;
        if (keys) {
          if (typeof keys === 'string') {
            keys = [keys];
          }

          terms.forEach(function(term) {

            // allow search in specific fields with the syntax `field:search`
            var currentKeys;
            if (term.indexOf(':') > -1) {
              var searchedField = term.split(':')[0];
              term = term.split(':')[1];
              currentKeys = keys.filter(function(key) {
                return key.indexOf(searchedField) > -1;
              });
            } else {
              currentKeys = keys;
            }

            var found = false;
            for (var i = 0; i < currentKeys.length; i++) {
              var values = _getValuesForKey(currentKeys[i], item);
              values.forEach(function(value) {
                try {
                  if (value && value.search(term) !== -1) {
                    found = true;
                  }
                } catch (e) {}
              });

              if (found) {
                break;
              }
            }

            if (found) {
              foundCount++;
            }
          });
        } else {
          terms.forEach(function(term) {
            try {
              var stringValue = item.toLowerCase();
              if (stringValue.search(term) !== -1) {
                foundCount++;
              }
            } catch (e) {}
          });
        }

        return foundCount === terms.length;
      };
    }
  }
});

var _getValuesForKey = function(key, _item) {
  var keys = key.split('.');
  var results = [_item];
  keys.forEach(function(_key) {
    var tmp = [];
    results.forEach(function(result) {
      if (result) {
        if (result instanceof Array) {
          result.forEach(function(res) {
            tmp.push(res[_key]);
          });
        } else {
          tmp.push(result[_key]);
        }
      }
    });

    results = tmp;
  });

  return results.map(function(result) {
    if (typeof result === 'string') {
      return result.toLowerCase();
    } else {
      return null;
    }
  });
};

module.exports = Search;