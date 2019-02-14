#!/usr/bin/env bash
set -e
DIST_DIR=./dist

function pack(){
  DIR=$1
  PACKAGE_NAME=$(cd ${DIR} && npm pack 2>&1 | grep filename | awk -F ': *' '{print $2}')
  mv ${DIR}/${PACKAGE_NAME} ${DIST_DIR}
  echo "Packed ${DIR} to ${DIST_DIR}/${PACKAGE_NAME}"
}

mkdir -p ${DIST_DIR}
for PACKAGE in ./packages/*/; do
    echo "Processing ${PACKAGE}"
    pack ${PACKAGE}
done
