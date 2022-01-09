const dayInAMonth = [-1, 31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function isLeapYear(year) {
    return year % 100 != 0 && year % 4 == 0 || year % 400 == 0;
}

export function daysInMonth(year, month) {
    if (month != 2) return dayInAMonth[month];
    if (isLeapYear(year)) return 29;
    return 28;
}

export function daysInYear(year) {
    return isLeapYear(year)? 366: 365;
}
