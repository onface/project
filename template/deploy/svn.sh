#!/bin/bash
svnPath="_svn/project"
cd ./deploy/${svnPath}
svn update
svn delete www/view
svn delete www/m
svn delete template
cd ../../../
cpy "view/**/*.*" "!view/**/*.html" "../deploy/${svnPath}/www" --cwd=output --parents
# or (include view/**/*.html)
# cpy "view/**/*.*" "../deploy/${svnPath}/www" --cwd=output --parents
cpy "m/**/*.*" "../deploy/${svnPath}/www" --cwd=output --parents
cpy "view/**/**.html" "../deploy/${svnPath}/template" --cwd=output --parents
cd ./deploy/_svn/project/
svn add * --force
svn commit -m "sync file"
