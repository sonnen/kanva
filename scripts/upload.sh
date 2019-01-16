#!/usr/bin/env bash
set -e

BUILD_ARTIFACTS=./dist/

echo "Installing AWS CLI"
pip install awscli
echo "Uploading to S3"
aws s3 cp ${BUILD_ARTIFACTS} ${S3_URI} --recursive --cache-control max-age=86400,public
