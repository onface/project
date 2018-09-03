!/bin/bash
svnPath="_svn/project"
cd ./deploy/${svnPath}
svn update
cd ../../../
cpy "view/**/*.*" "../deploy/${svnPath}"  --cwd=output --parents
cpy "m/**/*.*" "../deploy/${svnPath}"  --cwd=output --parents
cpy "__chunk/**/*.*" "../deploy/${svnPath}"  --cwd=output --parents
cd ./deploy/${svnPath}
svn add * --force
svn commit -m "sync file"
