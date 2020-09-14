
function format_minutes(value) {
    const val = Math.round(value)
    const s = val % 60;
    const m = (val - s) / 60;
    return (m ? `${m} м. ` : '') + ( s ? `${s} c` : '')
}

export {format_minutes}