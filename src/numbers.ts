
export function numberToString(n: number) {
    let d = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
    }

    if (d[n] !== undefined) {
        return d[n]
    } else {
        return n.toLocaleString()
    }
}