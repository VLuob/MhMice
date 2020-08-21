import React from 'react'
/**
 * 标记指定关键字高亮（以关键字的特殊字符分隔后的数组单个值为单位，不区分大小写）
 * @param {string} text 需要处理的原字符串
 * @param {string} key  需要标记的字符串关键字
 */

// 特殊字符
const specialCharater = new RegExp("[`~!@#$%^&*()\\-+={}':;,\\[\\].<>/?￥…（）_|【】‘；：”“’。，、？\\s]");

export function keyRender(text, key) {
    if (key && text && typeof text === 'string' && typeof key === 'string') {
        const keyArr = key.split(specialCharater).filter(k => k);
        const newText = text.replace(
            new RegExp(keyArr.join("|"), "ig"),
            str => `<Fragment class="lightTip">${str}</Fragment>`
        );
        return (<span dangerouslySetInnerHTML={{ __html: newText }} />);
    } else {
        return text;
    }
}

//标记后端返回的分词高亮（以指定的任意数组来高亮文本，不区分大小写）
//需要高亮的词组：key = [“成都乐开”, “乐开有限”, “A”]；
//文本： text = “成都乐开有限公司a成都成都”;
export function keyArrRender(text, key) {
    if (text && typeof text === 'string' && Array.isArray(key) && key.length > 0) {
        let charIndexCache = {};
        let allKeys = [], matchWords, i;
        let textOrigin = text;
        text = text.toLowerCase();
        for (i = 0; i < key.length; i++) {
            matchWords = text.match(new RegExp(key[i].replace(/([^\w]{1})/ig, "\\$1"), "ig"));
            if (matchWords) {
                if (matchWords.length > 1) {
                    allKeys.push(matchWords);
                } else {
                    allKeys.push(matchWords[0]);
                }
            }
        }
        const readChar = (text, word) => {
            let indexStart = text.indexOf(word);
            if (indexStart >= 0) {
                let replaceWord = "";
                let indexEnd = indexStart + word.length;
                for (let i = indexStart; i < indexEnd; i++) {
                    if (!charIndexCache[i]) {
                        charIndexCache[i] = text.charAt(i);
                    }
                    replaceWord += "#";
                }
                text = text.replace(word, replaceWord);
            }
            return text;
        }
        allKeys.forEach(function (word) {
            if (typeof word === "string") {
                readChar(text, word.toLowerCase());
            } else {
                let textCopy = text.substring(0);
                for (let i = 0; i < word.length; i++) {
                    textCopy = readChar(textCopy, word[i].toLowerCase());
                }
            }
        });
        let word = "", newText = "";
        for (let i = 0, len = text.length; i < len; i++) {
            if (charIndexCache[i]) {
                if (!word) {
                    newText += "<Fragment class='lightTip'>";
                }
                word += textOrigin.charAt(i);
                if (i === text.length - 1) {
                    newText += word + "</Fragment>";
                }
            } else {
                if (word) {
                    newText += word + "</Fragment>";
                    word = "";
                }
                newText += textOrigin.charAt(i);
            }
        }
        return (<span dangerouslySetInnerHTML={{ __html: newText }} />);
    } else {
        return text;
    }
}