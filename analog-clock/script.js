const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");

function setTime(){
    const date = new Date();
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let hourDegree = (hours % 12) * 30 + minutes * 0.5;
    let minuteDegree = (minutes / 60) * 360;
    let secondDegree = (seconds / 60) * 360;

    // translateX(-50%) ensures hands stay horizontally centered.
    // JS transform overwrites the CSS, so we must include it here.
    hour.style.transform = `translateX(-50%) rotate(${hourDegree}deg)`;
    minute.style.transform = `translateX(-50%) rotate(${minuteDegree}deg)`;
    second.style.transform = `translateX(-50%) rotate(${secondDegree}deg)`;

}

setTime();
setInterval(setTime, 1000); //Call setTime every second.