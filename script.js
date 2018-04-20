$(document).ready(function () {
    //Baza kafelków
    var tilesImg = [
        "Homer.png",
        "Marge.png",
        "bart.png",
        "Lisa.png",
        "maggie.png",
        "santaslittlehelper.png",
        "granpda.png",
        "ned.png",
        "itchy.png",
        "strachy.png",
        "comicbookguy.png",
        "milhouse.png",
        "moe.png",
        "monty.png",
        "wiggum.png"
    ],
        y = 0,
        x = 0,
        z = 0,
        tile1 = "",
        tile2 = "",
        shot = 0;


    //Odkrywanie i sprawdzanie kafelków 
    $(".tilesClosed").click(function () {
        if (z === 0) {
            $(this).addClass("tilesOpened");
            z++;
            tile1 = $(this).attr("src");
            console.log(tile1);
        } else if (z === 1) {
            $(this).addClass("tilesOpened");
            z++;
            tile2 = $(this).attr("src");
            console.log(tile2);
            if (tile1 != tile2) {
                setTimeout(function () {
                    $(".tilesOpened").removeClass("tilesOpened");
                    z = 0;
                }, 500);
            } else {
               setTimeout(function() {
                    $(".tilesOpened").addClass("tilesFouned");
                    z = 0;
                }, 500);
            }
        }
    });

    //Generowanie kafelków w losowej kolejności (nie dziala wtedy odkrywanie)
    $(".startButton").click(function () {
        $(".board").empty();
        for (y = 0; y < 2; y++) {
            for (x = 0; x < 15; x++) {
                var randomNumber = Math.floor(Math.random() * 100);

                $(".board").prepend("<img class='tilesClosed' src='img/" + tilesImg[x] + "' style='order:" + randomNumber + "' >");
            }
        }
    });
});


