const markrun = require('markrun')
const config = require('./getConfig.js')()
const fs = require('fs')
const less = require('less')
const path = require('path')
const json5 = require('json5')
const glob = require("glob")
const minimatch = require("minimatch")
const isAbsoluteUrl = require('is-absolute-url')
const util = require("./util")
/**
 * relative
 */
if (config.user.online.relative) {
    fis.hook(require('fis3-hook-relative'))
    fis.match('**',{
        relative: true
    })
}

/**
 * md html
 */
const htmlEntryScriptParser = function (content, file) {
    if (fis.project.currentMedia() !== 'dev'){
        return content
    }
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
    }).replace(/href="([^"]+)\.md"/g, 'href="$1.html"')
}
fis.match('**.md', {
    parser:[
        function markrunParser(content, file){
            var html = markrun(
                content,
                {
                    templateDefaultData: config.user.moduleTemplateDefaultData,
                    template: function (data) {
                        var templateContent = fs.readFileSync(path.join(__dirname, '../m/template.html')).toString()
                        return templateContent
                    },
                    compile: {
                        'code': function(data, options, info){
                            data = json5.parse(data)
                            data.lang = data.lang || data.file.replace(/.+\.(.+)$/,'$1') || 'js'
                            var fullpath = path.join(path.dirname(info.filepath),data.file)
                            info.deps = info.deps || []
                            info.deps.push(fullpath)
                            var code = fs.readFileSync(fullpath).toString()
                            code = '<div class="markrun-source-pre" >' + markrun.markdownParserHighlight(code) + '</div>'
                            if(typeof data.run === 'undefined'){
                                data.run = true
                            }
                            if(data.run){
                                switch(data.lang) {
                                    case 'js':
                                        code = code +'<script data-markrun-lastrun="true" src="'+ data.file + '"></scr' + 'ipt>'
                                    break
                                    case 'less':
                                    case 'css':
                                    case 'sass':
                                        code = code + '<link rel="stylesheet" href="' + data.file + '"/>'
                                    break
                                }
                            }
                            return {
                                lang: 'replace',
                                code: code
                            }
                        },
                        'less': function (source, data, info) {
                            var code = ''
                            less.render(
                                source,
                                { async: false },
                                function (e, output) {
                                    code = output.css
                                }
                            )
                            return {
                                lang: 'css',
                                code: code ,
                                source: source
                            }
                        },
                        'html': function (code, data) {
                            var source = code
                            var classNames = util.getClassNames(source)
                            source = source + '\n<!-- class:\n' + classNames.join(' {}\n') + ' {}\n-->'
                            // source = source.replace(/class=/g,"className=")
                            return {
                                    lang: 'html',
                                    code: code,
                                    source: source
                            }
                        },
                        'js' : function (source, data, info) {
                            var code = babel.transform(source, config.user.babel).code
                            return {
                                lang: 'js',
                                code: code,
                                source: source
                            }
                        }
                    }
                },
                {
                    filepath: file.fullname
                }
            )
            return html
        },
        htmlEntryScriptParser
    ],
    isHtmlLike: true,
    rExt:'html'
})
fis.match('**.html', {
    parser: [
        htmlEntryScriptParser
    ]
})
/**
 * livereload
 */
fis.media('dev').match('*.{md,html}', {
    postprocessor: function (content, file) {
       if (fis.project.currentMedia() === 'dev') {
           if (content.indexOf('onface-project-livereload') === -1) {
               var livereloadScriptTag = `<script>
                           document.write('<scr'+ 'ipt data-onface-project-livereload="true" src="${'http://127.0.0.1:' + config.livereloadServerPort + '/livereload.js?snipver=1'}"></scr' + 'ipt>')
                       </script>`
               content = content.replace(/<\/\s*body>/, livereloadScriptTag + '</body>')
           }
       }
       return content
   }
})
/**
 * less
 */
fis.match('**.less', {
    parser: fis.plugin('less-2.x',config.user.less),
    rExt:'css'
})

fis.match('**.js',{
    release:false
})


/**
 * online
 */

config.user.entry.some(function(glob){
    fis.media('online1').match(glob, {
        release: true
    })
    fis.media('online3').match(glob, {
        release: true
    })
})

fis.media('online1').match('{**.md,m/**.{less,css,js},view/**,view_**/**}', {
    release: false
})
config.user.online[config.mode].viewRelease.forEach(function (item) {
    fis.media('online1').match(item, {
        release: true
    }, true)
})

fis.media('online1')
    .match('**/fis-source-map.json', {
        parser: [
            function (content) {
                return content.replace(/__REPLACE_RESOURCE_MAP__/g, '__RESOURCE_MAP__')
            }
        ]
    })
fis.media('online3').match('**', {
    useHash: config.user.online[config.mode].hash,
    domain: config.user.online[config.mode].domain.replace(/\/$/,'')
})

config.user.online[config.mode].noHashFile.forEach(function (glob) {
    fis.media('online3').match(glob, {
        useHash: false
    })
})
if (config.user.online[config.mode].compress) {
    fis.media('online3').match('*.{css,less}', {
        optimizer: fis.plugin('clean-css')
    })
}
config.user.fis(fis)
fis.media('online3').match('{__media,__chunk}/**', {
    useHash: false
})

/**
 * vendorFile
 */
config.user.vendorFile.forEach(function (glob) {
    fis.match(glob, {
        release: true
    }, 999)
})

/**
 * ignoreFile
 */
config.user.ignoreFile.forEach(function (glob) {
    fis.match(glob, {
        release: false
    }, true)
})
