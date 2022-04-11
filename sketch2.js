/////////////////////////////////////////////////////////////////
//                                                            //
// WEBSOCKET CLIENT
//

// 1) Server launch
var server = new WebSocket("wss://eko-server69.glitch.me");

// 2) Connection established => send first message !
server.onopen = function (event) {
  let msg = {
    x: 0,
    y: 0
  };
  server.send(JSON.stringify(msg));
}

// 3) Receive message
server.onmessage = function (event) {
  let msg = JSON.parse(event.data);
  //console.log("msg received : " + msg.x + "," + msg.y)
  myp5.setPosition(msg.x,msg.y)
};

// 4) Error ?
server.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
//
// WEBSOCKET CLIENT
//                                                            \\
///////////////////////////////////////////////////////////////\\



/////////////////////////////////////////////////////////////////
//                                                            //
// P5JS
//
let sketch = function (p) {

  p.say = function(msg) {
    console.log(msg)
  }
  
  let rX = 42;
  let rY = 42;
  let midX = 0;
  let midY = 0;
  let count = 0
  let canvasDescription = "no turn"

  let backgroundColor = p.color(0, 20, 0)

  p.setPosition = function(x,y) {
    rX = x
    rY = y
  }

  p.windowResized = function () {
    count = count + 1
    backgroundColor = p.color(Math.random()*100, Math.random()*100, Math.random()*100)
    //p.resizeCanvas(window.innerWidth, window.innerHeight);
    //p.resizeCanvas(window.screen.width, window.screen.height);
    //p.resizeCanvas(812, 812);
    
 
    //canvasDescription = "( " + window.innerWidth + ' , ' + window.innerWidth + " )"
    //canvasDescription = "( " + window.innerWidth + " , " + window.innerHeight + " )"
    canvasDescription = "( " + window.screen.width + " , " + window.screen.height + " )"
    
    midX = p.width / 2;
    midY = p.height / 2;
    
  }

  p.deviceTurned = function() {
    count = count + 1
    //p.resizeCanvas(window.innerWidth,  window.innerHeight);
    //p.resizeCanvas(window.screen.width,  window.screen.height);
     //p.resizeCanvas(812, 812);
    midX = p.width / 2;
    midY = p.height / 2;
  }

  p.setup = function() {
    console.log('p5js.setup() called');
    if (window.screen.width>window.screen.height) {
      p.createCanvas(window.screen.width, window.screen.width);
    } else {
      p.createCanvas(window.screen.height, window.screen.height);
    }
    //p.createCanvas(window.innerWidth, window.innerHeight);
    midX = p.width / 2;
    midY = p.height / 2;
    p.background(p.color(0, 20, 0));
    p.noFill();
    p.stroke(p.color('green'));
    
  }

  p.draw = function() {
    midX = p.windowWidth / 2;
    midY = p.windowHeight / 2;
    p.background(backgroundColor);
    p.translate(midX, midY);
     drawGrid();
    
    p.ellipse(0, 0, window.innerWidth, window.innerHeight);
    p.ellipse(p.mouseX - midX, p.mouseY - midY, 70, 70);
    p.ellipse(rX, -rY, 90, 90);
  }

  p.mouseDragged = function() {
    
    if (server.readyState !== 1) {
      return;
    }

    //if (exampleSocket.bufferedAmount == 0) {
    let msg = {
      x: p.mouseX - midX,
      y: -p.mouseY + midY,
    };
    //console.log("new msg send")
    server.send(JSON.stringify(msg));
    //}
  }

  function drawGrid() {
    p.textSize(70)
    p.text(count,0,0)
    p.text(canvasDescription,-150,50)
    p.textSize(12)


    let width50 = Math.round(p.width / 50) * 50 - 50;
    let height50 = Math.round(p.height / 50) * 50 - 50;

    for (var x = -width50; x < p.width; x += 50) {
      p.line(x, -p.height, x, p.height);
      p.text(x, x + 1, 12);
    }
    for (var y = -height50; y < p.height; y += 50) {
      p.line(-p.width, y, p.width, y);
      p.text(y, 1, y + 12);
    }
  }

};

let myp5 = new p5(sketch);
myp5.say("hello love")


//
// P5JS
//                                                            \\
///////////////////////////////////////////////////////////////\\


