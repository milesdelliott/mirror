import React from 'react';

const Region = ({ col, level, row, component, focus }) => {
    const WrappedComponent = component;
    const rowFocus = focus.row === row;
    const heightClass = rowFocus ? 'h-l' : 'h-s';
    const colFocus = focus.col === col;
    const widthClass = colFocus ? 'w-l' : 'w-s';
    return (<div className={`region pa2 col-${col} row-${row} level-${level} ${heightClass} ${widthClass}`}>
        {component &&
            <WrappedComponent colFocus={colFocus} rowFocus={rowFocus} />
        }
    </div>)
}

export default Region