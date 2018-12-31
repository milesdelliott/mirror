const url = new URL(window.location.href);
const demo = url.searchParams.get("demo");

let state = {
    col: 3,
    row: 3
};

const nodeMap = (el) => (fn) =>
    [].map.call(el, fn);


const directionMap = {
    37: function(el) {
        if (state.col > 1) state.col--;
        setFocus('col')(state.col)
    },
    38: function(el) {
        if (state.row > 1) state.row--;
        setFocus('row')(state.row)
    },
    39: function(el) {
        if (state.col < 3) state.col++;
        setFocus('col')(state.col)
    },
    40: function(el) {
        if (state.row < 3) state.row++;
        setFocus('row')(state.row)
    },
    reset: function (el) {
        unsetFocus('row');
        unsetFocus('col')
    }
};

const elGroups = {
    col: {
        1: document.getElementsByClassName('col-1'),
        2: document.getElementsByClassName('col-2'),
        3: document.getElementsByClassName('col-3'),
    },
    row: {
        1: document.getElementsByClassName('row-1'),
        2: document.getElementsByClassName('row-2'),
        3: document.getElementsByClassName('row-3'),
    }
};

const toggles = {
    col: {
        1: nodeMap(elGroups.col[1]),
        2: nodeMap(elGroups.col[2]),
        3: nodeMap(elGroups.col[3]),
    },
    row: {
        1: nodeMap(elGroups.row[1]),
        2: nodeMap(elGroups.row[2]),
        3: nodeMap(elGroups.row[3]),
    }
};

const classes = {
    col:['w-s', 'w-m', 'w-l'],
    row: ['h-s', 'h-m', 'h-l']
};

const setDimension = d => v => i => {
    i.classList.remove(...classes[d]);
    i.classList.add(v)
};


const setFocus = d => n => {
    [1,2,3].map(v => {
        toggles[d][v](setDimension(d)(classes[d][n === v ? 2 : 0]))
    });
};

const unsetFocus  = d => {
    [1,2,3].map(v => {
        toggles[d][v](setDimension(d)(classes[d][v === 3 ? 2 : 0]))
    });
};

if (demo) {
    setTimeout(() => {
        directionMap[37]();
        setTimeout(() => {
            directionMap[39]();
            setTimeout(() => {
                directionMap[38]();
                setTimeout(() => {
                    directionMap[40]();

                }, 2000)
            }, 3000)
        }, 3000)
    }, 5000)
}

export { directionMap }