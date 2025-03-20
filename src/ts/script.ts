
const $canvas: HTMLCanvasElement = document.querySelector('canvas')!;
$canvas.width = 1440;
$canvas.height = 1080;

const ctx = $canvas.getContext('2d')!;
ctx.lineWidth = 2;
ctx.strokeStyle = '#40FF4C';
ctx.shadowBlur = 5;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;

const $input: HTMLInputElement = document.querySelector('.input input')!;
$input.addEventListener('input', render);

const $btn: HTMLButtonElement = document.querySelector('.input button')!;
$btn.addEventListener('click', save);

const $img: HTMLImageElement = new Image();
$canvas.after($img);

const $watermark: HTMLInputElement = document.querySelector('#watermark')!;
$watermark.addEventListener('change', render);

const bgImg = new Image();
bgImg.addEventListener('load', render);
bgImg.addEventListener('error', e=>{
    console.error('No background image!', e);
    alert('An error occurred :( Sorry...');
})
bgImg.src = 'img/background.png';

document.fonts.ready.then(render);

function getText(){
    return ($input.value || 'Twin Peaks').toUpperCase().trim();
}

let imgUrl = '';

function render(){
    if(!bgImg.complete) return;
    if(!document.fonts.check('16px ITC Avant Garde Gothic')) return;

    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    ctx.drawImage(bgImg, 0, 0, $canvas.width, $canvas.height);
    
    let text = getText();
    
    // fill
    ctx.shadowColor = '#000';
    ctx.font = '170px ITC Avant Garde Gothic';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center';
    ctx.fillStyle = '#552F26';
    ctx.fillText(text, $canvas.width / 2, $canvas.height / 2, $canvas.width - 100);

    // stroke
    ctx.shadowColor = 'transparent';
    ctx.strokeText(text, $canvas.width / 2, $canvas.height / 2, $canvas.width - 100);

    // watermark
    if($watermark.checked){
        ctx.font = '25px ITC Avant Garde Gothic';
        ctx.fillStyle = '#fff5';
        ctx.textBaseline = 'bottom'; 
        ctx.textAlign = 'left';
        ctx.fillText('bernzrdo.wtf/twin-peaks', 10, $canvas.height - 10);
    }

    // finish
    if(text != getText()) return;
    $canvas.toBlob(blob=>{
        if(text != getText()) return;

        if(!blob){
            console.error('No blob!');
            alert('An error occurred :( Sorry...');
            return;
        }

        if(imgUrl) URL.revokeObjectURL(imgUrl);

        imgUrl = URL.createObjectURL(blob);
        $img.src = imgUrl;

    });

}

function save(){

    let $a = document.createElement('a');
    $a.style.display = 'none';
    $a.href = imgUrl;
    $a.download = getText()
        .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
        .replace(/ +/g, '-')
        .replace(/[^A-Z0-9-]/g, '');
    document.body.appendChild($a);
    $a.click();
    $a.remove();
       
}