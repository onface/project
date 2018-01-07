var fs = require('fs')
var path = require('path')
var dir = process.env.dir || 'icons'
var cssPath = path.join(__dirname, `../m/${dir}/iconfont.css`)
var readPath
var distPath = path.join(__dirname, `../m/${dir}/index.less`)
if (fs.existsSync(cssPath)) {
    readPath = cssPath
}
else {
    readPath = distPath
}
var css = fs.readFileSync(readPath, 'utf-8').toString()
if(/ICONFONT\sCOMPLIED/.test(css)) {
    console.log('#################')
    console.error('iconfont been compiled, please do not repeat to compile.\r\nconfig/iconfont.js: ' + readPath)
    console.log('#################')
}
else {
    var lessSource = css.replace(/\.icon-(.*):before\s*{\s*content:\s*"([^"]+)";\s*}/g, [
        '.icon-$1(){&:before { content: "$2"; .iconfont;}}',
        '.icon-$1A(){&:after { content: "$2"; .iconfont;}}',
        '@icon-$1: "$2";'
        ].join('\n'))
        .replace(/\.iconfont/g, '.iconfont()')
        .replace(/font-size:16px;/g, '')
        .replace(/\?t=\d*(#[^']+)?/g,'$1')
        .replace(/url\(\'iconfont/g, "url('./iconfont")
    lessSource = '// ICONFONT COMPLIED\r\n' + lessSource
    console.log('------ less ---------')
    console.log(lessSource)
    console.log('------ less ---------')
    fs.writeFileSync(distPath, lessSource, 'utf-8')
    console.log(distPath + ' writeFile done!')
}
