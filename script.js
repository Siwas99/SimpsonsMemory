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
        countOfTiles = 0, //liczba odkrytych kafelków
        tile1 = "", //nazwa 1 kafelka
        tile2 = "", //nazwa 2 kafelka
        shot = 1, //ilosc prób
        tileNumber = 0, //Numer kafelka
        tilesFound = 0, //Znalezione pary
        sec = 0, //sekundy
        time = setInterval(function(){stoper()}, 1000);

    //Odmierzanie czasu
    function stoper(){
        sec++;
    };
    
    //Generowanie kafelków w losowej kolejności + restart gry

    $(".startButton").click(function () {
        time; //Uruchomienie stopera
        $('.tiles').empty();
        shot = 1;
        for (var x = 0; x < 30; x++) {
            tileNumber++;
            if (tileNumber == 15) {
                tileNumber = 0;
            }
            var randomNumber = Math.floor(Math.random() * 100);

            $('.tiles').eq(x).css('order', randomNumber);
            $('.tiles').eq(x).append("<img class='tilesOpened' src='img/" + tilesImg[tileNumber] + "'>");
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
                            clearInterval(time); //Zatrzymanie czasu
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
