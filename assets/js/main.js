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
    if (isNaN(parseInt(index, 10)) || index == 7) index = 0;
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


function description(r, text) {
    function t() {
        return b[Math.floor(Math.random() * b.length)];
    }

    function e() {
        return String.fromCharCode(94 * Math.random() + 33);
    }

    function n(r) {
        for (let n = document.createDocumentFragment(), i = 0; r > i; i++) {
            let l = document.createElement("span");
            l.textContent = e();
            l.style.color = t();
            n.appendChild(l);
        }
        return n;
    }

    function i() {
        let t = o[c.skillI];
        c.step ? c.step-- : ((c.step = g), c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? ((c.text += t[c.skillP]), c.skillP++) : c.delay ? c.delay-- : ((c.direction = "backward"), (c.delay = a)) : c.skillP > 0 ? ((c.text = c.text.slice(0, -1)), c.skillP--) : ((c.skillI = (c.skillI + 1) % o.length), (c.direction = "forward"))), (r.textContent = c.text), r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d);
    }

    let l = "",
        o = [text].map(function (r) {
            return r + "";
        }),
        a = 3,
        g = 1,
        s = 5,
        d = 75,
        b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
        c = {text: "", prefixP: -s, skillI: 0, skillP: 0, direction: "forward", delay: a, step: g};
    i();
}

document.addEventListener('DOMContentLoaded', function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let res = JSON.parse(this.responseText);
            description(document.getElementById('description'), res['hitokoto']);
        }
    }
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
        , 'color:red');
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
