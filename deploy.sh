docker build -t $IMAGE_NAME . 
docker tag $IMAGE_ID docker.pkg.github.com/gamelab-hrm/backend/$PROJECT_NAME:$VERSION
docker push docker.pkg.github.com/gamelab-hrm/backend/$PROJECT_NAME:$VERSION