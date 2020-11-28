$(document).ready(function(){	
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
	
	function displayHTMLTable(results){
		let table = "<table class='table'>";
        let data = results.data;
        let fastestTime = parseFloat(data[1].join(",").split(";")[1]);
        console.log(fastestTime);
		for (i = 0; i < data.length; i++) {
			table += "<tr>";
            let row = data[i];

            //console.log(row);
            let cells = row.join(",").split(";");
            if (parseFloat(cells[1]) < fastestTime) {
                fastestTime = cells[1];
            }
			for (j = 0; j < cells.length; j++) {
				table += "<td>";
				table += cells[j];
				table += "</td>";
			}
			table += "</tr>";
        }
        console.log(fastestTime)
		table += "</table>";
		$("#parsed_csv_list").html(table);
	}
});