#!/usr/bin/env bash

function pack(){
  DIR=$1
  DIST_DIR=./dist
  PACKAGE_NAME=$(cd ${DIR} && npm pack 2>&1 | grep filename | awk -F ': *' '{print $2}')
  mv ${DIR}/${PACKAGE_NAME} ${DIST_DIR}
  echo Packed ${DIR} to ${DIST_DIR}/${PACKAGE_NAME}
}
pack ./packages/core
pack ./packages/react
pack ./packages/charts