/* globals p5, ADD, ALT, ARROW, AUDIO, AUTO, AXES, BACKSPACE, BASELINE, BEVEL, BEZIER, BLEND, BLUR, BOLD, BOLDITALIC, BOTTOM, BURN, CENTER, CHORD, CLAMP, CLOSE, CONTROL, CORNER, CORNERS, CROSS, CURVE, DARKEST, DEGREES, DEG_TO_RAD, DELETE, DIFFERENCE, DILATE, DODGE, DOWN_ARROW, ENTER, ERODE, ESCAPE, EXCLUSION, FALLBACK, FILL, GRAY, GRID, HALF_PI, HAND, HARD_LIGHT, HSB, HSL, IMAGE, IMMEDIATE, INVERT, ITALIC, LABEL, LANDSCAPE, LEFT, LEFT_ARROW, LIGHTEST, LINEAR, LINES, LINE_LOOP, LINE_STRIP, MIRROR, MITER, MOVE, MULTIPLY, NEAREST, NORMAL, OPAQUE, OPEN, OPTION, OVERLAY, P2D, PI, PIE, POINTS, PORTRAIT, POSTERIZE, PROJECT, QUADRATIC, QUADS, QUAD_STRIP, QUARTER_PI, RADIANS, RADIUS, RAD_TO_DEG, REMOVE, REPEAT, REPLACE, RETURN, RGB, RIGHT, RIGHT_ARROW, ROUND, SCREEN, SHIFT, SOFT_LIGHT, SQUARE, STROKE, SUBTRACT, TAB, TAU, TESS, TEXT, TEXTURE, THRESHOLD, TOP, TRIANGLES, TRIANGLE_FAN, TRIANGLE_STRIP, TWO_PI, UP_ARROW, VIDEO, WAIT, WEBGL, accelerationX, accelerationY, accelerationZ, deltaTime, deviceOrientation, displayHeight, displayWidth, focused, frameCount, height, isKeyPressed, key, keyCode, keyIsPressed, mouseButton, mouseIsPressed, mouseX, mouseY, movedX, movedY, pAccelerationX, pAccelerationY, pAccelerationZ, pRotateDirectionX, pRotateDirectionY, pRotateDirectionZ, pRotationX, pRotationY, pRotationZ, pixels, pmouseX, pmouseY, pwinMouseX, pwinMouseY, rotationX, rotationY, rotationZ, touches, turnAxis, width, winMouseX, winMouseY, windowHeight, windowWidth, abs, acos, alpha, ambientLight, ambientMaterial, angleMode, append, applyMatrix, arc, arrayCopy, asin, atan, atan2, background, beginContour, beginShape, bezier, bezierDetail, bezierPoint, bezierTangent, bezierVertex, blend, blendMode, blue, boolean, box, brightness, byte, camera, ceil, char, circle, clear, clearStorage, color, colorMode, concat, cone, constrain, copy, cos, createA, createAudio, createButton, createCamera, createCanvas, createCapture, createCheckbox, createColorPicker, createDiv, createElement, createFileInput, createGraphics, createImage, createImg, createInput, createNumberDict, createP, createRadio, createSelect, createShader, createSlider, createSpan, createStringDict, createVector, createVideo, createWriter, cursor, curve, curveDetail, curvePoint, curveTangent, curveTightness, curveVertex, cylinder, day, debugMode, degrees, describe, describeElement, directionalLight, displayDensity, dist, downloadFile, ellipse, ellipseMode, ellipsoid, emissiveMaterial, endContour, endShape, erase, exitPointerLock, exp, fill, filter, float, floor, fract, frameRate, frustum, fullscreen, get, getFrameRate, getItem, getURL, getURLParams, getURLPath, green, gridOutput, hex, hour, httpDo, httpGet, httpPost, hue, image, imageMode, int, isLooping, join, keyIsDown, lerp, lerpColor, lightFalloff, lightness, lights, line, loadBytes, loadFont, loadImage, loadJSON, loadModel, loadPixels, loadShader, loadStrings, loadTable, loadXML, log, loop, mag, map, match, matchAll, max, millis, min, minute, model, month, nf, nfc, nfp, nfs, noCanvas, noCursor, noDebugMode, noErase, noFill, noLights, noLoop, noSmooth, noStroke, noTint, noise, noiseDetail, noiseSeed, norm, normalMaterial, orbitControl, ortho, perspective, pixelDensity, plane, point, pointLight, pop, popMatrix, popStyle, pow, print, push, pushMatrix, pushStyle, quad, quadraticVertex, radians, random, randomGaussian, randomSeed, rect, rectMode, red, redraw, registerPromisePreload, removeElements, removeItem, requestPointerLock, resetMatrix, resetShader, resizeCanvas, reverse, rotate, rotateX, rotateY, rotateZ, round, saturation, save, saveCanvas, saveFrames, saveGif, saveJSON, saveJSONArray, saveJSONObject, saveStrings, saveTable, scale, second, select, selectAll, set, setAttributes, setCamera, setFrameRate, setMoveThreshold, setShakeThreshold, shader, shearX, shearY, shininess, shorten, shuffle, sin, smooth, sort, specularColor, specularMaterial, sphere, splice, split, splitTokens, spotLight, sq, sqrt, square, storeItem, str, stroke, strokeCap, strokeJoin, strokeWeight, subset, tan, text, textAlign, textAscent, textDescent, textFont, textLeading, textOutput, textSize, textStyle, textWidth, texture, textureMode, textureWrap, tint, torus, translate, triangle, trim, unchar, unhex, updatePixels, vertex, writeFile, year */