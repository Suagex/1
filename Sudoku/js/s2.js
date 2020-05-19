var x = 0;
var y = 0;
var on_cell = false;
$("td").mouseenter(function () {
    x = parseInt($(this).attr('class')[3]);
    y = parseInt($(this).parent().attr('class')[3])
    on_cell = true;
    let value = parseInt($(this).html())
    console.log(
        y,
        x,
        value
    );
});

$("table").mouseleave(function () {
    on_cell = false;
    x = -1;
    y = -1
    // let value = parseInt($(this).html())
    // console.log(
    //     y,
    //     x,
    //     value
    // );
});

$(document).keydown(function (event) {
    if (on_cell && 48 < event.keyCode && event.keyCode < 58) {
        document.querySelector('.row' + y + ' .col' + x).innerHTML = event.keyCode - 48;
    } else if (on_cell && 96 < event.keyCode && event.keyCode < 106) {
        document.querySelector('.row' + y + ' .col' + x).innerHTML = event.keyCode - 96;
    } else if (on_cell && event.keyCode === 32) {
        document.querySelector('.row' + y + ' .col' + x).innerHTML = "";
    }
});

$(document).ready(function () {
    $(".read_ex").click(function () {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                problem[i][j] = ex_problem[i][j];
            }
        }
        ref();
    });
});

$(document).ready(function () {
    $(".clear").click(function () {
        console.log(321)
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                problem[i][j] = 0;
            }
        }
        ref();
    });
});

$(document).ready(function () {
    $(".calculate").click(function () {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                var n_v = parseInt(document.querySelector('.row' + i + ' .col' + j).innerHTML);
                // problem[i][j] = document.querySelector('.row' + i + ' .col' + j).innerHTML = problem[i][j];
                if (isNaN(n_v)) {
                    problem[i][j] = 0;
                } else {
                    problem[i][j] = n_v;
                }
            }
        }
        console.dir(problem);
        findAnswer();
        ref();
    });
});

var ex_problem = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]
];

var problem = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];


var stack = [], flag = false, count = 0;

function findAnswer() {
    stack = [];
    flag = false;
    count = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9;) {
            if (problem[i][j] === 0 || flag) {
                flag = false;
                let k = problem[i][j] + 1;
                while (k < 10) {
                    problem[i][j] = k;
                    count++;
                    if (check20Grid(problem, i, j) == 0) {
                        stack.push([i, j++])
                        break;
                    }
                    k++;
                }
                if (k > 9) {
                    problem[i][j] = 0;
                    let rt = stack.pop();
                    if (!rt)
                        return 0;
                    i = rt[0]
                    j = rt[1]
                    flag = true;
                }
            } else {
                j++;
            }
            // console.log('i:'+i+'---j:'+j)
        }
    }
    return 1;
}

function check20Grid(sudo, i, j) {
    let row = {}, col = {}, subSudo = {}
    for (let k = 0; k < 9; k++) {
        let cur1 = sudo[i][k], cur2 = sudo[k][j]
        if (row[cur1])
            return 1;
        else
            row[cur1] = cur1
        if (col[cur2])
            return 2;
        else
            col[cur2] = cur2;
        let key = sudo[Math.floor(i / 3) * 3 + Math.floor(k / 3)][Math.floor(j / 3) * 3 + Math.floor(k % 3)]
        if (subSudo[key])
            return 3
        else
            subSudo[key] = key
    }
    return 0;
}

function checkValid(sudo) {
    let subSudo = {}
    for (let i = 0; i < 9; i++) {
        let row = {}, col = {}
        for (let j = 0; j < 9; j++) {
            let cur1 = sudo[i][j], cur2 = sudo[j][i]
            if (row[cur1])
                return 1;
            else
                row[cur1] = cur1
            if (col[cur2])
                return 2;
            else
                col[cur2] = cur2;

            let key = Math.floor(i / 3) + '-' + Math.floor(j / 3)
            if (subSudo[key]) {
                if (subSudo[key][cur1])
                    return 3
                else
                    subSudo[key][cur1] = cur1
            } else {
                subSudo[key] = {}
                subSudo[key][cur1] = cur1
            }
        }
    }
    return 0;
}

function ref() {
    for (let i = 0; i < 81; i++) {
        let r = i % 9
        let c = parseInt(i / 9)
        if (problem[r][c] === 0) {
            document.querySelector('.row' + r + ' .col' + c).innerHTML = "";
            continue;
        }
        document.querySelector('.row' + r + ' .col' + c).innerHTML = problem[r][c];
    }
}

// console.log(findAnswer());
// console.log(problem)
// console.log(count)

// console.log("hello!!!!")