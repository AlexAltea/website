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
