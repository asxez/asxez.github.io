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