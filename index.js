// ==UserScript==
// @name         Boss直聘高亮未沟通, 隐藏已沟通
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  一个油猴脚本, 将Boss直聘的未沟通岗位高亮, 同时可选隐藏已沟通岗位, 方便各位海投
// @author       cuicuiV5
// @match        https://www.zhipin.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhipin.com
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function () {
    "use strict";
    let previousURL = window.location.href;
    let cfg = {
        isHide: false,
    };
    const init = () => {
        // 查找类名为start-chat-btn的按钮
        const btns = document.querySelectorAll(".start-chat-btn");
        console.log("成功获取到了要筛选的元素", btns);
        // 遍历这些按钮列表,查找innerText为立即沟通的按钮
        btns.forEach(btn => {
            if (btn.innerHTML == "立即沟通") {
                // 将他的父级元素的背景色更改为深色背景

                btn.parentElement.parentElement.parentElement.parentElement.style.backgroundColor =
                    "#e5f8f8";
            } else if (cfg.isHide == true) {
                btn.parentElement.parentElement.parentElement.parentElement.style.display =
                    "none";
            }
        });
    };

    const checkURLChange = () => {
        const currentURL = window.location.href;

        if (currentURL !== previousURL) {
            // URL发生了变化
            console.log("URL发生了变化:", currentURL);
            init();
            previousURL = currentURL; // 更新previousURL
        }
    };

    const insertDom = () => {
        // 添加选项按钮到页面上
        const target = document.querySelector(".search-condition-wrapper");
        target.insertAdjacentHTML(
            "beforeend",
            `    <input type="checkbox"  id="isHideChatted">
                <label for="isHideChatted">是否隐藏已沟通</label>`,
        );
        // 给复选框绑定事件
        // 先获取元素
        const checkbox = document.querySelector("#isHideChatted");
        checkbox.addEventListener("click", () => {
            console.log("切换显示隐藏", checkbox.checked);
            cfg.isHide = checkbox.checked;
            init();
        });
    };
    setTimeout(init, 2000);
    setTimeout(insertDom, 2000);
    // 每隔一段时间检查一次URL变化
    setInterval(checkURLChange, 2000); // 每秒检查一次
})();
