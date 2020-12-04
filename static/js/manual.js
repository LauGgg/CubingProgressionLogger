$(document).ready(function() {
    let inputs = $('input[type=text]')

    $('[data-manualSubmit]').click(function() {
        let row = `<tr><th class="border-right">37</th>`;
        let i;
        for (i = 0; i < inputs.length; i++) {
            if (!isNaN(inputs[i].value)) {
                if (inputs[i].value == '') {
                    $('[data-errors]').append(`<p class="text-danger">${inputs[i].name} cannot be empty</p>`)
                }
                else {
                    row += `<td>${inputs[i].value}</td>`
                }
            } else {
                console.log('There is an error')
                $('[data-errors]').append(`<p class="text-danger">${inputs[i].name} input is not a valid number.</p>`)
            }
        }
        if (!$.trim( $('[data-errors]').html() ).length) {
            $("[data-tableBody]").append(row);
        }
    })
});