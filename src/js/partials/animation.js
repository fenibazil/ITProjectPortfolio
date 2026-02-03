module.exports = (function () {
    function ConvertCssPxToInt(cssPxValueText){
        return parseInt(cssPxValueText.slice(0, cssPxValueText.length - 2));
    }

    // изменение display
    function elementDisplay(element, display = '') {
        if (display === '' || display === 'none') display = 'block';
        if (getComputedStyle(element).display !== display) {
            element.style.display = display;
        }
    }

    function setPosition(element, position, value) {
        switch(position) {
            case 'left':
                element.style.left = value + 'px';
                break
            case 'right':
                element.style.right = value + 'px';
                break
            case 'top':
                element.style.top = value + 'px';
                break
            case 'bottom':
                element.style.bottom = value + 'px';
                break
            default:
                break
        }
    }

    function slideUp(element, duration = 300) {
        return new Promise(function (resolve, reject) {
            if(getComputedStyle(element).display !== 'none'){
                element.style.height = element.offsetHeight + 'px';
                element.style.transitionProperty = 'height, margin, padding';
                element.style.transitionDuration = duration + 'ms';
                element.offsetHeight; // eslint-disable-line no-unused-expressions
                element.style.overflow = 'hidden';
                element.style.height = 0;
                element.style.paddingTop = 0;
                element.style.paddingBottom = 0;
                element.style.marginTop = 0;
                element.style.marginBottom = 0;
                window.setTimeout(function () {
                    element.style.display = 'none';
                    element.style.removeProperty('height');
                    element.style.removeProperty('padding-top');
                    element.style.removeProperty('padding-bottom');
                    element.style.removeProperty('margin-top');
                    element.style.removeProperty('margin-bottom');
                    element.style.removeProperty('overflow');
                    element.style.removeProperty('transition-duration');
                    element.style.removeProperty('transition-property');
                    resolve(false)
                }, duration)
            }
        })
    }

    function slideDown(element, duration = 300, display = 'block') {
        return new Promise(function (resolve, reject) {
            if(getComputedStyle(element).display === 'none'){
                elementDisplay(element, display);
                const height = element.offsetHeight;
                element.style.overflow = 'hidden';
                element.style.height = 0;
                element.style.paddingTop = 0;
                element.style.paddingBottom = 0;
                element.style.marginTop = 0;
                element.style.marginBottom = 0;
                element.offsetHeight; // eslint-disable-line no-unused-expressions
                element.style.transitionProperty = 'height, margin, padding';
                element.style.transitionDuration = duration + 'ms';
                element.style.height = height + 'px';
                element.style.removeProperty('padding-top');
                element.style.removeProperty('padding-bottom');
                element.style.removeProperty('margin-top');
                element.style.removeProperty('margin-bottom');
                window.setTimeout(function () {
                    element.style.removeProperty('height');
                    element.style.removeProperty('overflow');
                    element.style.removeProperty('transition-duration');
                    element.style.removeProperty('transition-property');
                }, duration)
            }
        });
    }

    function slideToggle(element, duration = 300, display = 'block') {
        if (getComputedStyle(element).display === 'none') {
            return slideDown(element, duration, display);
        } else {
            return slideUp(element, duration);
        }
    }

    function positionHide(element, duration = 300, position = 'left') {
        return new Promise((resolve, reject) => {
            setPosition(element, position, 0);
            element.style.transitionProperty = position;
            element.style.transitionDuration = duration + 'ms';
            setPosition(element, position, -element.offsetWidth);
            setTimeout(function () {
                element.style.display = 'none';
                element.style.removeProperty(position);
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
            }, renderParameters.duration);
        });
    }

    function positionShow(element, duration = 300, display = 'block', position = 'left') {
        return new Promise((resolve, reject) => {
            elementDisplay(element, display);
            setPosition(element, position, -element.offsetWidth);
            element.offsetWidth; // eslint-disable-line no-unused-expressions
            element.style.transitionProperty = position;
            element.style.transitionDuration = duration + 'ms';
            setPosition(element, position, 0);
            setTimeout(function () {
                element.style.removeProperty(position);
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
            }, duration);
        });
    }

    function positionToggle(element, duration = 300, display = 'block', position = 'left') {
        if (getComputedStyle(element).display === 'none') {
            return positionShow(element, duration, display, position);
        } else {
            return positionHide(element, duration, position);
        }
    }

    function hide(element, duration = 300) {
        return new Promise((resolve, reject) => {
            element.animate([
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                }
            ],{
                duration: duration,
            }).onfinish = function() {
                element.style.display = 'none';
            };
        });
    }

    function show(element, duration = 300, display = 'block') {
        return new Promise((resolve, reject) => {
            elementDisplay(element, display);
            element.animate([
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                }
            ],{
                duration: duration,
            }).onfinish = function() {
            };
        });
    }

    return {
        elementDisplay,
        slideUp,
        slideDown,
        slideToggle,
        positionHide,
        positionShow,
        positionToggle,
        hide,
        show
    }
})();