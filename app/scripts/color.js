/**
 * (c) 2016 Alexandro Sanchez Bach. All rights reserved.
 * Released under MIT license. Read LICENSE for more details.
 */

function Color(r, g, b, a) {
	this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
    this.a = a || 1;
}

// Methods
Color.prototype = {    
    // Returns this color as a Hexadecimal string 
    asHex: function() {
        return undefined; // TODO
    },
    
    // Returns this color as a RGB string 
    asRGB: function() {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    },

    // Returns this color as a RGBA string 
    asRGBA: function() {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }
}

// Static methods

/**
 * Returns a color interpolated in the given range
 * @param[in]  color1  Start of the Color range in which interpolate
 * @param[in]  color2  End of the Color range in which interpolate
 * @param[in]  a       Value in range [0, 1] to interpolate color1 and color2
 */
function mix(color1, color2, a) {
	var mr = (1 - a) * color1.r + a * color2.r;
    var mg = (1 - a) * color1.g + a * color2.g;
    var mb = (1 - a) * color1.b + a * color2.b;
    return new Color(mr, mg, mb); 
}
