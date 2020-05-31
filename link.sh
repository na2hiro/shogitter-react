#!/bin/sh

pushd ../Shogitter.ts || exit
npm link
popd

npm link shogitter-ts