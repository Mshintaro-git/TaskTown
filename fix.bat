@echo off
cd /d %~dp0
node -e "var fs=require('fs');var f='app/(tabs)/quest.tsx';var c=fs.readFileSync(f,'utf8');var idx=c.lastIndexOf('});');if(idx>=0){c=c.substring(0,idx+3);fs.writeFileSync(f,c);console.log('Fixed quest.tsx');}"
node -e "var fs=require('fs');var f='src/components/QuestExecutionView.tsx';var c=fs.readFileSync(f,'utf8');var idx=c.lastIndexOf('});');if(idx>=0){c=c.substring(0,idx+3);fs.writeFileSync(f,c);console.log('Fixed QuestExecutionView.tsx');}"
pause