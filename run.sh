#!/bin/sh
brew services start mongodb/brew/mongodb-community
cd /Users/belacqua/dev/react-mesto-api-full-gha/backend
npm run dev