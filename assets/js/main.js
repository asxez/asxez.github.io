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


function displayTypingEffect(outputElement, text) {
    // 生成随机文本颜色
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 生成随机字符
    function getRandomCharacter() {
        return String.fromCharCode(94 * Math.random() + 33);
    }

    // 创建包含指定数量字符的文档片段
    function createCharacterSpans(count) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const charSpan = document.createElement("span");
            charSpan.textContent = getRandomCharacter();
            charSpan.style.color = getRandomColor();
            fragment.appendChild(charSpan);
        }
        return fragment;
    }

    // 模拟文本逐字输入效果
    function typeText() {
        const currentSkillText = skillTexts[typingState.skillIndex];
        if (typingState.step) {
            typingState.step--; // 减小步数，等待下一个字符的输入
        } else {
            typingState.step = initialStep; // 重置步数
            if (typingState.prefixPointer < mainText.length) {
                if (typingState.prefixPointer >= 0) {
                    typingState.displayText += mainText[typingState.prefixPointer];
                }
                typingState.prefixPointer++; // 移动前缀指针，显示主文本
            } else if (typingState.direction === "forward") {
                if (typingState.skillPointer < currentSkillText.length) {
                    typingState.displayText += currentSkillText[typingState.skillPointer];
                    typingState.skillPointer++;  // 移动技能指针，显示技能文本
                } else if (typingState.delay) {
                    typingState.delay--; // 减小延迟计数
                } else {
                    typingState.direction = "backward"; // 切换方向，开始删除字符
                    typingState.delay = initialDelay; // 重置延迟计数
                }
            } else if (typingState.skillPointer > 0) {
                typingState.displayText = typingState.displayText.slice(0, -1); // 删除最后一个字符
                typingState.skillPointer--; // 移动技能指针，继续删除字符
            } else {
                typingState.skillIndex = (typingState.skillIndex + 1) % skillTexts.length; // 切换到下一个技能文本
                typingState.direction = "forward"; // 切换方向，开始输入新的技能文本
            }
        }
        outputElement.textContent = typingState.displayText; // 在输出元素中显示文本
        outputElement.appendChild(createCharacterSpans(
            typingState.prefixPointer < mainText.length
                ? Math.min(spanCount, spanCount + typingState.prefixPointer)
                : Math.min(spanCount, currentSkillText.length - typingState.skillPointer)
        ));
        setTimeout(typeText, typingInterval); // 以打字间隔时间调用自身，继续模拟打字效果
    }

    const mainText = ""; // 主文本
    const skillTexts = [text + ""]; // 技能文本
    const initialDelay = 3; // 初始延迟
    const initialStep = 1;  // 初始步长
    const spanCount = 5; // 每次添加的字符数
    const typingInterval = 75; // 打字间隔时间（毫秒）
    const colors = [
        "rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)",
        "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)",
        "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)",
        "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"
    ];
    // 打字效果的状态
    const typingState = {
        displayText: "",
        prefixPointer: -spanCount,
        skillIndex: 0,
        skillPointer: 0,
        direction: "forward",
        delay: initialDelay,
        step: initialStep
    };
    typeText();
}


document.addEventListener('DOMContentLoaded', function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let res = JSON.parse(this.responseText);
            displayTypingEffect(document.getElementById('description'), res['hitokoto']);
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
