export let initial_line = {
    type: 'line',
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    line: {
        color: 'rgba(255, 255, 255, 0)',
        width: 3,
        dash: 'solid'
    },
    is_draw: false,
}

export let horizontal_template = {
    draw_type: "horizontal",
    type: 'line',
    line: {
        color: 'rgb(255, 255, 255)',
        width: 3,
        dash: 'solid'
    },
    is_draw: true,
}

export let vertical_template_red = {
    draw_type: "vertical",
    type: 'line',
    line: {
        color: 'rgb(255, 0, 0)',
        width: 3,
        dash: 'solid'
    },
    is_draw: true,
}

export let vertical_template_purple = {
    draw_type: "vertical",
    type: 'line',
    line: {
        color: 'rgb(136, 32, 240)',
        width: 3,
        dash: 'solid'
    },
    is_draw: true,
}