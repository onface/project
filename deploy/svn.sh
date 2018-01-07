!/bin/bash
svnPath="_svn/test_project/www/client" 

cd ./deploy/_svn/test_project
svn update
cd ../../../
cpy "view**/**/*.*" "../deploy/${svnPath}"  --cwd=output --parents
cd ../../
cpy "m/**/*.*" "../deploy/${svnPath}"  --cwd=output --parents
cpy "__chunk/**/*.*" "../deploy/${svnPath}"  --cwd=output --parents
cpy "__media/**/*.*" "../deploy/${svnPath}"  --cwd=output --parents
cd ./deploy/_svn/test_project
svn add * --force
svn commit -m "sync file"
