# Control de moviment del teclat


Per aquest exemple he fet servir la POO clàsica.

Hi ha tres classes:
* **Joc**
* **CanvasElement**
* **Paleta**

#CanvaElement
   
   Aquesta és la classe (abstracta) de la que hereta qualsevol element que volem pintar en el canvas.
   
   
   
#Paleta

   Aquesta és la classe filla que hereta de **CanvasElement**.
   
   el mètode **moure** és el que controla el moviment de la paleta 
   
#Joc

   És la classe que:
   * crea el canvas
   * crea els "events" de teclat
   * crea la paleta
   * crea el la animació amb window.requestAnimationFrame
   
   Per controlar el teclat fem servir un propietat anomenada **tecles**, es tracta d'un objecte que 
   quan pulsem una tecla afegeix una propietat al objecte i li posa valor true

    ```javascript
    window.addEventListener('keydown', function(e) {
        that.teclat[e.keyCode] = true;
       
    });
    ```
    
   Quan deixem de pulsar la teclar esborren la propietat:
    
    ```javascript
    window.addEventListener('keyup', function(e) {
        delete that.teclat[e.keyCode];
    });
    ```

   Fem servir l'objecte teclat fa el codi més clar i fàcil de mantenir. Aquí teniu el codi que fa que es mogui la paleta:
    
    ```javascript
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
        });
    ```

