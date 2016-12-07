import React from 'react';

const TextField = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
);

Object.assign(TextField, {
  displayName: 'TextField',
  propTypes: {
    /** Single line comment: This is label description */
    value: React.PropTypes.string.isRequired,
    /*
     * Multiple lines comment: This is style description
     * Must be in object
     */
    onChange: React.PropTypes.func.isRequired,
  },
});

export default TextField;
