// Image class
class Image {
    constructor(src, parent, width, height) {
        this.image = document.createElement("img")
        
        this.image.src = src;
        this.image.width = width;
        this.image.height = height;
        
        parent.appendChild(this.image);
    }

    show() {
        this.image.style.visibility = "visible";
    }

    hide() {
        this.image.style.visibility = "hidden";
    }

    resize(width, height) {
        this.image.width = width;
        this.image.height = height;
    }

    rotate(angle) {
        this.image.style.transform = "rotate(" + angle + "deg)";
    }
}


// BorderedImage class
class BorderedImage extends Image {
    constructor(src, parent, width, height) {
        super(src, parent, width, height);

        this.image.style.padding = "10px";

        this.setBorder("2px", "solid", "#0092bf");
    }

    setBorder(width, style, color) {
        this.image.style.borderWidth = width;
        this.image.style.borderStyle = style;
        this.image.style.borderColor = color;
    }

    setBorderWidth(width) {
        this.image.style.borderWidth = width + "px";
    }
}


// Button events
function resize() {
    if (width.value === "" || height.value === "") {
        alert("A szélesség és magasság adatok megadása kötelező!")
        return;
    }

    if (isNaN(width.value) || isNaN(height.value)) {
        alert("Kérem, szám adatot adjon meg!");
        return;
    }
    
    image.resize(width.value, height.value);
}


function rotate() {
    if (angle.value === "") {
        alert("Az elforgatás adat megadása kötelező!");
        return;
    }

    if (isNaN(angle.value)) {
        alert("Kérem, szám adatot adjon meg!");
        return;
    }    
    
    image.rotate(angle.value);
}


function setBorderWidth() {
    if (borderWidth.value === "") {
        alert("A keret vastagsága adat megadása kötelező!");
        return;
    }

    if (isNaN(borderWidth.value)) {
        alert("Kérem, szám adatot adjon meg!");
        return;
    }
    
    image.setBorderWidth(borderWidth.value);
}
