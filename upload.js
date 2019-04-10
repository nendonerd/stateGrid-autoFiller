/*
1. move to ctu
2. click
3. move to browse
4. click
5. type $fileName
6. tap enter
8. move to upload
9. click
10. move to close
11. click 
12. move to nextRow
13. click

15. else -> repeat
*/

const robot = require('robotjs')
const fs = require('fs')

const btns = {
    clickToUpload: [295, 212],
    nextRow: [410, 217],
    browse: [518, 190],
    upload: [594, 189],
    close: [649, 153]
}
 
const click = ([x, y]) => {
    robot.moveMouse(x, y)
    robot.mouseClick()
}

const delay = (ms = 20) => {
    return new Promise(res => setTimeout(res, ms))
}

const upload = async (fileName) => {
    
    click(btns.clickToUpload)
    await delay(200)
    click(btns.browse)
    await delay(1000)
    robot.typeString(fileName)
    robot.keyTap('enter')
    await delay(100)
    click(btns.upload)
    await delay(1000)
    click(btns.close)
    // console.log('clicked!')
    await delay(1000)  // important! if delay too short, the window won't have enough time to shut down
    click(btns.nextRow)
    // console.log('nextRow!')
    await delay()
}

// let fileNames = []

fs.readdir('./upload/包1', (err, fileNames) => {//改
    fileNames.sort((a, b) => {
        let [, numA] = a.match(/\.(.*)\./)
        let [, numB] = b.match(/\.(.*)\./)
        return +numA - +numB
    })
    fileNames = fileNames.slice(1)  //exclude the first file
    let run = async () => {
        for (let fileName of fileNames) {
            await upload(fileName)
            console.log(`upload ${fileName} successfully`)
        }
    }
    run()
    
})


