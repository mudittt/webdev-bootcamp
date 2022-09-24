// it will select the 'h1' tag in all of our html file.
// change the 'css' of it.
$("h1").css("color", "red");
$("a").css("display", "block");

//

// will check if the CDN link is working or not
$(document).ready(function () {
  // $("h1").css("color", "blue");
});

// selecting elements
console.log($("button"));
console.log($("button").css("color"));
console.log($("h1").css("fontFamily"));

//

// manipulating styles
// $("button").css("backgroundColor", "#fff");
// $("button").css("border", "1px solid brown");
// $("button").css("color", "brown");

//

// attribute addition/removal
$("h1").addClass("big-title mg-50");
$("a").addClass("mg-50");
$("h1").removeClass("mg-50");

//

// manipulating texts
$("h1").text("adios");
$("button").text("Don't Click Me");
// $("h1").html("<em>Bye Bye</em>");

//

// manipulating Attributes
console.log($("img").attr("src"));
$("a").attr("href", "https://google.com");

//

// adding evenListenres
$("input").keydown(function (e) {
  console.log(e.key);
  $("h1").text(`${e.key}`);
  // it will log the key which is pressed.
  // and will replace the text of the 'h1' tag with the pressed key
});
$("h1").on("mouseover", function () {
  // hover
  $("h1").css("color", "blue");
});
$("button").click(function () {
  // click will change the color of 'h1' tag.
  $("h1").css("color", "purple");
});

//

// adding/removing elements
$("h1").before("<button>Before</button>");
$("h1").after("<button>After</button>");
// $("h1").prepend("<button>Prepend</button>");
// $("h1").append("<button>Append</button>");

// animations
$("button").click(function () {
  // $("h1").hide( );
  // $("h1").show( );
  // $("h1").toggle( );
  // $("h1").fadeIn( );
  // $("h1").fadeOut( );
  // $("h1").fadeToggle();
  // $("h1").slidDown( );
  // $("h1").slideUp();
  // $("h1").slideToggle();
  $("h1").slideUp().slideDown().animate({
    margin: "20px",
  });
});
