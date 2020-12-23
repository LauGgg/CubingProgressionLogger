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

let firstPb = JSON.parse(localStorage.getItem('pb'));
let currentPb = firstPb;
// console.log(pb)

function isPb(avg, time) {
    if (time < currentPb[avg]) {
        currentPb[avg] = time
        return `<td class="text-danger">${time}</td>`;
    }
    return `<td>${time}</td>`;
}

// let pb = {'sng': 7.27,'mo3': 11.00,'ao5': 11.00,'ao12': 11.00};
// localStorage.setItem('pb', JSON.stringify(pb));

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

        let i;
        for (i = 0; i < table.length; i++) {
            $("[data-tableBody]").append(`
			<tr>
                <td data-week class="border-right">${table[i].week}</td>
                ${isPb("sng", table[i].sng)}
                ${isPb("mo3", table[i].mo3)}
                ${isPb("ao5", table[i].ao5)}
                ${isPb("ao12", table[i].ao12)}
				<td class="border-left">${table[i].solves}</td>
				<td class="mean" style="box-shadow: inset 0 0 0 var(--padding) ${meanColor(table[i].mean)};">${table[i].mean}</td>
				<td>${table[i].pSub10}%</td>
            </tr>
            `);
        }
    }
});