@echo off
cd /d %~dp0
node -e "var fs=require('fs');var files=['src/constants/buildings.ts','src/database/migrations/migration3.ts','src/services/buildingService.ts','src/database/migrations/index.ts','src/database/schema.ts','src/services/databaseService.ts','src/components/DevMenu.tsx','src/components/LevelUpModal.tsx'];files.forEach(function(f){if(fs.existsSync(f)){var c=fs.readFileSync(f,'utf8');var idx=c.lastIndexOf('}');if(idx>=0){c=c.substring(0,idx+1);fs.writeFileSync(f,c);console.log('Fixed: '+f);}}});"
</arg_value>