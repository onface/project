module.exports = {
    prompts: {
        name: {
            type: 'string',
            required: true,
            message: 'project name'
        }
    },
    skipInterpolation: '{view,view_**,m,compile,deploy}/**',
    helpers: {

    },
    complete: function (data) {
        console.log(
            `To get started:\n\n  cd ./${data.destDirName}\n  yarn\n  npm run dev\n  npm run js\n npm run s\n\nDocumentation can be found at ${data.destDirName}/README.md`
        )
    }
}
