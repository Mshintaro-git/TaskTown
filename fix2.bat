@echo off
cd /d %~dp0
node -e "var fs=require('fs');var f='src/database/migrations/migration1.ts';var c=fs.readFileSync(f,'utf8');var idx=c.lastIndexOf('}');if(idx>=0){c=c.substring(0,idx+1);fs.writeFileSync(f,c);console.log('Fixed migration1.ts');}"
</arg_value></tool_call>