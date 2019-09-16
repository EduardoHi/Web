
fetch('data/grammys.json')
    .then(function(response) {
	return response.json();
    })
    .then(function(myJson) {
	const fields = myJson["fields"];

	$("#category_types")
	    .append(fields.map(f => $(`<option>${f.field}</option>`)));
	setSelected(fields[0]);

	$("#category_types").change(
	    function (event) {
		setSelected(fields.filter(f => f.field === event.target.value)[0]);
	    });
  });

function setSelected(field) {
    $("#selected_field")
	.text(field.field);
    $("#description")
	.text(field.description);
    
    console.log(field);
    const categories = field.categories.map(c => {
	return $("<div>")
	    .append($(`<h3>${c.category_name}</h3>`))
	    .append($("<ul>"))
	    .append(c.nominees.map((n,i) => {
		const winner = i === c.winner_id;
		return $(
		    `<li ${winner ? "class=\"winner\"" : ''}>
                        ${n.nominee}${winner ? "<span>WINNER!</span>" : ''}
                     </li>`)
		    .append($(`<p>${n.artist}</p>`).append(`<p>${n.info}</p>`));
	    }))
	    .append($("<hr>"));
    });

    $("#nominees_section").empty();
    
    $("#nominees_section")
	.append(categories);
}
