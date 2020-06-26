export const dotdotdot = (text, maxLength = 96) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};

export const arrangeListIndex = (total, active, index) => {
    let arrangeIndex = total - ((active - 1) * 10 + index);
    return arrangeIndex;
};

export const randomImg = (arr) => {
    let newArr = [];
    arr.map((item) => {
        if (item.exposure == false) {
            newArr.push(item);
        }
    });
    return newArr[Math.floor(Math.random() * newArr.length)];
};

export const mixItem = (arr) => {
    let j, x, i;
    for (i = arr.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }

    return arr;
};

export const getDate = (date, type) => {
    let prototypeDate = new Date(date);

    let dayDate =
        prototypeDate.getDate() < 10
            ? '0' + prototypeDate.getDate()
            : prototypeDate.getDate();

    let yearDate = prototypeDate.getFullYear();

    let monthDate =
        prototypeDate.getMonth() + 1 < 10
            ? '0' + (prototypeDate.getMonth() + 1)
            : prototypeDate.getMonth() + 1;

    let hours =
        prototypeDate.getHours() < 10
            ? '0' + prototypeDate.getHours()
            : prototypeDate.getHours();

    let hours2 = prototypeDate.getHours();

    let minutes =
        prototypeDate.getMinutes() < 10
            ? '0' + prototypeDate.getMinutes()
            : prototypeDate.getMinutes();

    let seconds =
        prototypeDate.getSeconds() < 10
            ? '0' + prototypeDate.getSeconds()
            : prototypeDate.getSeconds();

    let resDate = '';

    switch (type) {
        case 'YY':
            resDate = yearDate;
            break;

        case 'MM':
            resDate = monthDate;
            break;

        case 'DD':
            resDate = dayDate;
            break;

        case 'HH':
            resDate = hours;
            break;
        case 'HH2':
            resDate = hours2;
            break;

        case 'mim':
            resDate = minutes;
            break;

        case 'YYDD':
            resDate = yearDate + '-' + monthDate;
            break;

        case 'YYMMDD':
            resDate = yearDate + '-' + monthDate + '-' + dayDate;
            break;

        case 'YYMMDDHH':
            resDate = yearDate + '-' + monthDate + '-' + dayDate + hours;
            break;

        case 'HHmm':
            resDate = hours + ':' + minutes;
            break;

        case 'YYMMDDHHmm':
            resDate =
                yearDate +
                '-' +
                monthDate +
                '-' +
                dayDate +
                ' ' +
                hours +
                ':' +
                minutes;
            break;

        case 'YYMMDDHHmmSS':
            resDate =
                yearDate +
                '-' +
                monthDate +
                '-' +
                dayDate +
                ' ' +
                hours +
                ':' +
                minutes +
                ':' +
                seconds;
            break;

        default:
            resDate =
                yearDate +
                '-' +
                monthDate +
                '-' +
                dayDate +
                ' ' +
                hours +
                ':' +
                minutes +
                ':' +
                seconds;
            break;
    }

    return resDate;
};

//숫자만
export const numValid = (value) => {
    let isValid = /[^0-9]/g;
    if (isValid.test(value)) return true;
    return false;
};
