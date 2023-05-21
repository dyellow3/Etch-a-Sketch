let boxContainers;
let isMouseDown = false;
let drawEnable = true;
let size = 0;

function createGrid(newSize) {
    if(newSize > 25) {
        return console.log("Exceeded 25!")
    }
    const grid = document.querySelector('.boxes');
    grid.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        grid.removeChild(box);
    })
    for (let i = 0; i < newSize**2; i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        grid.appendChild(box);
    }
    size = newSize;
    adjustSize();
    boxContainers = document.querySelectorAll('.box');
    addEventListeners();
}

function addEventListeners() {
    boxContainers.forEach(box => {
        box.addEventListener('mousedown', () => {
            isMouseDown = true;
        });

        // Event listener for when the mouse button is released
        box.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        // Event listener for when the mouse enters the box (while mouse button is pressed down)
        box.addEventListener('click', () => {

            draw(box); // Change the background color as desired

        });

        box.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                draw(box); // Change the background color as desired
            }
        });
    });
}

function adjustSize() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const smallestDimension = Math.min(viewportWidth, viewportHeight);

    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        let boxSize = `${(smallestDimension * (0.64/size))}px`;
        box.style.width = boxSize;
        box.style.height = boxSize;
    });

    const header = document.querySelector('.header');
    const boxWidth = parseInt(boxes[0].style.width);
    const totalBoxWidth = boxWidth * size;
    header.style.width = `${totalBoxWidth}px`;
}

function draw(box) {
    if (drawEnable) {
        box.style.backgroundColor = 'red';
    }
    else {
        box.style.backgroundColor = 'transparent';
    }
}

//TODO -- make the paint color adjustable, background of body adjustable, box border color transparent option etc.
//TODO -- fix/replace buggy painting

createGrid(8);
window.addEventListener('resize', adjustSize);
adjustSize();

document.getElementById("size").addEventListener('click', function () {
    var input = document.getElementById("userInput").value;
    console.log("Input Size (Max 10): ", input);
    createGrid(input);
});

const options = document.querySelectorAll('.option');
options.forEach(option => {
    option.addEventListener('click', (event) => {
        if (event.target.classList.contains('draw')) {
            drawEnable = true;
        } else {
            drawEnable = false;
        }
    });
});


