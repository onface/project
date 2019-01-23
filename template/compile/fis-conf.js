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
                    template: function (data) { return fs.readFileSync(path.join(__dirname, '../m/template.html')).toString() }
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
