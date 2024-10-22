let zoomLevel: number = 1;
let defaultWidth: number = 800;
let imagePoppingOut: boolean = false;
let currentImage: HTMLImageElement | undefined = undefined;
let mouseOverCurrentImage: boolean = false;
let imageDraggedOffset = {x: 0, y: 0};
let startMouseDrag = {x: 0, y: 0};
let mouseIsDown: boolean = false;

document.addEventListener("nav", () => {
    const imagesInArticle = document.querySelectorAll<HTMLImageElement>("article img");    
    imagesInArticle.forEach((element) => {
        element.tabIndex = 1;     
        element.addEventListener("click", () => {
            console.log("IMAGE CLICKED");
            popOutImage(element);
            element.focus();
        });
        element.addEventListener("blur", () => {
            resetImage();
        });
    });

    document.addEventListener("wheel", (e: WheelEvent) => {
        if (currentImage == undefined) {
            return;
        }
        e.preventDefault();

        zoomLevel += e.deltaY;
        console.log(zoomLevel);

        currentImage.style.width = defaultWidth + zoomLevel + "px";
        reposition();
    }, {passive: false});

    document.addEventListener("mousedown", (e: MouseEvent) => {
        if (!mouseOverCurrentImage) {
            return;
        }
        mouseIsDown = true;
        startMouseDrag.x = e.pageX;
        startMouseDrag.y = e.pageY;
    });

    document.addEventListener("mousemove", (e: MouseEvent) => {
        if (!mouseIsDown) {
            return;
        }
        let mouseDelta = {x: e.pageX - startMouseDrag.x, y: e.pageY - startMouseDrag.y};
        startMouseDrag = {x: e.pageX, y: e.pageY}
        imageDraggedOffset = { x: imageDraggedOffset.x + mouseDelta.x, y: imageDraggedOffset.y + mouseDelta.y }
        reposition();
    });

    document.addEventListener("mouseup", (e: MouseEvent) => {
        if (!mouseOverCurrentImage || !mouseIsDown) {
            return;
        };
        mouseIsDown = false;
        //let mouseDelta = {x: startMouseDrag.x - e.pageX, y: startMouseDrag.y - e.pageY};
    })
    
    function popOutImage(element: HTMLImageElement) {
        currentImage = element;
        element.style.position = "absolute";
        element.style.width = defaultWidth + "px";
        reposition();
        element.style.zIndex = "10";
        imagePoppingOut = true;
        currentImage.addEventListener("mouseover", () => {
            mouseOverCurrentImage = true;
        });
        currentImage.addEventListener("mouseout", () => {
            mouseOverCurrentImage = false;
        });
    }

    function resetImage() {
        if (currentImage == undefined) {
            return;
        }
        currentImage.style.position = "";
        currentImage.style.top = "";
        currentImage.style.width = "";
        imagePoppingOut = false;
        currentImage = undefined;
        zoomLevel = 1;
        imageDraggedOffset = {x: 0, y: 0};
    }



    function reposition() {
        if (currentImage == undefined) {
            return;
        }
        let centerX = (window.innerWidth / 2) - (defaultWidth + zoomLevel) / 2;
        let centerY = (window.innerHeight / 2) - currentImage.height / 2;
        currentImage.style.top = centerY + imageDraggedOffset.y + "px";
        currentImage.style.left = centerX + imageDraggedOffset.x + "px";
    }
});