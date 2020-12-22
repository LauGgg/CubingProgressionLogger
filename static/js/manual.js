$(document).ready(function() {
    let inputs = $('input[type=text]')
    $('[data-manualSubmit]').click(function() {
        let week;
        if (!$.trim( $('[data-tableBody]').html() ).length) {
            week = '37';
        } else {
            week = parseInt($('[data-tableBody] tr:last [data-week]').text()) + 1;
        }
        let row = `<tr><td class="border-right">${week}</td>`;
        let i;
        for (i = 0; i < inputs.length; i++) {
            if (!isNaN(inputs[i].value)) {
                if (inputs[i].value == '') {
                    $('[data-errors]').append(`<p class="text-danger">${inputs[i].name} cannot be empty</p>`)
                }
                else {
                    if (i == 4) {
                        row += `<td class="border-left">${inputs[i].value}</td>`
                    } else if (i == 6) {
                        row += `<td>${inputs[i].value}%</td>`
                    } else {
                        row += `<td>${inputs[i].value}</td>`
                    }
                }
            } else {
                console.log('There is an error')
                $('[data-errors]').append(`<p class="text-danger">${inputs[i].name} input is not a valid number.</p>`)
            }
        }
        if (!$.trim( $('[data-errors]').html() ).length) {
            row += '</tr>';
            $("[data-tableBody]").append(row);
            $('[data-StorageError]').html('');

        }
    });
});