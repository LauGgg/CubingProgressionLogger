class Table {
	constructor(results) {
		this.solveArray = this.convertToFloat(results.data);
		this.nrOfSovles = this.solveArray.length;
		this.mean = (this.solveArray.reduce((a, b) => a + b) / this.nrOfSovles).toFixed(2);
		this.percentageSub10;
		this.fastest = {
			sng: Math.min(...this.solveArray), 
			mo3: this.calcMo3(this.solveArray.slice(0, 3)),
			ao5: this.calcAvg(this.solveArray.slice(0, 5)),
			ao12: this.calcAvg(this.solveArray.slice(0, 12))
		};
	}

	displayTable() {
		let last12Solves = [];
		let i;
		let sub10s = 0;
		for (i = 0; i < this.nrOfSovles; i++) {
			if (last12Solves.push(this.solveArray[i]) > 12) {
				last12Solves.shift();
			}
			this.calcFastest(last12Solves)
			if (this.solveArray[i] < 10) {
				sub10s += 1;
			}
		}
		this.percentageSub10 = ((sub10s / this.nrOfSovles) * 100).toFixed(2);
		console.log(this.fastest);
		$("[data-tableBody]").append(`
		<tr>
			<th class="border-right">37</th>
			<td>${this.fastest.sng}</td>
			<td>${this.fastest.mo3.time}</td>
			<td>${this.fastest.ao5.time}</td>
			<td>${this.fastest.ao12.time}</td>
			<td class="border-left">${this.nrOfSovles}</td>
			<td>${this.mean}</td>
			<td>${this.percentageSub10}%</td>
		</tr>	
		`
		);
	}

	calcFastest(array) {
		if (array.length >= 3) {
			let mo3 = this.calcMo3(array.slice(array.length - 3, array.length));
			if (mo3.time < this.fastest.mo3.time) {
				this.fastest.mo3 = mo3;
			}
			if (array.length >= 5) {
				let ao5 = this.calcAvg(array.slice(array.length - 5, array.length));
				if (ao5.time < this.fastest.ao5.time) {
					this.fastest.ao5 = ao5;
				}
				if (array.length == 12) {
					let ao12 = this.calcAvg(array);
					if (ao12.time < this.fastest.ao12.time) {
						this.fastest.ao12 = ao12;
					}
					return [mo3.time, ao5.time, ao12.time];
				}
				return [mo3.time, ao5.time, 'null'];
			}
			return [mo3.time, 'null', 'null'];
		}
		return ['null', 'null', 'null'];
	}

	calcMo3(array) {
		return {time: +((array[0] + array[1] + array[2]) / 3).toFixed(2), times: array};
	}

	calcAvg(array) {
		let sum = 0;
		let i;
		let minSum = 0;
		let maxSum = 0;
		for (i = 0; i < array.length; i++) {
			if (array[i] != Math.min(...array) && array[i] != Math.max(...array)) {
				sum += array[i];
			} else {
				if (array[i] == Math.min(...array)) {
					minSum += 1;
					if (minSum > 1) {
						sum += array[i];
					}
				} else if (array[i] == Math.max(...array)) {
					maxSum += 1;
					if (maxSum > 1) {
						sum += array[i];
					}
				}
			}
		}
		return {time: +(sum / (array.length - 2)).toFixed(2), times: array};
	}

	convertToFloat(data) {
		let floatArray = [];
		let i;
		for (i = 1; i < data.length; i++) {
			let cells = data[i].join(",").split(";");
			let time = parseFloat(cells[1]);
			floatArray.push(time);
		}
		return floatArray;
	}
}

function displayHTMLTable(results) {
	let table = new Table(results);
	table.displayTable();
}

$(document).ready(function() {
    $('#submit-file').on("click", function(e) {
		e.preventDefault();
		$('#files').parse({
			config: {
				delimiter: "auto",
				complete: displayHTMLTable,
			},
			before: function(file, inputElem)
			{
				//console.log("Parsing file...", file);
			},
			error: function(err, file)
			{
				//console.log("ERROR:", err, file);
			},
			complete: function()
			{
				//console.log("Done with all files");
			}
		});
	});
	$('[data-csvContent]').hide()
	$('[data-manualContent]').hide()
});
