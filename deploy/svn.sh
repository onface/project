!/bin/bash
cd ./deploy/_svn/admpv
svn update
cd ../../../
cpy 'view_client/**/*.*' '../deploy/_svn/admpv/www/client'  --cwd=output --parents
cd ./output/view_client
cpy '**/*.html' '../../deploy/_svn/admpv/app/client/view' --parents
cpy 'view_admin/**/*.*' '../deploy/_svn/admpv/www/client'  --cwd=output --parents
cd ./output/view_admin
cpy '**/*.html' '../../deploy/_svn/admpv/app/admin/view' --parents
cd ../../
cpy 'm/**/*.*' '../deploy/_svn/admpv/www/client'  --cwd=output --parents
cpy '__chunk/**/*.*' '../deploy/_svn/admpv/www/client'  --cwd=output --parents
cpy '__media/**/*.*' '../deploy/_svn/admpv/www/client'  --cwd=output --parents
cd ./deploy/_svn/admpv
svn add * --force
svn commit -m "sync file"
