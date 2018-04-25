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
        tilesClass = 0,
        tilesFound = 0,
        sec = 0,
        time = setInterval(function(){stoper()}, 1000);

    function stoper(){
        sec++;
    };
    
    //Generowanie kafelków w losowej kolejności + restart gry

    $(".startButton").click(function () {
        time;
        $('.tiles').empty();
        shot = 1;
        for (var x = 0; x < 30; x++) {
            tilesClass++;
            if (tilesClass == 15) {
                tilesClass = 0;
            }
            var randomNumber = Math.floor(Math.random() * 100);

            $('.tiles').eq(x).css('order', randomNumber);
            $('.tiles').eq(x).append("<img class='tilesOpened' src='img/" + tilesImg[tilesClass] + "'>");
            $('.tiles').eq(x).prepend("<img class='tilesClosed' src='img/logo.png'>");

        }

        $('.board').css('visibility', 'visible');
    });

    //Odkrywanie i sprawdzanie kafelków 

    $(".tiles").click(function () {
        //Blokowanie mozliwości kliknięcia w ten sam kafelek
        if ($(this).hasClass('chosen') == false) {
            
            //Odwrócenie pierwszego kafelka
            if (countOfTiles === 0) {
                $(this).children('.tilesOpened').toggle('display');
                $(this).children('.tilesClosed').toggle('display');
                $(this).addClass('chosen');
                countOfTiles++;
                tile1 = $(this).children('.tilesOpened').attr('src');
                
                //Odwrócenie drugiego kafelka
            } else if (countOfTiles === 1) {
                shot++;
                $(this).children('.tilesOpened').toggle('display');
                $(this).children('.tilesClosed').toggle('display');
                $(this).addClass('chosen');
                countOfTiles++;
                tile2 = $(this).children('.tilesOpened').attr('src');

                //Jeśli nie pasuja
                if (tile1 !== tile2) {
                    setTimeout(function () {
                        $('.chosen').children('.tilesOpened').css('display', 'none');
                        $('.chosen').children('.tilesClosed').css('display', 'block');
                        $('.chosen').removeClass('chosen');
                        countOfTiles = 0;

                    }, 1000);

                    //Jeśli pasują
                } else {
                    tilesFound++;
                    $('.chosen').animate({
                        opacity: 0
                    }, 1100);
                    setTimeout(function () {

                        $('.chosen').addClass('found');
                        $('.chosen').removeClass('chosen');
                        countOfTiles = 0;

                        //Koniec gry
                        if (tilesFound == 15) {
                            clearInterval(time);
                            $('.board').css({
                                display: 'none'
                            });
                            $('.bravo').css('display', 'flex');
                            $('.bravo').prepend("Gratulacje!<br>Udało Ci się odgadnąć wszystkie kafelki po " + shot + " próbach, w czasie "+sec+" sekund. Świetny wynik :-)");
                        };
                    }, 1100);
                };
            };
        };
    });
});
