let zoomLevel: number = 1;
let defaultWidth: number = 800;
let imagePoppingOut: boolean = false;
let currentImage: HTMLImageElement | undefined = undefined;
let mouseOverCurrentImage: boolean = false;
let imageDraggedOffset = {x: 0, y: 0};

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
    })
    
    function popOutImage(element: HTMLImageElement) {
        currentImage = element;
        element.style.position = "absolute";
        element.style.width = defaultWidth + "px";
        reposition();
        element.style.zIndex = "10";
        imagePoppingOut = true;
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
    }

    document.addEventListener("wheel", (e: WheelEvent) => {
        if (currentImage == undefined) {
            return;
        }
        e.preventDefault();

        zoomLevel += e.deltaY;

        currentImage.style.width = defaultWidth + zoomLevel + "px";
        reposition();
    }, {passive: false});


    function reposition() {
        if (currentImage == undefined) {
            return;
        }        
        currentImage.style.top = ((window.innerHeight / 2) - currentImage.height / 2) + "px";
        currentImage.style.left = ((window.innerWidth / 2) - (defaultWidth + zoomLevel) / 2) + "px";
    }
});