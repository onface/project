const markrun = require('markrun')
const config = require('./getConfig.js')()
const fs = require('fs')
const less = require('less')
const lodash = require('lodash')
const path = require('path')
const json5 = require('json5')
const glob = require("glob")
const minimatch = require("minimatch")
const isAbsoluteUrl = require('is-absolute-url')

const htmlEntryScriptParser = function (content, file) {
    var matchScript = /\<script(.*)?src="(.*)?"\s*\>\<\/script\>/g
    return content.replace(matchScript, function (source, attr, src ) {
        if (isAbsoluteUrl(src)) {
            return source
        }
        var url = path.join(file.dirname, src).replace(fis.project.getProjectPath(), '')
        var hasMatch = config.user.entry.some(function(item){
            return minimatch(url.replace(/^\//, '') , item, {dot: true})
        })
        var html = source
        if (hasMatch) {
            html = `<script>
                        document.write('<scr'+ 'ipt${attr}src="${url}"></scr' + 'ipt>')
                    </script>`
        }
        return html
    })
}

// fis.match('**.md', {
//     parser:[
//         function markrunParser(content,file){
//             var getClassNames = function (html) {
//                 var classNames = []
//                 html.replace(/class=\"([^"]*?)\"/g, function (_, $1) {
//                     if ($1) {
//                         classNames = classNames.concat($1.split(' '))
//                     }
//                 })
//                 classNames = lodash.uniq(classNames)
//                 classNames = classNames.map(function (item) {
//                     item = '.' + item
//                     return item
//                 })
//                 return classNames
//             }
//             var html = markrun(
//                 content,
//                 {
//                     templateDefaultData: userConfig.moduleTemplateDefaultData ,
//                     // 套用markrun模板 (此处读取模板 防止修改公用模板的缓存问题)
//                     template: fs.readFileSync(__dirname + '/../m/template.html').toString(),
//                     compile: {
//                         'demo': require('markrun-themes/box-compile-replace'),
//                         'code': function(data, options, info){
//                             data = json5.parse(data)
//                             var fullpath = path.join(path.dirname(info.filepath),data.file)
//                             info.deps = info.deps || []
//                             info.deps.push(fullpath)
//                             var code = fs.readFileSync(fullpath).toString()
//                             code = '<div class="markrun-source-pre" >' + markrun.markdownParserHighlight(code) + '</div>'
//                             if(typeof data.run === 'undefined'){
//                                 data.run = true
//                             }
//                             if(data.run){
//                                 code = code +'<script data-markrun-lastrun="true" src="'+ data.file + '"></scr' + 'ipt>'
//                             }
//                             return {
//                                 lang: 'replace',
//                                 code: code
//                             }
//                         },
//                         'less': function (source, data, info) {
//                             var code = ''
//                             less.render(
//                                 source,
//                                 { async: false },
//                                 function (e, output) {
//                                     code = output.css
//                                 }
//                             )
//                             return {
//                                 lang: 'css',
//                                 code: code ,
//                                 source: source
//                             }
//                         },
//                         'html': function (code, data) {
//                             var source = code
//                             var classNames = getClassNames(source)
//                             source = source + '\n<!-- class:\n' + classNames.join(' {}\n') + ' {}\n-->'
//                             return {
//                                     lang: 'html',
//                                     code: code,
//                                     source: source
//                             }
//                         }
//                         // 'js' : function (source, data, info) {
//                         //     var code = babel.transform(source, {
//                         //         presets: [
//                         //              require('babel-preset-es2015')
//                         //         ]
//                         //     }).code
//                         //     return {
//                         //         lang: 'js',
//                         //         code: code,
//                         //         // source not required
//                         //         source: source
//                         //     }
//                         // }
//                     }
//                 },
//                 {
//                     filepath: file.fullname
//                 }
//             )
//             // 添加livere监听
//             // content +=  `<script>
//                     //    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
//                     //    ':`+config.liverePort+`/livereload.js?snipver=1"></' + 'script>')
//                     //  </script>`
//             return html
//         },
//         htmlEntryScriptParser
//     ],
//     useCache:false, // true : 文件使用编译缓存
//     isHtmlLike: true, // 最终会被构建成 html 语法
//     rExt:'html'
// })
fis.match('**.html', {
    parser: [
        htmlEntryScriptParser
    ]
})
fis.match('m/template.html', {
    release: false
})
//
// fis.match('**.less', {
//     parser: fis.plugin('less-2.x',userConfig.less),
//     rExt:'css'
// })
// fis.match('**.vue',{
//     release:false
// })
// fis.match('**.js',{
//     release:false
// })
// fis.match('{deploy/**,compile/**,package.json,yarn.lock,config.js}', {
//   release: false
// })
//
// fis.hook(require('fis3-hook-relative'))
// fis.match('**',{
//     relative: userConfig.relative
// })
//
// userConfig.vendorFile.forEach(function (file) {
//     fis.match(file, {
//         release: true
//     }, 999)
// })
