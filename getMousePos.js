const robot = require('robotjs')


setInterval(() => {
    let pos = robot.getMousePos()
    console.log(`mouse pos-> x: ${pos.x}, y: ${pos.y}`)
}, 500)
