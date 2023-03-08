#!/usr/bin/env bash
rm -rf ./dist/
npm run build
cd dist
zip -r assets.zip ./*

ssh -i ~/Documents/pems/xiaohuangshu.pem root@douyou.test "cd /www/wwwroot/admin-douyou.cici02.com && rm -rf *"
scp -i ~/Documents/pems/xiaohuangshu.pem /home/minghua/Documents/VueProjects/Liquidity-Pool/LP-Admin/dist/assets.zip  root@douyou.test:/www/wwwroot/admin-douyou.cici02.com/
ssh -i ~/Documents/pems/xiaohuangshu.pem root@douyou.test "cd /www/wwwroot/admin-douyou.cici02.com && unzip assets.zip"