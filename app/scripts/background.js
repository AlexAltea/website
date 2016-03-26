/**
 * (c) 2016 Alexandro Sanchez Bach. All rights reserved.
 * Released under MIT license. Read LICENSE for more details.
 */

/**
 * Background
 * ==========
 * This file implements in HTML5+Canvas an animation that
 * tesselates the plane with randomly colored triangles.
 * 
 * This is the layout of rows and columns used in the code below:
 *          ________________
 *          \     / \     / \
 *  [Row 0]  \ 0 / 1 \ 2 / 3 \ ...
 *            \_/_____\_/_____\
 *            / \     / \     /
 *  [Row 1]  / 0 \ 1 / 2 \ 3 / ...
 *    ...   /_____\_/_____\_/
 */
class Background {
    /**
     * Updates the triangle grid
     */
    update() {
        for (let s = this.speed; s >= 1.0; s -= 1.0) {
            let index = (Math.random() * this.count * this.count) | 0;
            this.gridIntensity[index] = 1.0;
            this.gridColor[index] = this.palette[(Math.random() * this.palette.length) | 0];
        }
        if (Math.random() < (this.speed % 1.0)) {
            let index = (Math.random() * this.count * this.count) | 0;
            this.gridIntensity[index] = 1.0;
            this.gridColor[index] = this.palette[(Math.random() * this.palette.length) | 0];   
        }
    }
    
    /**
     * Renders a triangle given its position, color and density.
     *  @param[in]  x          Coordinate X in the grid
     *  @param[in]  y          Coordinate Y in the grid
     *  @param[in]  fillColor  Color of the triangle area
     *  @param[in]  lineColor  Color of the triangle inner stroke
     *  @param[in]  lineWidth  Width of the triangle inner stroke
     *  @param[in]  size       Size of the triangle {0, 1, 2} in increasing order
     * 
     * These are the triangle coordinates used in the code below:
     *  [Normal]             [Flipped]
     *       + (x3,x3)    |   (x1,y1)    (x2,y2)
     *      / \           |       +---------+
     *     /   \          |        \       /
     *    /     \         |         \     /
     *   /       \        |          \   /
     *  +---------+       |           \ /
     *  (x1,y1)  (x2,y2)  |            + (x3,y3)
     */
    drawTriangle(x, y, fillColor, lineColor, lineWidth, size) {
        lineColor = new Color(30,30,32);
        lineWidth = 0;
        if (size < 1 && y > 3) return;
        if (size < 2 && y > 7) return;
        
        const w = this.canvas.width;
        const h = this.canvas.height;
        const minBase = 2.0 * (w / (this.count >> size));
        const minHeight = 1.0 * (h / (this.count >> size));
        
        let tBase, tHeight;
        if (minHeight > minBase * Math.sqrt(3.0) / 2.0) {
            tBase = minBase * 2.0 / Math.sqrt(3.0); 
            tHeight = minHeight;
        } else {
            tBase = minBase;
            tHeight = minBase * Math.sqrt(3.0) / 2.0; 
        }
        
        
        // Draw normal triangle
        let x1 = x * tBase / 2 + lineWidth;
        let x2 = x * tBase / 2 + tBase / 1 - lineWidth;
        let x3 = x * tBase / 2 + tBase / 2;
        let y1, y2, y3;
        
        let flipped = (x % 2) != (y % 2);
        if (!flipped) {
            y1 = y * tHeight + lineWidth/2;
            y2 = y * tHeight + lineWidth/2;
            y3 = y * tHeight + tHeight - lineWidth/2;
        } else {
            y1 = y * tHeight + tHeight - lineWidth/2;
            y2 = y * tHeight + tHeight - lineWidth/2;
            y3 = y * tHeight + lineWidth/2;
        }
        
        this.context.lineWidth = lineWidth;
        this.context.strokeStyle = lineColor.asRGB(); 
        this.context.fillStyle = fillColor.asRGB(); 
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }
    
    /**
     * Renders the triangle grid
     */
    draw() {
        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw triangle
        for (let y = 0; y < this.count; y++) {
            for (let x = 0; x < this.count; x++) {
                let i = y * this.count + x;
                if (this.gridIntensity[i] > 0.0) {
                    //this.gridIntensity[i] -= 0.02 * this.speed;
                    let tBackground = Color.mix(this.background, this.gridColor[i], this.gridIntensity[i]);
                    this.drawTriangle(x, y, tBackground, 0,0, 2);
                    this.drawTriangle(x, y, tBackground, 0,0, 1);
                    this.drawTriangle(x, y, tBackground, 0,0, 0);
                }
            }
        }
    };
    
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    
        /**
         * Configuration
         */
        
        // Maximum number of horizontal triangles
        this.count = 64;
        
        this.speed = 100.0;
        
        // Background of the canvas to triangle fade interpolation  
        this.background = new Color(30, 30, 32);
        
        // Triangle color palette
        this.palette = [
            new Color(51, 51, 51),  // Gray
            new Color(59, 15, 36),  // Violet
            new Color( 7, 54, 66),  // Blue
        ];
        
        // Grid
        this.gridIntensity = new Array(this.count * this.count);
        this.gridColor = new Array(this.count * this.count);
        
        this.iconSecurity = [
          0,  
        ];
        

        // Redraw at 30 FPS
        setInterval(() => {
            // Update size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            this.update();
            this.draw();
        }, 16);
    }
}