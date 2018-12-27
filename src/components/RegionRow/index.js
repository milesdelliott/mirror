import React from 'react';
import Region from '../Region'
const RegionRow = ({ regions, level, row, components, focus, data }) => {
    const rowFocus = focus.row === row;
    const heightClass = rowFocus ? 'h-l ' : 'h-s';
    return (<div className={`mirror-row overflow-hidden ease-all flex-auto flex flex-row flex-nowrap row-${row } ${heightClass}`} id={`mirror-row-${row}`} >
        {regions.map((r, col) =>
            <Region  key={col} focus={focus} row={row} col={col + 1} component={components[r.name]} data={data} level={r.level} />
        )}
    </div>)
};

export default RegionRow