
const $canvas: HTMLCanvasElement = document.querySelector('canvas')!;
$canvas.width = 1440;
$canvas.height = 1080;

const ctx = $canvas.getContext('2d')!;
ctx.font = '170px ITC Avant Garde Gothic';
ctx.fillStyle = '#552F26';
ctx.lineWidth = 2;
ctx.strokeStyle = '#40FF4C';
ctx.textBaseline = 'middle'; 
ctx.textAlign = 'center';
ctx.shadowBlur = 5;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;

const $input: HTMLInputElement = document.querySelector('.input input')!;
$input.addEventListener('input', render);

const $btn: HTMLButtonElement = document.querySelector('.input button')!;
$btn.addEventListener('click', save);

const img = new Image();
img.addEventListener('load', render);
img.addEventListener('error', e=>{
    console.error('No background image!', e);
    alert('An error occurred :( Sorry...');
})
img.src = 'img/background.png';

function getText(){
    return ($input.value || 'Twin Peaks').toUpperCase().trim();
}

function render(){

    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    ctx.drawImage(img, 0, 0, $canvas.width, $canvas.height);
    
    let text = getText();
    
    // fill
    ctx.shadowColor = '#000';
    ctx.fillText(text, $canvas.width / 2, $canvas.height / 2, $canvas.width - 100);

    // stroke
    ctx.shadowColor = 'transparent';
    ctx.strokeText(text, $canvas.width / 2, $canvas.height / 2, $canvas.width - 100);

}

function save(){

    $canvas.toBlob(blob=>{
        if(!blob){
            console.error('No blob!');
            alert('An error occurred :( Sorry...');
            return;
        }
        
        let url = URL.createObjectURL(blob);
        let $a = document.createElement('a');
        $a.style.display = 'none';
        $a.href = url;
        $a.download = getText()
            .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
            .replace(/ +/g, '-')
            .replace(/[^A-Z0-9-]/g, '') + '.jpg';
        document.body.appendChild($a);
        $a.click();
        $a.remove();
        URL.revokeObjectURL(url);
        
    }, 'image/jpg', .95);
    
}