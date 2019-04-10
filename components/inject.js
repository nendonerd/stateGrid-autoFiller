const robot = require('robotjs')


const inject = (data) => {

    robot.moveMouse(50, 15)
    robot.mouseClick()

    let errors = []
    data.forEach((datum, i) => {

        // Error handling:
        if (!datum) {
            datum = 0
            errors.push({
                msg: `8.${i+1}`,
                val: datum
            })
        }

        for (let i=0; i<8; i++) {
            robot.keyTap('backspace')
        }
        robot.typeString(datum)
        robot.keyTap('enter')
    })


    if (errors.length < 1) {
        console.log('Inject successfully!')
    } else {
        console.log('')
        console.log('Fucking Error ocurrs !!!!!!!!!!!!!!!!!!!!!!')
        console.log(errors)
        console.log('have been set to default 0 instead!')
    }
    console.log(`Inject data size: ${data.length}`)
}


module.exports = inject