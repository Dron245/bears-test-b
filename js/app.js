(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("DOMContentLoaded", (() => {
        const sel = [];
        function toggleElement(number) {
            const index = sel.indexOf(number);
            if (index === -1) sel.push(number); else sel.splice(index, 1);
        }
        document.addEventListener("click", documentActions);
        function documentActions(e) {
            const targetElement = e.target;
            const action = targetElement.closest(".action__item");
            const list = document.querySelector(".action__list");
            const pickedList = document.querySelector(".picked");
            const img = document.querySelectorAll(".priorities__img");
            if (targetElement.closest(".action__top")) targetElement.closest(".action").classList.toggle("_active");
            if (action && action.dataset.part !== "0") {
                const item = targetElement.closest(".action__item");
                const imgBears = document.querySelectorAll(".priorities__img");
                img.forEach((element => {
                    element.classList.add("_shadow");
                }));
                imgBears.forEach((element => {
                    if (element.dataset.img === action.dataset.part) {
                        toggleElement(element.dataset.img);
                        if (sel.length === 0) img.forEach((element => {
                            element.classList.remove("_shadow");
                        }));
                    }
                    for (let i = 0; i < sel.length; i++) if (element.dataset.img === sel[i]) element.classList.remove("_shadow");
                }));
                pickedList.querySelector("[data-part='0']") ? pickedList.querySelector("[data-part='0']").remove() : null;
                list.querySelector("[data-part='0']").classList.remove("_picked");
                item.classList.toggle("_picked");
                if (pickedList.querySelector(".action__item") && pickedList.querySelector(`[data-part='${item.dataset.part}']`)) pickedList.querySelector(`[data-part='${item.dataset.part}']`).remove(); else pickedList.insertAdjacentHTML("beforeEnd", `<li class="picked__item action__item _picked" data-part="${item.dataset.part}">\n\t\t\t\t\t\t<p class="action__text">${item.querySelector(".action__text").innerText}</p>\n\t\t\t\t\t</li>`);
            } else if (action && action.dataset.part === "0") {
                img.forEach((element => {
                    element.classList.remove("_shadow");
                }));
                sel.length = 0;
                if (action && !pickedList.querySelector("[data-part='0']")) {
                    pickedList.querySelectorAll(".picked__item").forEach((el => el.remove()));
                    pickedList.insertAdjacentHTML("beforeEnd", `<li class="picked__item action__item _picked" data-part="0">\n\t\t\t\t\t\t<p class="action__text">Все направления</p>\n\t\t\t\t\t</li>`);
                    list.querySelectorAll(".action__item").forEach((el => el.classList.remove("_picked")));
                    list.querySelector("[data-part='0']").classList.add("_picked");
                }
            }
            if (targetElement.closest(".picked__item") && targetElement.closest(".picked__item").dataset.part !== "0") {
                const pick = targetElement.closest(".picked__item").dataset.part;
                list.querySelector(`[data-part='${pick}']`).classList.remove("_picked");
            }
            if (action && list.querySelectorAll("._picked").length === 0) {
                list.querySelector("[data-part='0']").classList.add("_picked");
                pickedList.insertAdjacentHTML("beforeEnd", `<li class="picked__item action__item _picked" data-part="0">\n\t\t\t\t\t<p class="action__text">Все направления</p>\n\t\t\t\t</li>`);
            }
            if (targetElement.closest(".actions__likes")) {
                const likes = targetElement.closest(".actions__likes");
                let count = likes.querySelector(".actions__count");
                console.log(count.innerText, typeof count.innerText);
                count.innerText = Number(count.innerText) + 1 + "";
            }
        }
        const img = document.querySelector(".priorities__img");
        const banner = document.querySelector(".priorities__banner");
        banner.style.height = img.clientHeight + "px";
        let resizeTimeout;
        window.addEventListener("resize", (function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout((function() {
                banner.style.height = img.clientHeight + "px";
            }), 100);
        }));
    }));
    window["FLS"] = false;
    menuInit();
})();