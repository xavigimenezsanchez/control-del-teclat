'use strict';

// Exemple de com controlar moviments de teclat
// fem servir un objecte "tecles"
// fent servir la POO clàsica en javaScript


/*******************************************************
 *
 *          Classe CanvasEmement
 *  
 *******************************************************/



function CanvasElement(x,y,w,h,mx,my,v) {
    /*
     * Un trist element del canvas
     * */
    this.x = x;  
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;  // velocitat
    this.mx = mx;  // màxim valor de la x, és a dir el width del canvas
    this.my = my;  // màxim valor de la y, és a dir, el  height del vanvas
}


/*******************************************************
 *
 *          Classe Paleta
 *  
 *******************************************************/

function Paleta(x,y,w,h,mx,my,v) {
    CanvasElement.call(this,x,y,w,y,mx,my,v);
}

Paleta.prototype = Object.create(CanvasElement.prototype);
Paleta.prototype.constructor = Paleta;

Paleta.prototype.moure = function(teclat) {
    var dalt = 38,dreta=39, baix = 40, esquerra = 37;
    console.log(teclat);
    
    if (teclat[dreta]) {
            // Si la posició del objecte sobrepasa el límit de la
            // dreta el corretgim i no sumen la velocitat
            if (!((this.x + this.w + this.v) >= this.mx)) {
                this.x += this.v;
            } else{
                this.x = this.mx-this.w;
            }
    } else if (teclat[esquerra]) {
            // Si la posició del objecte sobrepasa el límit de la
            // esquerra el corretgim i no sumen la velocitat
            if (!(this.x<=0)) {
                this.x -= this.v;
            } else {
                this.x = 0;
            }
    } else if (teclat[dalt]) {
            // Si la posició del objecte sobrepasa el límit 
            // superior el corretgim i no sumen la velocitat
            if (!(this.y <= 0)){
                this.y -= this.v;
            } else {
                this.y = 0;
            }
    } else if (teclat[baix]){
            // Si la posició del objecte sobrepasa el límit
            // inferior el corretgim i no sumen la velocitat
            if (!((this.y+this.h+this.v)>= this.my)) {
                this.y += this.v;
            } else {
                this.y = this.my - this.h;
            }
    }
}

Paleta.prototype.pintar = function(ctx) {
    ctx.fillStyle ='#FFF';
    ctx.beginPath();
    ctx.fillRect(this.x,this.y,this.w,this.h);
}

/*******************************************************
 *
 *          Classe Joc
 *  
 *******************************************************/


function Joc() {
    /*
     * La classe Joc és la que contè el canvas,
     * les pilotetes i la que s'encarrega d'animar
     * les pilotes.
     * */
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.paleta = new Paleta(400,40,80,20,this.canvas.width,this.canvas.height,5);
    this.teclat = {};  //Objecte que contè el que passa al teclat
    var that = this;
    this.animar = function () {
        that.pintar();
        window.requestAnimationFrame(that.animar);
    }
    
    
    
    // Disparadors de teclat
    window.addEventListener('keydown', function(e) {
        that.teclat[e.keyCode] = true;
       
    });
    
    window.addEventListener('keyup', function(e) {
        delete that.teclat[e.keyCode];
    });
}

Joc.prototype.pintar = function() {
    //var that=this;
    this.ctx.fillStyle ='#000';
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.paleta.moure(this.teclat);  
    this.paleta.pintar(this.ctx);
}



/*******************************************************
 *
 *          Creem un objecte joc
 *  
 *******************************************************/


var joc = new Joc();
joc.animar();