function getCellDOM(index) {
    return $("#cell" + index);
}

function solve() {

    let puzzle_string = "";
    for (let index = 0; index < 81; index++)
        if (getCellDOM(index).val() !== "")
            puzzle_string += getCellDOM(index).val();
        else
            puzzle_string += " ";

    let puzzle = new Sudoku(puzzle_string);
    let status_code = 3;
    while (status_code === 3)
        status_code = puzzle.solve();

    if (status_code === 0)
        alert("This sudoku has no solution!");
    else if (status_code === 1)
        write(puzzle);
    else if (status_code === 2) {
        let d = [];
        if (puzzle.guessACell(true, d)) {
            status_code = 1;
            write(puzzle);
        }
        else
            alert("Sudoku cannot be solved!");
    }

    return {
        "status": status_code,
        "solution": puzzle.showValues().join("")
    };
}

function write(puzzle) {
    let values = puzzle.showValues();
    for (let cellIndex = 0; cellIndex < 81; cellIndex++)
        getCellDOM(cellIndex).val(values[cellIndex]);
}

// Removes all inputs in cells
function reset() {
    for (let a = 0; a < 81 ; a++)
        getCellDOM(a).val("");
}

for (let rowIndex = 0; rowIndex < 9; rowIndex++)
    $("<div/>", {class: "line", id: "line" + rowIndex}).appendTo("#container");

for (let id = 0; id < 81; id++) {
	let row = Math.floor(id / 9);
	let col = id % 9;
	let box = (Math.floor(row / 3) * 3) + Math.floor(col / 3);
	let cl = (box % 2 === 0) ? "dark_cell" : "light_cell";
    $("<input/>", {class: cl, id: "cell" + id, maxlength: "1", type: "text"}).appendTo("#line" + row);
}

// To get script which can be used to enter a Sudoku puzzle automatically to UI. 
function debug() {
    let lines = "";
    for (let id = 0; id < 81; id++) {
        if ($("#cell" + id).val().length > 0)
            lines += "$('#cell" + id + "').val('" + $("#cell" + id).val() + "');\n";
    }
    console.log(lines);
}

/*
    Triggering this function will automatically
    enter a very hard sudoku problem into UI, for the problem see:
    https://www.conceptispuzzles.com/index.aspx?uri=info/article/424
*/
function enterHardPuzzle() {
    $("#cell0").val("8");
    $("#cell11").val("3");
    $("#cell12").val("6");
    $("#cell19").val("7");
    $("#cell22").val("9");
    $("#cell24").val("2");
    $("#cell28").val("5");
    $("#cell32").val("7");
    $("#cell40").val("4");
    $("#cell41").val("5");
    $("#cell42").val("7");
    $("#cell48").val("1");
    $("#cell52").val("3");
    $("#cell56").val("1");
    $("#cell61").val("6");
    $("#cell62").val("8");
    $("#cell65").val("8");
    $("#cell66").val("5");
    $("#cell70").val("1");
    $("#cell73").val("9");
    $("#cell78").val("4");
}
/*
    Just to test it with the puzzle above
 */
/*
enterHardPuzzle();
let result = solve();
console.log(result["status"] === 1 && result["solution"] === "812753649943682175675491283154237896369845721287169534521974368438526917796318452");
*/