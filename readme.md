

# WORKFLOW:

1. .sgcc -> tool    ----M
2. copy tool -> ./srcData/unfilled.xlsx   -----M
3. compare (source.xlsx & unfilled.xlsx)(B+J) => map -> copy $price from source.xlsx to tool according to map--fill.js 
4. copy tool -> ./srcData/filled.xlsx    -----M
5. read {fileName: A, amount: J, taxedPrice: N, taxedTotal: O} from filled.xlsx => $fileName.xlsx    ---generate.js (package)
6. upload $fileName.xlsx -> tool ---upload.js











































## 源数据包.sgcc -》 导入投标工具 // --手工操作
## 复制投标工具里的新表格至 -》daDiao/srcData/unfilled.xlsx // --手工操作
复制 源报价表 -》daDiao/srcData/source.xlsx -》 把不含税单价 -》 根据 特征码(source vs unfilled) 调整顺序 -》自动填入入投标工具 // --fill.js
投标工具自动依据单价生成 -》税后单价 & 税后总价 -》新表格
## 复制投标工具里的新表格至 -》filled.xlsx // --手工操作
根据 filled.xlsx 中  每包的 每行的 序号，数量，税后单价，税后总价 -》来生成 单价分析表（文件名为 $序号.xlsx） (按包名来分文件夹)  // --generate.js
按 单价分析表 文件名 的顺序 自动上传 // --upload.js