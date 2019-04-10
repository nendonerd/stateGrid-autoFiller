const extract = require('./components/extract.js')
const inject = require('./components/inject.js')

// extract syntax:  extract( './path/xxx.xlsx' , 'whichSheet', startingRow, ['colsToExtract'] [, filter['whichCol', 'shouldBeWhatValue'] ])

////////////
// 要改的东西：
////////////

// 源数据source：
const source_whichSheet = '包6'     // 哪个表
const source_startingRow = 2         // 从第几行开始
const source_identiCols = ['B', 'I'] // 比对码所在的列
const source_priceCol = ['M']        // 单价所在的列
// 待填单价的国家电网表unfilled：
const unfilled_whichSheet = 'Sheet1' // 哪个表
const unfilled_startingRow = 1       // 从第几行开始
const unfilled_identiCols = ['B', 'J'] // 比对码所在的列


compare = async () => {
    let unfilledIds = await extract('./srcData/unfilled.xlsx', unfilled_whichSheet, unfilled_startingRow, unfilled_identiCols)              
    let sourceIds = await extract('./srcData/source.xlsx', source_whichSheet , source_startingRow, source_identiCols) //包      // adjust here !

    //console.log(sourceIds[59])

    if (unfilledIds.length !== sourceIds.length) {
        console.log('FUCKING WARNING: Identifiers\' SIZE NOT MATCH!!!!')
        console.log('unfilledIds length', unfilledIds.length)
        console.log('sourceIds length', sourceIds.length)
    }

    let map = []
    let cache = new Set()

    //let debugi = new Set()
    //let debugj = new Set()

    sourceIds.forEach((excel,j) => {
        
        for (let [i, app] of unfilledIds.entries()) {
            //if (app === "接续金具-绝缘穿刺接地线夹,10kV,240mm2,16mm26") debugi.add(i)
            //if (excel === "接续金具-绝缘穿刺接地线夹,10kV,240mm2,16mm26") debugj.add(j)
            if (app === excel) {
                if (cache.has(i)) {
                    continue
                }
                map[j] = i
                cache.add(i)
                break 
            }

           
        }
    })
    //console.log('i', debugi)
    //console.log('j', debugj)
    map = [...map]

    if (map.some(v => v === undefined)) {

        console.log('Warning: some items does not find a matching index')
        // console.log(map)
        
        for (let [j, i] of map.entries()) {
            if (i === undefined) {
                // console.log(`index: ${i+1}, value: ${unfilledIds[i]}`)
                console.log(`index: ${j}, value: ${sourceIds[j]}`)
                // console.log(unfilledIds[i] === sourceIds[136])
                
            }
        }
        
        console.log(`map's length is ${map.length}`)
        
    // } else if (map.length !== unfilledIds.length || map.length !==sourceIds.length) {
    //     console.log('WARNING: size unmatch')
    } else {
        let sourcePrices = await extract('./srcData/source.xlsx', source_whichSheet, source_startingRow, source_priceCol)  // adjust here !
        let toolPrices = []
        for (let [j, val] of sourcePrices.entries()) {
            let i = map[j]
            toolPrices[i] = val
        }
        toolPrices = [...toolPrices]
        // console.log('toolPrices', toolPrices)



        inject(toolPrices)
        console.log(`map's length is ${map.length}`)
        // console.log(map)
    }
    
}

compare()







// DEBUG

// console.log(map)

// console.log('unfilledIds: ', unfilledIds.length)
// console.log('sourceIds: ', sourceIds.length)

// console.log('Error! Their identifiers did not match!')
// for (let [j,i] of map.entries()) {
    //     // console.log(j, i)
    
    //     if (i === undefined) {
//         console.log('-------------------------------------------------')
//         console.log(`sourceIds-> ${j}: ${sourceIds[j]}`)
//         // console.log(`unfilledIds-> ${i}: ${unfilledIds[i]}`) 
//     }
// }
// console.log('-------------------------------------------------')

// isEqual(2, 15, sourceIds, unfilledIds)



// const isEqual = (excelRow, appRow, sourceIds, unfilledIds) => {
//     console.log(`sourceIds->row${excelRow}: `, sourceIds[excelRow-1])
//     console.log(`unfilledIds->row${appRow}: `, unfilledIds[appRow-1])
//     console.log('isEqual: ', sourceIds[excelRow-1] === unfilledIds[appRow-1])

//     console.log('Differences: ')
//     let i = 0
//     while (sourceIds[excelRow-1][i]) {
//         if (sourceIds[excelRow-1].charCodeAt(i) !== unfilledIds[appRow-1].charCodeAt(i) ) {

//             console.log(`index: ${i}, charCode: ${sourceIds[excelRow-1].charCodeAt(i)} || ${unfilledIds[appRow-1].charCodeAt(i)}, char: ${sourceIds[excelRow-1][i]} ||  ${unfilledIds[appRow-1][i]}`)
//         }
//         i++
//     }
// }


// 在么？
// 手机没电了 :(
// 顺路去买菜接秀婷了