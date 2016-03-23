/**
 * (c) 2016 Alexandro Sanchez Bach. All rights reserved.
 * Released under MIT license. Read LICENSE for more details.
 */

class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    
    // Methods
    
    /**
     * Returns this color as a Hexadecimal string 
     */
    asHex() {
        return undefined; // TODO
    }
    
    /**
     * Returns this color as a RGB string 
     */
    asRGB() {
        let r = this.r | 0;
        let g = this.g | 0;
        let b = this.b | 0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    
    // Static methods
    
    /**
     * Returns a color interpolated in the given range
     * @param[in]  color1  Start of the Color range in which interpolate
     * @param[in]  color2  End of the Color range in which interpolate
     * @param[in]  a       Value in range [0, 1] to interpolate color1 and color2
     */
    static mix(color1, color2, a) {
        let mr = (1 - a) * color1.r + a * color2.r;
        let mg = (1 - a) * color1.g + a * color2.g;
        let mb = (1 - a) * color1.b + a * color2.b;
        return new Color(mr, mg, mb); 
    }
}
