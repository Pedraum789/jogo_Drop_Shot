var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var iniciarJogo = false;

var soldado_x = 50;
var soldado_y = 300;
var soldado_raio = 30;
var velocidade = 3;

let start = 0;

let bala = new Image();
bala.src = "bala1.png";
var policial_x = 700;
var policial_y = 300;
var policial_raio = 30;

var raio_bala = 5;
let tiros = [];
let velocidade_bala = 7;

var parede1 = {x:150,y:75,w:20, h:150};
var parede2 = {x:150,y:375,w:20, h:150};
var parede3 = {x:650,y:75,w:20, h:150};
var parede4 = {x:650,y:375,w:20, h:150};
var parede5 = {x:400,y:0,w:20, h:100};
var parede6 = {x:400,y:500, w:20, h:100};
var parede7 = {x:400,y:225, w:20, h:150};
var paredes = [];
paredes.push(parede1);
paredes.push(parede2);
paredes.push(parede3);
paredes.push(parede4);
paredes.push(parede5);
paredes.push(parede6);
paredes.push(parede7);

//teclas
var teclas = [];

document.addEventListener("keydown", function(e){
    if(!(teclas.includes(parseInt(e.keyCode))) ){
        teclas.push(parseInt(e.keyCode));
    }

    if (e.keyCode.valueOf() === 13) {
        if((!iniciarJogo) && (start === 0)) {
            console.log("ENTER");
            iniciarJogo = true;
            //atualiza();
        }
    }
    if ((e.keyCode.valueOf() == 82) || (start !== 0)){
        soldado_x = 50;
        soldado_y = 300;
        policial_x = 700;
        policial_y = 300;
        start = 0;
    }
    //Tiro 1
    if (e.keyCode.valueOf() == 67){
        cria_tiros(1, "bala1.png", soldado_x + 63, soldado_y + 28);
    }

    //Tiro 2
    if (e.keyCode.valueOf() == 78){
        cria_tiros(-1, "bala2.png", policial_x - 8, policial_y - 1);
    }

});

document.addEventListener("keyup", function(e){
    let indice = teclas.indexOf(parseInt(e.keyCode));
    teclas.splice(indice, 1);

});

