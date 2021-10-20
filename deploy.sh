docker build -t frontend-static-files   . 
docker tag $IMAGE_ID docker.pkg.github.com/gamelab-hrm/frontend/$PROJECT_NAME:$VERSION
docker push docker.pkg.github.com/gamelab-hrm/frontend/$PROJECT_NAME:$VERSION