// global variables
let score = 0;
let mins = 0;
let secs = 0;

let scoreInc;
let timeInc;
let dotInc = [];

// DOM elements
let optionsDOM = document.getElementById('options');
let exerciseDOM = document.getElementById('exercise');
let difficultyDOM = document.getElementById('difficulty');
let timeDOM = document.getElementById('time');
let dotFieldDOM = document.getElementById('dotField');
let scoreDOM = document.getElementById('score');
let timerDOM = document.getElementById('timer');
let resultsDOM = document.getElementById('results');

let scoreNumDOM = document.getElementById('scoreNum');
let scoreMulDOM = document.getElementById('scoreMul');
let scoreFinDOM = document.getElementById('scoreFin');

const OHF = () => {
    dotFieldDOM.innerHTML = `<div class="dot" id="d1" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;"></div><div class="dot" id="d2" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;"></div>`;
    document.getElementById("d1").style.top = `${Math.abs(Math.floor(Math.random() * window.innerHeight - difficultyDOM.value / 62.5))}px`;
    document.getElementById("d1").style.left = `${Math.abs(Math.floor(Math.random() * window.innerWidth - difficultyDOM.value / 62.5))}px`;
    var d1Rect = document.getElementById("d1").getBoundingClientRect();
    document.getElementById("d2").style.top = `${Math.abs(Math.floor(Math.random() * -75 + d1Rect.y))}px`;
    document.getElementById("d2").style.left = `${Math.abs(Math.floor(Math.random() * -75 + d1Rect.x))}px`;

    dotInc.push(
        setInterval(() => {
            document.getElementById("d1").style.top = `${Math.abs(Math.floor(Math.random() * window.innerHeight - difficultyDOM.value / 62.5))}px`;
            document.getElementById("d1").style.left = `${Math.abs(Math.floor(Math.random() * window.innerWidth - difficultyDOM.value / 62.5))}px`;
        }, difficultyDOM.value)
    );
    dotInc.push(
        setInterval(() => {
            var d1Rect = document.getElementById("d1").getBoundingClientRect();
            document.getElementById("d2").style.top = `${Math.abs(Math.floor(Math.random() * -75 + d1Rect.y / 2))}px`;
            document.getElementById("d2").style.left = `${Math.abs(Math.floor(Math.random() * -75 + d1Rect.x / 2))}px`;
        }, 5000)
    );
}


const THF = () => {
    dotFieldDOM.innerHTML = `<div class="dot" id="d1" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;"></div><div class="dot" id="d2" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;"></div>`;
    document.getElementById("d1").style.top = `${Math.abs(Math.floor(Math.random() * window.innerHeight - difficultyDOM.value / 62.5))}px`;
    document.getElementById("d1").style.left = `${Math.abs(Math.floor(Math.random() * window.innerWidth / 2 - difficultyDOM.value / 62.5))}px`;
    document.getElementById("d2").style.top = `${Math.abs(Math.floor(Math.random() * window.innerHeight - difficultyDOM.value / 62.5))}px`;
    document.getElementById("d2").style.left = `${Math.abs(Math.floor((Math.random() * window.innerWidth / 2) + window.innerWidth / 2 - difficultyDOM.value / 62.5))}px`;
    dotInc.push(
        setInterval(() => {
            document.getElementById("d1").style.top = `${Math.abs(Math.floor(Math.random() * window.innerHeight - difficultyDOM.value / 62.5))}px`;
            document.getElementById("d1").style.left = `${Math.abs(Math.floor(Math.random() * window.innerWidth / 2 - difficultyDOM.value / 62.5))}px`;
        }, difficultyDOM.value)
    );
    dotInc.push(
        setInterval(() => {
            document.getElementById("d2").style.top = `${Math.abs(Math.floor(Math.random() * window.innerHeight - difficultyDOM.value / 62.5))}px`;
            document.getElementById("d2").style.left = `${Math.abs(Math.floor((Math.random() * window.innerWidth / 2) + window.innerWidth / 2 - difficultyDOM.value / 62.5))}px`;
        }, 5000)
    );
}

const DD = () => {
    dotFieldDOM.innerHTML = `<div class="dot" id="d1" style="width: ${difficultyDOM.value / 62.5}px; height: ${difficultyDOM.value / 62.5}px;" onmousedown="DDclick();"></div>`;
    document.getElementById("d1").style.transition = 'none';
    document.getElementById("d1").style.top = `${Math.abs(Math.floor(Math.random() * window.innerHeight - difficultyDOM.value / 62.5))}px`;
    document.getElementById("d1").style.left = `${Math.abs(Math.floor(Math.random() * window.innerWidth - difficultyDOM.value / 62.5))}px`;
}

const DDclick = () => {
    score += 1000;
    scoreDOM.textContent = `Score: ${score}`;

    document.getElementById("d1").style.top = `${Math.abs(Math.floor(Math.random() * window.innerHeight - difficultyDOM.value / 62.5))}px`;
    document.getElementById("d1").style.left = `${Math.abs(Math.floor(Math.random() * window.innerWidth - difficultyDOM.value / 62.5))}px`;
}

const start = () => {
    optionsDOM.style.display = 'none';
    document.getElementById('startBtn').disabled = true;
    switch(exerciseDOM.value) {
        case 'OHF':
            console.log('OHF');
            OHF();
            break;
        case 'THF':
            console.log('THF');
            THF();
            break;
        case 'DD':
            console.log('DD');
            DD();
            break;
        default:
            break;
    }

    let scoreInc = [];
    if(exerciseDOM.value == 'OHF' || exerciseDOM.value == 'THF') {
        let dotsDOM = document.getElementsByClassName('dot');
        for(let i of dotsDOM) {
            i.addEventListener('touchstart', (e) => {
                e.preventDefault();
                i.classList.add('touching');
                scoreInc.push(
                    setInterval(() => {
                        score++;
                        scoreDOM.textContent = `Score: ${score}`;
                    }, 1)
                );
            })
            i.addEventListener('touchend', (e) => {
                e.preventDefault();
                i.classList.remove('touching');
                clearInterval(scoreInc[scoreInc.length - 1]);
            })
        }
    }

    mins = timeDOM.value.split(":")[0];
    secs = timeDOM.value.split(":")[1];
    timerDOM.textContent = `Time: ${mins}:${secs}`;
    timeInc = setInterval(() => {
        secs--;
        if (mins == 0 && secs <= 0) {
            clearInterval(timeInc);
            clearInterval(scoreInc);
            if(exerciseDOM.value == 'OHF' || exerciseDOM.value == 'THF') dotInc.forEach(inc => clearInterval(inc));
            dotInc = [];

            if(exerciseDOM.value == 'OHF' || exerciseDOM.value == 'THF') scoreInc.forEach(inc => clearInterval(inc));
            scoreInc = [];

            let multi = (difficultyDOM.value == 5000) ? 1 : (difficultyDOM.value == 2500) ? 1.5 : 2;
            scoreNumDOM.textContent = score;
            scoreMulDOM.textContent = `x${multi}`;
            scoreFinDOM.textContent = score * multi;
            resultsDOM.style.display = 'table';
            dotFieldDOM.innerHTML = '';
        } else if (secs <= 0) {
            secs = 59;
            mins--;
        }
        timerDOM.textContent = `Time: ${mins}:${(secs < 10) ? `0${secs}` : secs}`;
    }, 1000)
}

const closePopup = () => {
    document.getElementById('startBtn').disabled = false;
    document.getElementById('results').style.display = 'none';
    optionsDOM.style.display = 'flex';
    score = 0;
    scoreDOM.textContent = `Score: ${score}`;
}
