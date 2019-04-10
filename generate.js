const XP = require('xlsx-populate')
const fs = require('fs')
const deleteShit = require('./components/deleteShit.js')
const extract = require('./components/extract.js')

// extract syntax:  extract( './path/xxx.xlsx' , 'whichSheet', startingRow, ['colsToExtract'] [, filter['whichCol', 'shouldBeWhatValue'] ])

const run = async () => {

  //  read {fileName: A, amount: J, taxedPrice: N, taxedTotal: O} from filled.xlsx
  const fileNames = await extract('./srcData/filled.xlsx', 'Sheet1', 1, ['A'])
  const units = await extract('./srcData/filled.xlsx', 'Sheet1', 1, ['I'])
  const amounts = await extract('./srcData/filled.xlsx', 'Sheet1', 1, ['J'])
  const taxedPrices = await extract('./srcData/filled.xlsx', 'Sheet1', 1, ['N'])
  const taxedTotals = await extract('./srcData/filled.xlsx', 'Sheet1', 1, ['O'])

  const package = '包1'   //改

  
  XP.fromFileAsync('./srcData/template.xlsx')  
    .then(
      workbook => {
        let temp = workbook.sheet('Sheet1')

        try {deleteShit(`./upload/${package}`)} catch(err) {}
        fs.mkdirSync(`./upload/${package}`)
        
        for (let i=0; i< fileNames.length; i++) { 

          // data
          let fileName = fileNames[i]
          // fix 8.1 to 8.10
          if (i >= 9) {
            let str = String(fileName)
            
            let [a, b] = str.split('.')

            b = +b
            
            if (b != i+1) {
              b = i+1
            }

            fileName = a + '.' + b
          }
          let unit = units[i]
          let amount = amounts[i]
          let taxedPrice = taxedPrices[i]
          let taxedTotal = taxedTotals[i]
  
          // fill data in template
          temp.cell('A2').value(`招标编号：GWSC201809WZ02(K) 分标编号:GWSC201809WZ02(K)-JJ(K)  包号：${package}`)
          temp.cell('A3').value(`项目名称：国网四川省电力公司集中招标2018年第二次协议库存招标采购项目`)
          temp.cell('F7').value(unit)
          //temp.cell('F8').value(unit)
          temp.cell('G7').value(amount)
          //temp.cell('G8').value(amount)
          temp.cell('H21').value(taxedPrice)
          temp.cell('I23').value(taxedTotal)

          // auto calc & fill
          temp.cell('H7').value(temp.cell('H21').value() * 0.8)
          //temp.cell('H8').value(temp.cell('H21').value() * 0.1)
          temp.cell('I7').value(temp.cell('H7').value() * temp.cell('G7').value())
          //temp.cell('I8').value(temp.cell('H8').value() * temp.cell('G8').value())
          //- temp.cell('I8').value()//tiefujian
          temp.cell('I18').value(temp.cell('I23').value() * 0.1)
          temp.cell('I19').value(temp.cell('I23').value() - temp.cell('I7').value()  - temp.cell('I18').value())

          // save file
          workbook.toFileAsync(`./upload/${package}/${fileName}.xlsx`)
          
        }
      }
    )
} 

run()