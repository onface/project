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
if (config.user.release.relative) {
    // https://github.com/fex-team/fis3-hook-relative/issues/17
    fis.hook(require('fis3-hook-relative'))
    fis.match('**',{
        relative: true
    })
}

/**
 * md html
 */
const htmlEntryScriptParser = function (content, file) {
    // 开发阶段不需要替换 entry 入口js 路径
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
    }).replace(/href="([^"]+)\.md([?#].*)?"/g, 'href="$1.html$2"')
}
fis.match('**.md', {
    parser:[
        function markrunParser(content, file){
            if (fis.project.currentMedia() !== 'dev') {
                return content
            }
            var html = markrun(
                content,
                {
                    templateDefaultData: config.user.moduleTemplateDefaultData,
                    template: function (data) { return fs.readFileSync(path.join(__dirname, '../m/template.html')).toString() },
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
    postprocessor: require('fis-livereload').create({
        port: config.livereloadServerPort,
        delay: 100,
        exclusions: [/\\.git\//, /\\.svn\//, /\\.hg\//, /\.js/]
    }, path.join(__dirname, '../output'))
})
/**
 * less
 */
fis.match('**.less', {
    parser: fis.plugin('less-2.x',config.user.less),
    rExt:'css'
})

fis.match('**.js', {
    release: false
})

/**
 * release
 */

config.user.entry.some(function(glob){
    fis.media('release1').match(glob, {
        release: true
    })
    fis.media('release3').match(glob, {
        release: true
    })
})

fis.media('release1')
    .match('**/fis-source-map.json', {
        parser: [
            function (content) {
                return content.replace(/__REPLACE_RESOURCE_MAP__/g, '__RESOURCE_MAP__')
            }
        ]
    })
fis.media('release3').match('**', {
    useHash: config.user.release.hash,
    domain: config.user.release.domain.replace(/\/$/,'')
})

config.user.release.hashIgnore.forEach(function (glob) {
    fis.media('release3').match(glob, {
        useHash: false
    })
})
if (config.user.release.compress) {
    fis.media('release3').match('*.{css,less}', {
        optimizer: fis.plugin('clean-css')
    })
}
['{view,view_**}/**'].concat(config.user.release.unreleasable).forEach(function (item) {
    fis.media('release1').match(item, {
        release: false
    }, true)
})

fis.media('release1').match(`${config.viewPath}/**/**`, {
    release: true
}, true)

fis.media('release3').match('__chunk/**', {
    useHash: false
}).match('__chunk/**', {
    release:true
}, 999)


/**
 * ignore
 */
config.user.ignore.forEach(function (glob) {
    fis.match(glob, {
        release: false
    }, 999)
})

/**
 * vendor
 */
config.user.vendor.forEach(function (glob) {
    fis.match(glob, {
        release: true
    }, 998)
})