function desenha(){

    //cenario
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.closePath();

    let background1 = new Image();
    background1.src = "parede.jpg";
    ctx.drawImage(background1, 0,0,canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(parede1.x, parede1.y,parede1.w,parede1.h);
    ctx.fillRect(parede2.x, parede2.y,parede2.w,parede2.h);
    ctx.fillRect(parede3.x, parede3.y,parede3.w,parede3.h);
    ctx.fillRect(parede4.x, parede4.y,parede4.w,parede4.h);
    ctx.fillRect(parede5.x, parede5.y,parede5.w,parede5.h);
    ctx.fillRect(parede6.x, parede6.y,parede6.w,parede6.h);
    ctx.fillRect(parede7.x, parede7.y,parede7.w,parede7.h);
    ctx.closePath();
    //soldado
    var imagem_soldado = new Image();
    imagem_soldado.src = 'soldado.png';
    ctx.drawImage(imagem_soldado, soldado_x, soldado_y, soldado_raio*2, soldado_raio*2);

    //policial
    var imagem_policial = new Image();
    imagem_policial.src = 'policial.png';
    ctx.drawImage(imagem_policial, policial_x, policial_y, policial_raio*2, policial_raio*2);

    for(var i = 0; i < tiros.length; i++){
        ctx.beginPath();
        ctx.rect(tiros[i].x, tiros[i].y + 14, 5, 5);
        ctx.fill();
        ctx.closePath();
    }
    
}

function movimento() {

    //movimento soldado
    if (teclas.includes(65)) {
        var soma = true;
        for (var i = 0; i < paredes.length; i++){
            var left = parede(soldado_x - velocidade, soldado_y, paredes[i]);
            if (left){
                soma = false;
            }
        }
        if (soma){
            soldado_x -= velocidade;
        }
    }
    else if (teclas.includes(87)) {
        var soma = true;
        for (var i = 0; i < paredes.length; i++){
            var up = parede(soldado_x, soldado_y - velocidade, paredes[i]);
            if (up){
                soma = false;
            }
        }
        if (soma){
            soldado_y -= velocidade;
        }
    }
    else if (teclas.includes(68)) {
        var soma = true;
        for (var i = 0; i < paredes.length; i++){
            var right = parede(soldado_x + velocidade, soldado_y, paredes[i]);
            if (right){
                soma = false;
            }
        }
        if (soma){
            soldado_x += velocidade;
        }
    }
    else if (teclas.includes(83)) {
        var soma = true;
        for (var i = 0; i < paredes.length; i++){
            var down = parede(soldado_x, soldado_y + velocidade, paredes[i]);
            if (down){
                soma = false;
            }
        }
        if (soma){
            soldado_y += velocidade;
        }
    }

    //movimento policial
    if (teclas.includes(74)){
        var tudo = true;
        for (var i = 0; i < paredes.length; i++){
            var esquerda = parede(policial_x - velocidade, policial_y, paredes[i]);
            if (esquerda){
                tudo = false;
            }
        }
        if (tudo){
            policial_x -= velocidade;
        }
    }
    else if(teclas.includes(73)){
        var tudo = true;
        for (var i = 0; i < paredes.length; i++){
            var cima = parede(policial_x, policial_y - velocidade, paredes[i]);
            if (cima){
                tudo = false;
            }
        }
        if (tudo){
            policial_y -= velocidade;
        }
    }
    else if(teclas.includes(76)){
        var tudo = true;
        for (var i = 0; i < paredes.length; i++){
            var direita = parede(policial_x + velocidade, policial_y, paredes[i]);
            if (direita){
                tudo = false;
            }
        }
        if (tudo){
            policial_x += velocidade;
        }
    }
    else if(teclas.includes(75)) {
        var tudo = true;
        for (var i = 0; i < paredes.length; i++) {
            var baixo = parede(policial_x, policial_y + velocidade, paredes[i]);
            if (baixo) {
                tudo = false;
            }
        }
        if (tudo) {
            policial_y += velocidade;
        }
    }


    //limite soldado
    if(soldado_x <= 0){
        soldado_x = 0;
    }
    else if(soldado_x + 2*soldado_raio >= canvas.width){
        soldado_x = canvas.width - 2*soldado_raio;
    }
    if(soldado_y <= 0){
        soldado_y = 0;
    }
    else if(soldado_y + 2*soldado_raio >= canvas.height){
        soldado_y = canvas.height - 2*soldado_raio;
    }
    //limite policial
    if(policial_x <= 0){
        policial_x = 0;
    }
    else if(policial_x + 2*policial_raio >= canvas.width){
        policial_x = canvas.width - 2*policial_raio;
    }
    if(policial_y <= 0){
        policial_y = 0;
    }
    else if(policial_y + 2*policial_raio >= canvas.height){
        policial_y = canvas.height - 2*policial_raio;
    }
}

function cria_tiros(direcao, nome_arquivo, px, py) {
    console.log("BANG!");
    let tiro = {x: px, y: py, raio: raio_bala, velocidade: velocidade_bala * direcao, src: nome_arquivo};
    tiros.push(tiro);
}

function movimentaTiro(){

    let apagar = [];
    var certo = true;
    for (let i = 0; i < tiros.length; i++){
        let ok = parede(tiros[i].x + tiros[i].velocidade, tiros[i].y, paredes);
        for (var p = 0; p < paredes.length; p++) {
            if ((tiros[i].x + tiros[i].velocidade > canvas.width ||
                tiros[i].x - tiros[i].velocidade < 0 ||
                tiros[i].y + tiros[i].velocidade > canvas.height ||
                tiros[i].x - tiros[i].velocidade < 0) ||
                ((tiros[i].x + tiros[i].velocidade >= (paredes[p].x)) &&
                    (tiros[i].x <= ((paredes[p].x + paredes[p].w))) &&
                    (tiros[i].y + tiros[i].velocidade >= (paredes[p].y)) &&
                    (tiros[i].y <= ((paredes[p].y + paredes[p].h)))
                )) {
                ok = true;
            }
            else if((tiros[i].x + tiros[i].velocidade > policial_x) &&
                    (tiros[i].x <= policial_x + soldado_raio*2) &&
                    (tiros[i].y + tiros[i].velocidade >= policial_y) &&
                    (tiros[i].y <= policial_y + soldado_raio * 2)){
                console.log("Soldado ganhou!!");
                start = 1;
            }
            else if((tiros[i].x + tiros[i].velocidade > soldado_x) &&
                (tiros[i].x <= soldado_x + soldado_raio*2) &&
                (tiros[i].y + tiros[i].velocidade >= soldado_y) &&
                (tiros[i].y <= soldado_y + soldado_raio * 2)){
                start = 2;
                console.log("Policial Ganhou!!");
                start = 2;
            }

        }
        if (!ok){
            tiros[i].x += tiros[i].velocidade;
        }
        else{
            apagar.push(i);
        }
    }

    if (tiros.length > 0){
        console.log("tiros: " + tiros.length);
    }
    
    for (let i = apagar.length - 1; i >= 0; i--){
        console.log("apagar[" + "]");
        tiros.splice(apagar[i], 1);
    }
    
}

function parede(x,y,p) {
    if(x + soldado_raio*2 >= p.x &&
        x <= p.x + p.w &&
        y + soldado_raio*2 >= p.y &&
        y <= p.y + p.h){
        return true;
    }
    return false;
}

function atualiza(){

    if(iniciarJogo){
        if(start === 0){
            //console.log(teclas);
            movimento();
            movimentaTiro();
            desenha();
        }
        else if (start === 1){
            window.alert("Soldado Venceu!!");
        }
        else if (start === 2){
            window.alert("Policial Venceu!!");
        }
    }
    else{
        desenha();
    }
    requestAnimationFrame(atualiza);
}

atualiza();