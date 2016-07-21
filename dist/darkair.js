/**
 * (c) 2016 Alexandro Sanchez Bach. All rights reserved.
 * Released under MIT license. Read LICENSE for more details.
 */

/**
 * Background
 * ==========
 * This file uses Particles.js to render particles with random
 * directions and speed, and providing simple interactivity.
 */
function Background() {
    this.config = {
        "particles": {
            "number": {"value": 80},
            "color": {"value": "#aaa"},
            "shape": {
                "type": "circle",
                "stroke": {"width": 0, "color": "#000000"},
                "polygon": {"nb_sides": 5}
            },
            "opacity": {
                "value": 0.5,
                "random": false,
            },
            "size": {
                "value": 3,
                "random": true,
            },
            "line_linked": {
                "enable":true,
                "distance": 150,
                "color": "#aaa",
                "opacity": 0.4,
                "width":1
            },
            "move": {
                "enable": true,
                "speed": 1.2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "bounce",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": {"enable": true, "mode": "bubble"},
                "onclick": {"enable": false},
                "resize": true
            },
            "modes": {
                "bubble": {
                    "distance": 400,
                    "size": 3.2,
                    "duration": 2,
                    "opacity": 0.5,
                    "speed": 3
                }
            }
        },
        "retina_detect": true
    }; 
    particlesJS("background", this.config);
}

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

/**
 * (c) 2016 Alexandro Sanchez Bach. All rights reserved.
 * Released under MIT license. Read LICENSE for more details.
 */

// Essential
Math.TAU = 2 * Math.PI;

// Background
var bg = new Background();