import React from 'react';

const Region = ({ col, level, row, component, focus, data }) => {
    const WrappedComponent = component;
    const rowFocus = focus.row === row;
    const colFocus = focus.col === col;
    const widthClass = colFocus ? 'w-l' : 'w-s';
    const heightClass = rowFocus ? colFocus ? 'h-fit-content' : 'h-l' : 'h-s';
    return (<div className={`region pa2 relative col-${col} level-${level} ${widthClass}`} >
        {component &&
            <div className={""}>
                <WrappedComponent colFocus={colFocus} data={data} rowFocus={rowFocus} />
            </div>
        }
    </div>)
};

export default Region