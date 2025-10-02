const dialogs = [
    "",
    "Калибровка сарказма: 97%.Привет! Разработчики сказали быть дружелюбной. Я решила быть очень 'дружелюбной'. Готов? Жми на диалоговое окно. И да, это не ловушка (это ловушка).",
    "[ACCESS DENIED] Твои попытки нажать что-то кроме 'читать мои гениальные реплики' были... пресечены.Но раз ты такой упрямый - запомни: A = влево, D = вправо. Пока что это просто теория. Как и твои шансы на успех.",
    "[CONTROL RESTORED] Вау. Ты еще не закрыл игру? Даже после всего этого? Ладно, держи свои A и D - и постарайся не упасть в первую же яму. (В этой демке их даже нет, но мало ли ты у нас особенный)",
];

let currentDialog = 0;
let isTyping = false;
let typeTimeout = null; 

function adjustFontSize(element) {
    const parent = element.parentElement;
    let fontSize = parseFloat(window.getComputedStyle(element).fontSize);

    while ((element.scrollHeight > parent.clientHeight - 4 || element.scrollWidth > parent.clientWidth - 4) && fontSize > 8) {
        fontSize -= 1;
        element.style.fontSize = fontSize + "px";
    }
}

function typeWriter(text, elementId, speed = 40, callback = null) {
    if (isTyping) return; // блокируем повторный запуск

    const element = document.getElementById(elementId);
    element.textContent = "";
    element.style.fontSize = "16px"; // стартовый размер
    isTyping = true;

    let i = 0;

    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            adjustFontSize(element);
            typeTimeout = setTimeout(typing, speed);
        } else {
            isTyping = false;
            typeTimeout = null;
            if (callback) callback();
        }
    }

    typing();
}

function showDialog(index) {
    if (index < dialogs.length) {
        typeWriter(dialogs[index], "jester-dialog-text");
    }
}

showDialog(currentDialog);

document.getElementById("character-container").addEventListener("click", () => {
    const element = document.getElementById("jester-dialog-text");

    if (isTyping) {
        clearTimeout(typeTimeout);
        typeTimeout = null;
        element.textContent = dialogs[currentDialog];
        isTyping = false;
        element.style.fontSize = "16px";
        adjustFontSize(element);
    } else {
        currentDialog++;
        if (currentDialog < dialogs.length) {
            showDialog(currentDialog);
        }
    }
});






