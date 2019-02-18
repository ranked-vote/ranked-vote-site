#!/bin/sh

cd "$(dirname "$0")"
set -e

npm install

ln -fs ../theme.config ../style.less ../site style/semantic-ui
./node_modules/.bin/lessc -clean-css="keepSpecialComments=1" style/semantic-ui/style.less dist/style.css

./node_modules/.bin/webpack --display-error-details
