import React from 'react';
import classnames from 'classnames';

const TextInputGroup = ({
    label,
    name,
    value,
    placeholder,
    type,
    onChange,
    error
}) => {
    return ( 
        
        <div className="form-group" style={{ height: "50px" }}>
        <label htmlFor={name} >{label}</label>
        <input
            type={type}
            name={name}
            className={classnames('form-control mb-4 border border-primary',{
                'is-invalid': error
            })}
            // className={classname}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        {error && <div className="invalid-feedback">{error}</div> }
        
    </div>
     );
};
 
export default TextInputGroup;