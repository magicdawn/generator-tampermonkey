https://stackoverflow.com/questions/41212558/develop-tampermonkey-scripts-in-a-real-ide-with-automatic-deployment-to-openuser
banner 起两个作用
1. 开发时: 作为 tampermonkey UserScript entry
2. 最终打包时: 作为 banner, 去除加载 @require file

## DEV

添加 banner.user.js 为 UserScript, 通过 @require 加载 rollup 打包好的文件 dist/main.user.js

## PROD

添加 main.user.js 为 UserScript