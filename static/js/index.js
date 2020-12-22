function meanColor(mean) {
    let colors = {
        12: 'rgb(214, 0, 0)',
        11.5: 'rgb(128, 38, 217)',
        11: 'rgb(0, 51, 204)',
        10.5: 'rgb(17, 164, 212)'
    };
    let rounded = 0;
    if (Math.floor(mean) != Math.floor(mean - 0.5)) {
        rounded = Math.floor(mean);
    } else {
        rounded = Math.floor(mean) + 0.5;
    }
    if (rounded >= 12) {
        rounded = 12;
    }
    return colors[rounded.toString()];
}

$(document).ready(function() {	
    $('[data-csvBtn]').on("click", function(e) {
        if ($('[data-csvBtn]').hasClass('btn-secondary')) {
            $('[data-csvBtn]').attr('class', 'btn btn-primary')
            if ($('[data-manualBtn]').hasClass('btn-primary')) {
                $('[data-manualBtn]').attr('class', 'btn btn-secondary')
                $('[data-manualContent]').hide()
            }   
            $('[data-csvContent]').show()     
        } else {
            $('[data-csvContent]').hide()
            $('[data-csvBtn]').attr('class', 'btn btn-secondary');
        }
    });
    $('[data-manualBtn]').on("click", function(e) {
        if ($('[data-manualBtn]').hasClass('btn-secondary')) {
            $('[data-manualBtn]').attr('class', 'btn btn-primary');
            if ($('[data-csvBtn]').hasClass('btn-primary')) {
                $('[data-csvBtn]').attr('class', 'btn btn-secondary');
                $('[data-csvContent]').hide()
            }
            $('[data-manualContent]').show()
        } else {
            $('[data-manualContent]').hide()
            $('[data-manualBtn]').attr('class', 'btn btn-secondary')
        }
    });
    $('[data-csvContent]').hide()
    $('[data-manualContent]').hide()
    let retrivedObject = localStorage.getItem('table')
    //console.log(retrivedObject)
    //localStorage.removeItem('table');
    if (retrivedObject == null) {
        $('[data-StorageError]').html('You have never created a row')
    } else {
        let table = JSON.parse(retrivedObject)
        // console.log(table)
        let i;
        for (i = 0; i < table.length; i++) {
            $("[data-tableBody]").append(`
			<tr>
				<td data-week class="border-right">${table[i].week}</td>
				<td>${table[i].sng}</td>
				<td>${table[i].mo3}</td>
				<td>${table[i].ao5}</td>
				<td>${table[i].ao12}</td>
				<td class="border-left">${table[i].solves}</td>
				<td class="mean" style="box-shadow: inset 0 0 0 var(--padding) ${meanColor(table[i].mean)};">${table[i].mean}</td>
				<td>${table[i].pSub10}%</td>
            </tr>
            `);
        }
    }
});