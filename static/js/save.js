function format(num) {
    if (countDecimals(num) == 2) {
        return num
    } else if (countDecimals(num) == 1) {
        return `${num}0`
    } else {
        return `${num}.00`
    }
}

function countDecimals(num) {
    if(Math.floor(num.valueOf()) === num.valueOf()) return 0;
    return num.toString().split(".")[1].length || 0; 
}

$(document).ready(function() {
    let table = [];
    $('[data-save]').on( "click", function() {
        let topics = ['week', 'sng', 'mo3', 'ao5', 'ao12', 'solves', 'mean', 'pSub10'];
        $('[data-tableBody] tr').each(function() {
            let row = {};
            let i = 0;
            $(this).find('td').each(function() {
                if (0 < i && ![5, 7].includes(i)) {
                    row[topics[i]] = format(parseFloat($(this).text()));
                } else {
                    row[topics[i]] = parseFloat($(this).text());
                }
                i++;
            })
            table.push(row);
        })
        console.log(table);
        if (table.length == 0) {
            console.log('no changes');
        } else {
            localStorage.setItem('table', JSON.stringify(table));
        }
    });
});