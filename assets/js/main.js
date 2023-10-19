var iUp = (function () {
    let time = 0,
        duration = 150,
        clean = function () {
            time = 0;
        },
        up = function (element) {
            setTimeout(function () {
                element.classList.add("up");
            }, time);
            time += duration;
        },
        down = function (element) {
            element.classList.remove("up");
        },
        toggle = function (element) {
            setTimeout(function () {
                element.classList.toggle("up");
            }, time);
            time += duration;
        };
    return {
        clean: clean,
        up: up,
        down: down,
        toggle: toggle
    };
})();

function getImages() {
    let indexName = "image-index";
    let index = sessionStorage.getItem(indexName);
    let panel = document.querySelector('#panel');
    if (isNaN(parseInt(index,10)) || index == 7) index = 0;
    else index++;
    panel.style.background = "url('https://api.asxe.vip/scenery.php') center center no-repeat #666";
    panel.style.backgroundSize = "cover";
    sessionStorage.setItem(indexName, index);
}

function decryptEmail(encoded) {
    let address = atob(encoded);
    window.location.href = "mailto:" + address;
}


function ShowRunTime(id) {
    let BootDate = new Date("2023/10/17 19:13:00");
    let t = new Date,
        o = parseInt((t - BootDate).toString()),
        n = Math.floor(o / 864e5),
        a = Math.floor(o % 864e5 / 36e5),
        r = Math.floor(o % 864e5 % 36e5 / 6e4),
        h = Math.round(o % 864e5 % 36e5 % 6e4 / 1e3),
        u = n + " 天 " + a + " 时 " + r + " 分 " + h + " 秒";
    document.getElementById(id).textContent = "本站已运行 " + u
}
setInterval("ShowRunTime('RunTime')", 1e3)


document.addEventListener('DOMContentLoaded', function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText);
            document.getElementById('description').innerHTML = res['hitokoto'] + "<br/> 「<strong>" + res['from'] + "</strong>」";
        }
    };
    xhr.open("GET", "https://v1.hitokoto.cn", true);
    xhr.send();

    let iUpElements = document.querySelectorAll(".iUp");
    iUpElements.forEach(function (element) {
        iUp.up(element);
    });

    let avatarElement = document.querySelector(".js-avatar");
    avatarElement.addEventListener('load', function () {
        avatarElement.classList.add("show");
    });
});


document.addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    // let div = document.createElement("div");
    // let span = document.createElement("span");
    // let header = document.getElementById('panel');
    // span.textContent = '为了浏览体验，本站禁用右键';
    // div.appendChild(span);
    // div.style.top = '15px';
    // div.style.display = 'flex';
    // div.style.width = 'auto+10px';
    // div.style.height = '40px';
    // div.style.position = 'fixed';
    // div.style.alignItems = 'center';
    // div.style.justifyContent = 'center';
    // div.style.backgroundColor = 'black';
    // span.style.color = 'red';
    //
    // header.appendChild(div);
    // setTimeout(() => {
    //     div.remove();
    // },2000);
});

function msg() {
    console.log(
        "%c\n" +
        "            _______   ________ \n" +
        "     /\\    / ____\\ \\ / /  ____|\n" +
        "    /  \\  | (___  \\ V /| |__   \n" +
        "   / /\\ \\  \\___ \\  > < |  __|  \n" +
        "  / ____ \\ ____) |/ . \\| |____ \n" +
        " /_/    \\_\\_____//_/ \\_\\______|\n" +
        "                               \n" +
        "                               \n"
    ,'color:red');
    console.log('%cASXE的主页\nhttps://www.asxe.vip', 'color:green');

}

window.addEventListener('load', msg);


let btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
let navigationWrapper = document.querySelector('.navigation-wrapper');

btnMobileMenu.addEventListener('click', function () {
    if (navigationWrapper.style.display == "block") {
        navigationWrapper.addEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            navigationWrapper.classList.toggle('visible');
            navigationWrapper.classList.toggle('animated');
            navigationWrapper.classList.toggle('bounceOutUp');
            navigationWrapper.removeEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', arguments.callee);
        });
        navigationWrapper.classList.toggle('animated');
        navigationWrapper.classList.toggle('bounceInDown');
        navigationWrapper.classList.toggle('animated');
        navigationWrapper.classList.toggle('bounceOutUp');
    } else {
        navigationWrapper.classList.toggle('visible');
        navigationWrapper.classList.toggle('animated');
        navigationWrapper.classList.toggle('bounceInDown');
    }
    btnMobileMenu.classList.toggle('social');
    btnMobileMenu.classList.toggle('iconfont');
    btnMobileMenu.classList.toggle('icon-list');
    btnMobileMenu.classList.toggle('social');
    btnMobileMenu.classList.toggle('iconfont');
    btnMobileMenu.classList.toggle('icon-angleup');
    btnMobileMenu.classList.toggle('animated');
    btnMobileMenu.classList.toggle('fadeIn');
});
