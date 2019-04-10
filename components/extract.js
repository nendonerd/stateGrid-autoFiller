const XP = require('xlsx-populate')
const fs = require('fs')


// rows = []
// filter = [col, identifier]
// col: ('A-Z'), identifier: ''
const extract = (path, sheett, startRow, cols=[], filter=[]) => {
    return XP.fromFileAsync(path)
        .then(
            workbook => {
                let sheet = workbook.sheet(sheett)
                let length = sheet.usedRange().value().length
                let data = []

                let [col, identifier] = filter
                let filters = (i) => {
                    if (filter.length === 2) {
                        return sheet.cell(col+i).value() === identifier
                    } else {
                        return true
                    }
                }

                for (let i=startRow; i<=length; i++) {
                    //if (i == startRow + 59) {console.log('bitch', cols, i, String(sheet.cell(cols[0]+i).value()), String(sheet.cell(cols[1]+i).value()))}
                    if (filters(i)) {
                        let feature = cols.reduce((prev, col) => {
                            //if (i == 59) {console.log(String(sheet.cell(col+i).value()))}
                            return prev += String(sheet.cell(col+i).value()).trim().replace(String.fromCharCode(8212), String.fromCharCode(8213))
                        }
                            
                        , '')
                        data.push(feature)
                        
                    }
                }
                return data
            }
        ).catch(err => console.log(err))
}

module.exports = extract