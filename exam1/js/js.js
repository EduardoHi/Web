
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
$("#escribe_reseña").click(
    () => $("#seccion_comentario").toggleClass("hidden")
);

/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/

getTxt = e => s => e.find(s).text()

$.ajax(
    {
	url: "data/comentarios.xml",
	type: "GET",
	dataType: "xml",
	success: data => {
	    const comments = [];

	    $(data)
		.find("comments")
		.find("comment")
		.each(function() {
		    const comment = $(this);
		    const getC = getTxt(comment);
		    comments.push({
			name: getC("name"),
			email: comment.find("name").attr("email"),
			stars: getC("stars"),
			date: getC("date"),
			text: getC("text")
		    });
		});
	    
	    $("#seccion_reviews").append(comments.map(createComment));
	},
	error: error => {
	    console.log(error);
	}
    }
);

function createComment(c) {
    const starSpan = getStarsSpans(c.stars);
    const review = $(`
<div class="review">
<span class="nombre">${c.name}</span>
<a href="mailto: ${c.email}">${c.email}</a>
<br>
</div>
`);
    review.append(starSpan);
    review.append($(`<span class="date">${c.date}</span>`));
    review.append($(`<p>${c.text}</p>`));
    return review;
}

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/

$("#btn-publicar").click(() => {
    const $name = $("#nombre");
    const $email = $("#email");
    const $text = $("#comentario");
	  
    const starVal = parseInt($("input[name='rating']:checked").val());
    const nameVal = $name.val();
    const emailVal = $email.val();
    const textVal = $text.text();

    if(nameVal === "" || textVal === "") {
	$("#error_comment").removeClass("hidden");
	return;
    } else {
	$("#error_comment").addClass("hidden");
    }
    
    const newComment = {stars: starVal, name: nameVal, email: emailVal, text: textVal};

    const comment = createComment(newComment);

    $("#seccion_reviews").append(comment);
    $name.val("");
    $email.val("");
    $text.empty();
});

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$("#btn-limpiar").click(() => {
    $("#nombre").val("");
    $("#email").val("");
    $("#comentario").empty();
});

/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
