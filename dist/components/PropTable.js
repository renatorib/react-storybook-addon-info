'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropVal = require('./PropVal');

var _PropVal2 = _interopRequireDefault(_PropVal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stylesheet = {
  propTable: {
    marginLeft: -10,
    borderSpacing: '10px 5px',
    borderCollapse: 'separate'
  }
};

function isNotEmpty(obj) {
  return obj && (0, _keys2.default)(obj).length > 0;
}

var PropTypesMap = new _map2.default();
for (var typeName in _react2.default.PropTypes) {
  if (!_react2.default.PropTypes.hasOwnProperty(typeName)) {
    continue;
  }
  var type = _react2.default.PropTypes[typeName];
  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
}

function renderDocgenPropType(propType) {
  if (!propType) {
    return 'unknown';
  }

  var name = propType.name;

  switch (name) {
    case 'arrayOf':
      return propType.value.name + '[]';
    case 'instanceOf':
      return propType.value;
    case 'union':
      return propType.raw;
    default:
      return name;
  }
}

function hasDocgen(type) {
  return isNotEmpty(type.__docgenInfo);
}

function propsFromDocgen(type) {
  var props = null;

  var docgenInfo = type.__docgenInfo || {};
  var docgenInfoProps = docgenInfo.props;

  if (docgenInfoProps) {
    props = {};
    for (var propName in docgenInfoProps) {
      if (!docgenInfoProps.hasOwnProperty(propName)) {
        continue;
      }
      var docgenInfoProp = docgenInfoProps[propName];
      var defaultValueDesc = docgenInfoProp.defaultValue || {};
      var propType = docgenInfoProp.flowType || docgenInfoProp.type || 'other';

      props[propName] = {
        property: propName,
        propType: renderDocgenPropType(propType),
        required: docgenInfoProp.required,
        description: docgenInfoProp.description,
        defaultValue: defaultValueDesc.value
      };
    }
  }
  return props;
}

function propsFromPropTypes(type) {
  var props = null;

  if (type.propTypes) {
    props = {};
    for (var property in type.propTypes) {
      if (!type.propTypes.hasOwnProperty(property)) {
        continue;
      }
      var typeInfo = type.propTypes[property];
      var propType = PropTypesMap.get(typeInfo) || 'other';
      var required = typeInfo.isRequired === undefined ? 'yes' : 'no';
      props[property] = { property: property, propType: propType, required: required };
    }
  }

  if (type.defaultProps) {
    for (var _property in type.defaultProps) {
      if (!type.defaultProps.hasOwnProperty(_property)) {
        continue;
      }
      var value = type.defaultProps[_property];
      if (value === undefined) {
        continue;
      }
      if (!props[_property]) {
        props[_property] = { property: _property };
      }
      props[_property].defaultValue = value;
    }
  }
  return props;
}

var PropTable = function (_React$Component) {
  (0, _inherits3.default)(PropTable, _React$Component);

  function PropTable() {
    (0, _classCallCheck3.default)(this, PropTable);
    return (0, _possibleConstructorReturn3.default)(this, (PropTable.__proto__ || (0, _getPrototypeOf2.default)(PropTable)).apply(this, arguments));
  }

  (0, _createClass3.default)(PropTable, [{
    key: 'render',
    value: function render() {
      var type = this.props.type;

      if (!type) {
        return null;
      }

      var props = hasDocgen(type) ? propsFromDocgen(type) : propsFromPropTypes(type);

      if (isNotEmpty(props)) {
        var array = (0, _values2.default)(props);
        array.sort(function (a, b) {
          return a.property > b.property;
        });

        return _react2.default.createElement(
          'table',
          { style: stylesheet.propTable },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                'property'
              ),
              _react2.default.createElement(
                'th',
                null,
                'propType'
              ),
              _react2.default.createElement(
                'th',
                null,
                'required'
              ),
              _react2.default.createElement(
                'th',
                null,
                'default'
              ),
              _react2.default.createElement(
                'th',
                null,
                'description'
              )
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            array.map(function (row) {
              return _react2.default.createElement(
                'tr',
                { key: row.property },
                _react2.default.createElement(
                  'td',
                  null,
                  row.property
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  row.propType
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  row.required
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  row.defaultValue === undefined ? '-' : _react2.default.createElement(_PropVal2.default, { val: row.defaultValue })
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  row.description
                )
              );
            })
          )
        );
      } else {
        return _react2.default.createElement(
          'small',
          null,
          'No propTypes defined!'
        );
      }
    }
  }]);
  return PropTable;
}(_react2.default.Component);

exports.default = PropTable;


PropTable.displayName = 'PropTable';
PropTable.propTypes = {
  type: _react2.default.PropTypes.func
};