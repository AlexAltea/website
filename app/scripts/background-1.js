/**
 * (c) 2016 Alexandro Sanchez Bach. All rights reserved.
 * Released under MIT license. Read LICENSE for more details.
 */

/**
 * Background #1
 * =============
 * This file implements in HTML5+Canvas a modified 'Game of Life'
 * based on a triangular tesselation of the plane.
 * 
 * These are the triangle coordinates:
 *  [Normal]             [Flipped]
 *       + (x3,x3)    |   (x1,y1)    (x2,y2)
 *      / \           |       +---------+
 *     /   \          |        \       /
 *    /     \         |         \     /
 *   /       \        |          \   /
 *  +---------+       |           \ /
 *  (x1,y1)  (x2,y2)  |            + (x3,y3)
 * 
 */

class Background1 {
    /**
     * Updates the triangle grid
     */
    update() {
        let index = (Math.random() * this.count * this.count) | 0;
        this.gridIntensity[index] = 1.0;
        this.gridColor[index] = this.palette[(Math.random() * this.palette.length) | 0];
    }
    
    /**
     * Renders the triangle grid
     */
    draw() {
        // Clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let w = this.canvas.width;
        let h = this.canvas.width;
        let tBase = Math.max(w / this.count, h / this.count);
        let tHeight = tBase * Math.sqrt(3.0) / 2.0;
        
        // Draw triangle
        for (let y = 0; y < this.count; y++) {
            for (let x = 0; x < this.count; x++) {
                let i = y * this.count + x;
                if (this.gridIntensity[i] > 0.0) {
                    this.gridIntensity[i] -= 0.05;
                    
                    // Draw normal triangle
                    let x1 = x * tBase / 2 - tBase / 2;
                    let x2 = x * tBase / 2 + tBase / 2;
                    let x3 = x * tBase / 2;
                    let y1 = y * tHeight + tHeight;
                    let y2 = y * tHeight + tHeight;
                    let y3 = y * tHeight;
                    
                    let flipped = (x % 2) != (y % 2);
                    if (flipped) {
                        y1 -= tHeight;
                        y2 -= tHeight;
                        y3 += tHeight;
                    }
                    
                    let tBackground = Color.mix(this.background, this.gridColor[i], this.gridIntensity[i]);
                    this.context.fillStyle = tBackground.asRGB(); 
                    this.context.beginPath();
                    this.context.moveTo(x1, y1);
                    this.context.lineTo(x2, y2);
                    this.context.lineTo(x3, y3);
                    this.context.closePath();
                    this.context.fill();
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
        this.count = 10;
        
        // Background of the canvas to triangle fade interpolation  
        this.background = new Color(30, 30, 32);
        
        // Triangle color palette
        this.palette = [
            new Color(50, 50, 50),
            new Color(250, 50, 50),
            new Color(50, 250, 50),
        ];
        
        // Grid
        this.gridIntensity = new Array(this.count * this.count);
        this.gridColor = new Array(this.count * this.count);
        
        // Redraw at 30 FPS
        setInterval(() => {
            this.update();
            this.draw();
        }, 33);
    }
}