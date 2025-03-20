const mix = require('laravel-mix');
const fs = require('fs');

const SRC = 'src';
const DEST = 'docs';

function getFiles(dir){

    let res = [];

    for(let item of fs.readdirSync(dir)){
        if(item.startsWith('_')) continue;
        
        if(fs.statSync(`${dir}/${item}`).isDirectory()){
            res = res.concat(getFiles(`${dir}/${item}`));
        }else{
            res.push(`${dir}/${item}`);
        }

    }

    return res;
}

mix.disableSuccessNotifications();

for(let scss of getFiles(`${SRC}/scss`))
    mix.sass(scss, scss.replace(`${SRC}/scss/`, `${DEST}/css/`).replace('.scss', '.css')).options({ processCssUrls: false });

for(let ts of getFiles(`${SRC}/ts`))
    mix.ts(ts, ts.replace(`${SRC}/ts/`, `${DEST}/js/`).replace('.ts', '.js'));