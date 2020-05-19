// document.getElementsByClassName("col0")[0].innerHTML = "132";
// document.querySelector(".row8 .col8").innerHTML = "么么";
var num_list = [
    8, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 6, 0, 0, 0, 0, 0,
    0, 7, 0, 0, 9, 0, 2, 0, 0,

    0, 5, 0, 0, 0, 7, 0, 0, 0,
    0, 0, 0, 0, 4, 5, 7, 0, 0,
    0, 0, 0, 1, 0, 0, 0, 3, 0,

    0, 0, 1, 0, 0, 0, 0, 6, 8,
    0, 0, 8, 5, 0, 0, 0, 1, 0,
    0, 9, 0, 0, 0, 0, 4, 0, 0,
]

function point(x, y) {
    this.x = x;
    this.y = y;
    this.be_able = [];
    this.var = 0;
}

function remove_0(list) {
    var list_length = list.length;
    var zero_index_list = [];
    for (let i = 0; i < list_length; i++) {
        if (list[i] == 0) {
            zero_index_list.push(i);
        }
    }
    var zero_num = zero_index_list.length;
    for (let i = zero_num - 1; i >= 0; i--) {
        list.splice(zero_index_list[i]);
    }
}

function Sudoku(sudoku_data) {

    this.show_in_console = function () {
        this.point_list.forEach(element => {
            console.log(element.x, element.y, element.var)
        });
    }

    this.show_in_web = function () {
        this.point_list.forEach(element => {
            var se = ".row" + element.y + " .col" + element.x
            document.querySelector(se).innerHTML = element.var;
            console.log(element.x, element.y, element.var)
        });
    }

    this.row_nums = function (point) {
        var nums = this.sudoku_data.slice(point.y * 9, point.y * 9 + 9);
        remove_0(nums);
        const ret = Array.from(new Set(nums));
        console.log(ret);
        return ret;
    }

    this.col_nums = function (point) {
        var col = [];
        var length = point.length;
        for (let i = point.x; i < length; i += 9) {
            col.push(this.sudoku_data[i]);
        }
        remove_0(col);
        return Array.from(new Set(col));
    }

    this.blo_nums = function (point) {
        var b_x = parseInt(point.x / 3);
        var b_y = parseInt(point.y / 3);
        var block = [];
        var start = b_x * 3 + b_y * 3 * 9;

        for (let i = start + 9 * 0; i < start + 3 + 9 * 0; i++) {
            block.push(this.sudoku_data[i])
        }
        for (let i = start + 9 * 1; i < start + 3 + 9 * 1; i++) {
            block.push(this.sudoku_data[i])
        }
        for (let i = start + 9 * 2; i < start + 3 + 9 * 2; i++) {
            block.push(this.sudoku_data[i])
        }

        remove_0(block);
        return Array.from(new Set(block));
    }

    this.check = function (point) {
        if (point.var === 0) {
            console.log("找不到可用值!");
            return false;
        }
        return !(point.var in this.row_nums(point)) &&
            !(point.var in this.col_nums(point)) &&
            !(point.var in this.blo_nums(point));
    }

    this.try_do = function (point) {
        var var_able = point.be_able;
        var_able.forEach(element => {
            point.var = element;
            if (this.check(point)) {
                this.sudoku_data[point.y * 9 + point.x] = point.var;
                if (this.point_list.length <= 0) {
                    this.show_in_web();
                    this.flag = false;
                }
                // console.log(this.point_list);
                var p = this.point_list.pop();
                // console.log(p);
                // console.log("AAA")
                this.try_do(p);
                if (this.flag) {
                    this.sudoku_data[point.y * 9 + point.x] = 0;
                    p.var = 0;
                    this.point_list.push(p)
                } else {
                    return;
                }
            }
        });
    }

    this.sudoku_data = sudoku_data
    this.point_list = [];
    this.length = this.sudoku_data.length;
    this.flag = true;
    console.log(this.length);
    for (let i = 0; i < this.length; i++) {
        if (sudoku_data[i] === 0) {
            var p = new point(i % 9, parseInt(i / 9));
            for (let j = 1; j <= 10; j++) {
                if (
                    !(j in this.row_nums(p)) &&
                    !(j in this.col_nums(p)) &&
                    !(j in this.blo_nums(p))
                ) {
                    p.be_able.push(j);
                }
            }
        }
        this.point_list.push(p);
    }
    this.show_in_web();
//     var p0 = this.point_list.pop();
//     this.try_do(p0);
//     this.show_in_web();
}

new Sudoku(num_list);
