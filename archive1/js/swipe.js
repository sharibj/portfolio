let cardSwipes;
let detailSwipes;

class swipe {
    xDown;
    yDown;
    left;
    right;
    index;
    func;

    constructor(index, func, isRight) {
        this.index = index;
        this.func = func;
        this.left = !isRight;
        this.right = isRight;
    }
}

function addSwipeListeners(range) {
    cardSwipes = [];
    detailSwipes = [];
    for (let i = 1; i <= range; i++) {
        cardSwipes[i] = new swipe(i, showDetails, i % 2 == 0);
        addSwipeListener(cardSwipes[i], '.experience .card-container .card._' + i);
        detailSwipes[i] = new swipe(i, hideDetails, i % 2 != 0);
        addSwipeListener(detailSwipes[i], '.experience .card-container .details._' + i);
    }
}

function addSwipeListener(swipeObj, cssSelector) {
    document.querySelector(cssSelector)
        .addEventListener('touchstart', function (event) {
            handleTouchStart(event, swipeObj);
        }, false);
    document.querySelector(cssSelector)
        .addEventListener('touchmove', function (event) {
            handleTouchMove(event, swipeObj);
        }, false);
}

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt, swipeObj) {
    const firstTouch = getTouches(evt)[0];
    swipeObj.xDown = firstTouch.clientX;
    swipeObj.yDown = firstTouch.clientY;
};

function handleTouchMove(evt, swipeObj) {
    if (!swipeObj.xDown || !swipeObj.yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = swipeObj.xDown - xUp;
    var yDiff = swipeObj.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            if (swipeObj.left)
                swipeObj.func(swipeObj.index);
        } else {
            if (swipeObj.right)
                swipeObj.func(swipeObj.index);
        }
    } /*else {
        if (yDiff > 0) {
            if (swipeObj.up)
                swipeObj.func(swipeObj.index);
        } else {
            if (swipeObj.down)
                swipeObj.func(swipeObj.index);
        }
    }*/
    swipeObj.xDown = null;
    swipeObj.yDown = null;
};