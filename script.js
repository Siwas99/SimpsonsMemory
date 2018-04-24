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
        countOfTiles = 0,
        tile1 = "",
        tile2 = "",
        shot = 1,
        tilesClass = 0;

    //Generowanie kafelków w losowej kolejności (nie dziala wtedy odkrywanie)

    /* $(".startButton").click(function () {
         //$(".board").empty();
         for (var y = 0; y < 2; y++) {
             for (var x = 0; x < 15; x++) {
                 var randomNumber = Math.floor(Math.random() * 100);

                 $(".board").prepend("<img class='tilesClosed' src='img/" + tilesImg[x] + "' style='order:" + randomNumber + "' >");
             }
         }
     });*/

    $(".startButton").click(function () {
        shot = 1;
        $('.tiles').empty();
        /* for (var z = 0; z < 2; z++) {
             for (var y = 0; y < 15; y++) {
                 var randomNumber = Math.floor(Math.random() * 100);


                 $(".board").prepend("<div class='tilesClosed " + "img" + y + "' ' style='order:" + randomNumber + "' ></div>");
             }
         }*/
        for (var x = 0; x < 30; x++) {
            tilesClass++;
            if (tilesClass == 15) {
                tilesClass = 0;
            }
            var randomNumber = Math.floor(Math.random() * 100);

            $('.tiles').eq(x).css('order', randomNumber);
            //$('.tiles').eq(x).addClass('img' + tilesClass);
            //$('.tiles').eq(x).addClass('tilesClosed');
            $('.tiles').eq(x).append("<img class='tilesOpened' src='img/" + tilesImg[tilesClass] + "'>");
            $('.tiles').eq(x).prepend("<img class='tilesClosed' src='img/logo.png'>");

        }

        $('.board').css('visibility', 'visible');
    });

    //Odkrywanie i sprawdzanie kafelków 

    $(".tiles").click(function () {
        if ($(this).hasClass('chosen') == false) {
            if (countOfTiles === 0) {
                //$(this).addClass("tilesOpened");
                $(this).children('.tilesOpened').toggle('display');
                $(this).children('.tilesClosed').toggle('display');
                $(this).addClass('chosen');
                countOfTiles++;
                tile1 = $(this).children('.tilesOpened').attr('src');
            } else if (countOfTiles === 1) {
                console.log(shot);

                shot++;
                //$(this).addClass("tilesOpened");
                $(this).children('.tilesOpened').toggle('display');
                $(this).children('.tilesClosed').toggle('display');
                $(this).addClass('chosen');
                countOfTiles++;
                tile2 = $(this).children('.tilesOpened').attr('src');
                if (tile1 !== tile2) {
                    setTimeout(function () {
                        $('.chosen').children('.tilesOpened').css('display', 'none');
                        $('.chosen').children('.tilesClosed').css('display', 'block');
                        $('.chosen').removeClass('chosen');
                        countOfTiles = 0;

                    }, 1000);
                } else {
                    setTimeout(function () {
                        $('.chosen').addClass('found');
                        $('.chosen').removeClass('chosen');
                        countOfTiles = 0;

                    }, 700);
                }
            }
        };
    });
});
