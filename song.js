const left = {
    color: '#C24B99',
    nextNote: 0,
    notes: [
        {duration: 3, delay: 1},
        {duration: 3, delay: 2},
        {duration: 3, delay: 3},
        {duration: 3, delay: 4},
        {duration: 3, delay: 5},
        {duration: 3, delay: 6},
        {duration: 3, delay: 7},
        {duration: 3, delay: 8},
        {duration: 3, delay: 9},
        {duration: 3, delay: 10},
        {duration: 3, delay: 11},
        {duration: 3, delay: 12},
        {duration: 3, delay: 13},
        {duration: 3, delay: 14},
        {duration: 3, delay: 15},
        {duration: 3, delay: 16},
        {duration: 3, delay: 17},
        {duration: 3, delay: 18},
        {duration: 3, delay: 19},
        {duration: 3, delay: 20},
    ]
};

const up = {
    color: '#13FA05',
    nextNote: 0,
    notes: [
        {duration: 3, delay: 2},
        {duration: 3, delay: 3},
        {duration: 3, delay: 4},
        {duration: 3, delay: 5},
        {duration: 3, delay: 6},
    ]
}

const down = {
    color: '#01FFFF',
    nextNote: 0,
    notes: [
        {duration: 3, delay: 3},
        {duration: 3, delay: 4},
        {duration: 3, delay: 5},
        {duration: 3, delay: 6},
        {duration: 3, delay: 7},
    ]
}

const right = {
    color: '#F9393F',
    nextNote: 0,
    notes: [
        {duration: 3, delay: 4},
        {duration: 3, delay: 5},
        {duration: 3, delay: 6},
        {duration: 3, delay: 7},
        {duration: 3, delay: 8},
    ]
};

const song  = {
    duration: 20,
    tracks: [left, up, down, right],
};