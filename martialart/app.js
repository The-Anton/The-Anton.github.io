let canvas = document.getElementById("simulation-canvas");
let ctx = canvas.getContext("2d");

let frames = {
    idle: [1, 2, 3, 4, 5, 6, 7, 8],
    kick: [1, 2, 3, 4, 5, 6, 7],
    punch: [1, 2, 3, 4, 5, 6, 7],
    block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forward: [1, 2, 3, 4, 5, 6],
    backward: [1, 2, 3, 4, 5, 6],
};

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
}

let imagePath = (animation, frameNumber) => {
    return "images/" + animation + "/" + frameNumber + ".png";
}

let loadImages = (callback) => {
    let images = {
        idle: [],
        kick: [],
        punch: [],
        block: [],
        forward: [],
        backward: [],
    };
    let imagesToLoad = 0;


    ["idle", "kick","punch", "block", "forward", "backward"].forEach(
        (animation) => {
            let animationFrames = frames[animation];
            imagesToLoad = imagesToLoad + animationFrames.length;

            animationFrames.forEach((frameNumber) => {
                let path = imagePath(animation, frameNumber);

                loadImage(path, (image) => {
                    images[animation][frameNumber-1] = image;
                    imagesToLoad -= 1;

                    if (imagesToLoad === 0) {
                        callback(images);
                    }
                });
            });
        }
    );
}

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }, index * 100);
    });
    setTimeout(callback, images[animation].length * 100);
};

// main control flow begins here
loadImages((images) => {
    let queueAnimations = [];

    let aux = () => {
        let selectedAnimation;

        if(queueAnimations.length === 0) {
            selectedAnimation = "idle";
        } else {
            selectedAnimation = queueAnimations.shift();
        }
        animate(ctx, images, selectedAnimation, aux);
    }

    aux();

    document.getElementById("kick").onclick = () => {
        queueAnimations.push("kick");
    };

    document.getElementById("punch").onclick = () => {
        queueAnimations.push("punch");
    };

    document.getElementById("backward").onclick = () => {
        queueAnimations.push("backward");
    };

    document.getElementById("forward").onclick = () => {
        queueAnimations.push("forward");
    };

    document.getElementById("block").onclick = () => {
        queueAnimations.push("block");
    };

    document.addEventListener("keyup", (event) => {
        const key = event.key;

        switch (key) {
            case "ArrowDown":
                queueAnimations.push("kick");
                break;
            case "ArrowUp":
                queueAnimations.push("punch");
                break;
            case "ArrowRight":
                queueAnimations.push("forward");
                break;
            case "ArrowLeft":
                queueAnimations.push("backward");
                break;
        }
    });
});