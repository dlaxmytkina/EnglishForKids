$(document).ready(function () {

    if (document.location.pathname.match(/word/) !== null) {
        if (localStorage.getItem("game") === "true") {
            $("#check").prop("checked", true);
        }
        for(i=0; i<10;i++){
            if($("li a").eq(i).text().toLowerCase()===localStorage.getItem("group")){
                $("li a").eq(i).addClass("a_active");
            }
        }
    } else if (document.location.pathname.match(/index/)) {
        $("#check").prop("checked", false);
        $(".a_active").removeClass("a_active");
        $("li a").eq(0).addClass("a_active");
    }

    $(".results").hide();
    var frontFace = $(".front_face ");
    var backFace = $(".back_face");
    var cardFace = $(".face");
    var cardlocal = localStorage.getItem("group");
    var overlay_navigation = $(".overlay-navigation");
    var top_bar = $(".bar-top");
    var middle_bar = $(".bar-middle");
    var bottom_bar = $(".bar-bottom");

    const request = new XMLHttpRequest();
    request.open("GET", "./word.json");
    request.responseType = "json";
    request.send();
    request.onload = function () {
        var names = request.response;
        var randomarray = [];
        var iSound = 0;
        var mistake = 0;
        var arrrayDifWord = [];

        $(document).click(function (e) {
            cardFace.removeClass("animation-out");
            var content = e.target.dataset.content;
            var newCardLocal = localStorage.getItem("group");
            var elem = e.target;

            if (content === "open-overlay") {
                $(".open-overlay").css("pointer-events", "none");
                overlay_navigation.toggleClass("overlay-active");
                if (overlay_navigation.hasClass("overlay-active")) {
                    top_bar
                        .removeClass("animate-out-top-bar")
                        .addClass("animate-top-bar");
                    middle_bar
                        .removeClass("animate-out-middle-bar")
                        .addClass("animate-middle-bar");
                    bottom_bar
                        .removeClass("animate-out-bottom-bar")
                        .addClass("animate-bottom-bar");
                    overlay_navigation
                        .removeClass("overlay-slide-up")
                        .addClass("overlay-slide-down");
                    overlay_navigation.velocity("transition.slideLeftIn", {
                        duration: 300,
                        delay: 0,
                        begin: function () {
                            $(" ul li").velocity(
                                "transition.perspectiveLeftIn",
                                {
                                    stagger: 150,
                                    delay: 0,
                                    complete: function () {
                                        $(".open-overlay").css(
                                            "pointer-events",
                                            "auto"
                                        );
                                    },
                                }
                            );
                        },
                    });
                } else removeTopBar();
            } else if (elem.classList.contains("buttontryagain")) {
                $(".startgame").removeClass("playmode");
                $(".startgame").css({ width: "+=210" });
                $(".results").hide();
                $(".wrapper").show();
                textbut();
                cardForPlay();
            } else if (elem.classList.contains("Reset") && $(".Repeat_difficult_words").hasClass("onlyRepeat")) {
                $(".row").html("");
                zeroing();
                arrrayDifWord = [];
                document.location.href = "./statistic.html";
            } else if (elem.classList.contains("Reset")) {
                zeroing();
            } else if (elem.classList.contains("Repeat_difficult_words")) {
                elem.classList.add("onlyRepeat");
                repeatDifWord();
            } else if (elem.classList.contains("buttonmainpage")) {
                mainpage();
                $(".startgame").removeClass("playmode");
            } else if (elem.parentNode.classList.contains("play-train") && elem.classList.contains("checkbox")) {
                changeclassfoplay();
                card();
                $(".stars").html("");
            } else if (elem.parentNode.classList.contains("play-train")) {
            } else if ($(".startgame").hasClass("playmode") && !overlay_navigation.hasClass("overlay-active")) {
                if (elem.classList.contains("d-block") && !elem.classList.contains("inactive")) {
                    sravnenie();
                }
                if (elem.classList.contains("repeat")) {
                    new Audio(names[0][newCardLocal][randomarray[iSound]]["sound"]).play();
                }
            } else {
                if (elem.classList.contains("startgame")) {
                    randomsound();
                    startgame();
                } else if ($(".play-train").hasClass("play-active")) {
                    if (content !== undefined && !cardFace.hasClass("animation-out")) {
                        localStorage.setItem("group", content);
                        cardlocal = localStorage.getItem("group");
                        cardFace.addClass("animation-out");
                        if ($(".startgame").hasClass("playmode")) {
                            $(".startgame").removeClass("playmode");
                            $(".startgame").css({ width: "+=210" });
                            $(".stars").html("");
                            mistake = 0;
                            iSound = 0;
                        }
                        setTimeout(cardForPlay, 1000);
                        setTimeout(textbut, 1000);
                        setTimeout(a_active, 1000);
                    }
                } else if (content === "refresh") {
                    var block = elem.parentNode.parentNode;
                    block.classList.add("faceactive");
                    changedatafortable(0);
                    block.addEventListener("mouseleave", function () {
                        block.classList.remove("faceactive");
                        e.stopPropagation();
                    });
                } else if (elem.parentNode.parentNode.classList.contains("face") || elem.parentNode.classList.contains("face")) {
                    if (elem.parentNode.parentNode.classList.contains("face")) {
                        var iElem = elem.parentNode.parentNode.dataset.i;
                    } else {
                        var iElem = elem.parentNode.dataset.i;
                    }
                    if (document.location.pathname.match(/statistic/) === null) {
                        new Audio(names[0][newCardLocal][iElem]["sound"]).play();
                        changedatafortable(0);
                    } else soundforrepeatDif(iElem);
                } else if (content !== undefined && !cardFace.hasClass("animation-out")) {
                    localStorage.setItem("group", content);
                    cardlocal = localStorage.getItem("group");
                    cardFace.addClass("animation-out");
                    setTimeout(newcard, 1000);
                    setTimeout(a_active, 1000);
                }
                if (overlay_navigation.hasClass("overlay-active")) {
                    $(".open-overlay").css("pointer-events", "none");
                    overlay_navigation.toggleClass("overlay-active");
                    removeTopBar();
                }
            }

            function a_active() {
                $(".a_active").removeClass("a_active");
                elem.classList.add("a_active");
            }

            function randomsound() {
                var nums = [0, 1, 2, 3, 4, 5, 6, 7];
                (randomarray = []), (i = nums.length), (j = 0);
                while (i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    randomarray.push(nums[j]);
                    nums.splice(j, 1);
                }
            }

            function textbut() {
                $(".startgame").html("Start Game");
            }

            function mainpage() {
                document.location.href = "./index.html";
            }

            function sravnenie() {
                var elemsravn = names[0][newCardLocal][randomarray[iSound]]["word"];
                if (names[0][newCardLocal][randomarray[iSound]]["img"] === elem.getAttribute("src")) {
                    elem.style.opacity = "0.3";
                    elem.style.cursor = "auto";
                    elem.classList.add("inactive");
                    max8star();
                    $(".stars").append('<img width="40" height="40" src="./assets/yellow.png">');
                    new Audio("./assets/good.mp3").play();
                    changedatafortable(1, elemsravn);
                    setTimeout(nextsound, 1000);
                    function nextsound() {
                        if (iSound < 7) {
                            iSound++;
                            new Audio( names[0][newCardLocal][randomarray[iSound]]["sound"]).play();
                        } else {
                            iSound = 0;
                            if (mistake === 0) {
                                new Audio("./assets/wingame.mp3").play();
                                $(".stars").html("");
                                $(".results img").attr("src", "./assets/wingame.png");
                                $(".wrapper").hide();
                                $(".results").show();
                                $(".buttontryagain").hide();
                                $(".buttonmainpage").hide();
                                var resultsspan = $(".results div");
                                resultsspan[1].innerHTML = "You win!";
                                setTimeout(mainpage, 3500);
                            } else {
                                new Audio("./assets/failure.mp3").play();
                                $(".stars").html("");
                                $(".wrapper").hide();
                                $(".results img").attr("src", "./assets/mistake.png");
                                var resultsspan = $(".results div");
                                resultsspan[0].innerHTML = "Oh, no:(";
                                resultsspan[1].innerHTML = `You have ${mistake} mistakes.`;
                                $(".results").show();
                                mistake = 0;
                            }
                        }
                    }
                } else {
                    new Audio("./assets/no.mp3").play();
                    max8star();
                    $(".stars").append('<img width="40" height="40" src="./assets/red.png">');
                    changedatafortable(2, elemsravn);
                    mistake++;
                }
            }

            function startgame() {
                $(".startgame").html(
                    "<img src='./assets/resrart.svg' width='40px' class='repeat'>"
                );
                $(".startgame").css({ width: "-=210" });
                $(".startgame").addClass("playmode");
                new Audio(
                    names[0][newCardLocal][randomarray[0]]["sound"]
                ).play();
            }

            function changedatafortable(data, elemsravn) {
                if (document.location.pathname.match(/statistic/) === null) {
                    if (elem.parentNode.parentNode.classList.contains("face")) {
                        var iElem = elem.parentNode.parentNode.dataset.i;
                    } else {
                        var iElem = elem.parentNode.dataset.i;
                    }
                    if ($(".startgame").hasClass("playmode")) {
                        var wordfortable = elemsravn;
                    } else {
                        var wordfortable = names[0][newCardLocal][iElem]["word"];
                    }
                    console.log(wordfortable);
                    let fortable = JSON.parse(localStorage.getItem(wordfortable));
                    fortable[data]++;
                    localStorage.setItem(wordfortable, JSON.stringify(fortable));
                }
            }

            function soundforrepeatDif(iElem) {
                if (elem.parentNode.parentNode.classList.contains("face")) {
                    var iGroup = elem.parentNode.parentNode.dataset.group;
                } else {
                    var iGroup = elem.parentNode.dataset.group;
                }
                new Audio(names[0][iGroup][iElem]["sound"]).play();
                changedatafortable(0);
            }
        });

        function removeTopBar() {
            $(".open-overlay").css("pointer-events", "none");
            top_bar
                .removeClass("animate-top-bar")
                .addClass("animate-out-top-bar");
            middle_bar
                .removeClass("animate-middle-bar")
                .addClass("animate-out-middle-bar");
            bottom_bar
                .removeClass("animate-bottom-bar")
                .addClass("animate-out-bottom-bar");
            overlay_navigation
                .removeClass("overlay-slide-down")
                .addClass("overlay-slide-up");
            $("ul li").velocity("transition.perspectiveLeftOut", {
                stagger: 150,
                delay: 0,
                complete: function () {
                    overlay_navigation.velocity("transition.fadeOut", {
                        delay: 0,
                        duration: 300,
                        complete: function () {
                            $(".open-overlay").css("pointer-events", "auto");
                        },
                    });
                },
            });
        }

        let array = [0, 0, 0];
        wordfortable();

        function newcard() {
            for (var i = 0; i < 8; i++) {
                frontFace[i].innerHTML = `<img src="${names[0][cardlocal][i]["img"]}" class="d-block w-100"  alt="..." > 
                    <h4>${names[0][cardlocal][i]["word"]}</h4>
                    <img width="40px" class = "refresh" data-content="refresh" src = "./assets/arrow_refresh_15732.png"  >`;
                backFace[i].innerHTML = `<img src="${names[0][cardlocal][i]["img"]}" class="d-block w-100"  alt="..." > 
                    <h4>${names[0][cardlocal][i]["ru"]}</h4>`;
                frontFace[i].parentNode.setAttribute("data-i", i);
            }
        }
        tableTr = $("tbody tr");
        var k = 0;
        if (document.location.pathname.match(/word/) !== null) {
            card();
        }
        changeclassfoplay();
        if (document.location.pathname.match(/statistic/) !== null) {
            $(function () {
                $(".tablesorter").tablesorter();
            });
            table();
            $(".a_active").removeClass("a_active");
            $("li a").eq(9).addClass("a_active");
        }

        function table() {
            for (i = 3; i < 14; i += 2) {
                var l = Math.floor(i / 2);
                for (j = 0, k = 0; j < 64; j++, k++) {
                    let category = tableTr[j].childNodes[1].textContent.toLowerCase();
                    switch (l) {
                        case 1:
                            tableTr[j].childNodes[i].innerHTML =names[0][category][k]["word"];
                            break;
                        case 2:
                            tableTr[j].childNodes[i].innerHTML = names[0][category][k]["ru"];
                            break;
                        case 3:
                            tableTr[j].childNodes[i].innerHTML = JSON.parse(localStorage.getItem(names[0][category][k]["word"]))[0];
                            break;
                        case 4:
                            tableTr[j].childNodes[i].innerHTML = JSON.parse(localStorage.getItem(names[0][category][k]["word"]))[1];
                            break;
                        case 5:
                            tableTr[j].childNodes[i].innerHTML = JSON.parse(localStorage.getItem(names[0][category][k]["word"]))[2];
                            break;
                        case 6:
                            if ( tableTr[j].childNodes[i - 2].textContent !== "0") {
                                tableTr[j].childNodes[i].innerHTML = Math.round(
                                    (parseInt(tableTr[j].childNodes[i - 2].textContent) /
                                        (parseInt(tableTr[j].childNodes[i - 4].textContent) + parseInt(tableTr[j].childNodes[i - 2].textContent))
                                            ) * 100
                                );
                            } else {
                                tableTr[j].childNodes[i].innerHTML = "0";
                            }
                            if (tableTr[j].childNodes[i - 2].textContent !== "0") {
                                arrrayDifWord.push(category);
                                arrrayDifWord.push(j % 8);
                                arrrayDifWord.push(Number(tableTr[j].childNodes[i].textContent));
                            }
                            break;
                    }
                    if (k === 7) {
                        k = -1;
                    }
                }
            }
        }

        function max8star() {
            if ($(".stars img").length === 7) {
                $(".stars img").eq(0).remove();
            }
        }

        function card() {
            if (localStorage.getItem("game") === "true") {
                changeclassfoplay();
                cardForPlay();
            } else {
                newcard();
            }
        }

        function cardForPlay() {
            for (var i = 0; i < 8; i++) {
                frontFace[i].innerHTML = `<img src="${names[0][cardlocal][i]["img"]}" 
                class="d-block" width = "350px" height = "225px"alt="..." >`;
                frontFace[i].parentNode.setAttribute("data-i", i);
            }
        }

        function changeclassfoplay() {
            if ($("#check").is(":checked")) {
                localStorage.setItem("game", "true");
                $(".check").addClass("play-active");
                $("ul li").addClass("play-li");
                $("ul li a").addClass("play-a");
                $(".fon").removeClass("fontrain");
                $(".fon").addClass("fonplay");
                $("span").addClass("darkspan");
                $(".buttonsection").css("display", "block");
                $(".startgame").html("Start Game");
            } else {
                localStorage.setItem("game", "false");
                $(".check").removeClass("play-active");
                $("ul li").removeClass("play-li");
                $("ul li a").removeClass("play-a");
                $(".fon").removeClass("fonplay");
                $(".fon").addClass("fontrain");
                $("span").removeClass("darkspan");
                $(".buttonsection").css("display", "none");
                if ($(".startgame").hasClass("playmode")) {
                    $(".startgame").removeClass("playmode");
                    $(".startgame").css({ width: "+=210" });
                }
            }
        }

        function repeatDifWord() {
            var array8DifWord = [];
            if (arrrayDifWord.length > 24) {
                while (array8DifWord.length < 24) {
                    var maxElem = 0;
                    var iArr = 0;
                    for (i = 2; i < arrrayDifWord.length; i += 3) {
                        if (arrrayDifWord[i] > maxElem) {
                            maxElem = arrrayDifWord[i];
                            iArr = i;
                        }
                    }
                    array8DifWord.push(
                        arrrayDifWord[iArr - 2],
                        arrrayDifWord[iArr - 1],
                        arrrayDifWord[iArr]
                    );
                    arrrayDifWord.splice(iArr - 2, 3);
                }
                arrrayDifWord = array8DifWord;
                console.log(arrrayDifWord);
            }
            let htmlContent = "";
            $("table").hide();
            for (i = 0; i < arrrayDifWord.length / 3; i++) {
                $(".row").html(`${htmlContent}<div class="pages-card"></div>`);
                htmlContent = $(".row").html();
            }
            for (i = 0; i < arrrayDifWord.length / 3; i++) {
                $(".pages-card").eq(i).html(`
                <div class="face">
                <div class="front_face faceview">
                <img src="${names[0][arrrayDifWord[3 * i]][arrrayDifWord[3 * i + 1]]["img"]}" class="d-block w-100"  alt="..." > 
                <h4>${names[0][arrrayDifWord[3 * i]][arrrayDifWord[3 * i + 1]]["word"]}</h4>
                <img width="40px" class = "refresh" data-content="refresh" src = "./assets/arrow_refresh_15732.png"  >
                </div>
                <div class="back_face faceview">
                <img src="${names[0][arrrayDifWord[3 * i]][arrrayDifWord[3 * i + 1]]["img"]}" class="d-block w-100"  alt="..." > 
                <h4>${names[0][arrrayDifWord[3 * i]][arrrayDifWord[3 * i + 1]]["ru"]}</h4>
                </div>
                </div>`);
                $(".front_face").eq(i).parent().attr("data-i", arrrayDifWord[3 * i + 1]);
                $(".front_face").eq(i).parent().attr("data-group", arrrayDifWord[3 * i]);
            }
        }

        function zeroing() {
            for (i = 0; i < 8; i++) {
                let actionA = names[0]["action (set a)"][i]["word"];
                localStorage.setItem(actionA, JSON.stringify(array));
                let actionB = names[0]["action (set b)"][i]["word"];
                localStorage.setItem(actionB, JSON.stringify(array));
                let actionC = names[0]["action (set c)"][i]["word"];
                localStorage.setItem(actionC, JSON.stringify(array));
                let school = names[0]["school"][i]["word"];
                localStorage.setItem(school, JSON.stringify(array));
                let animal = names[0]["animal"][i]["word"];
                localStorage.setItem(animal, JSON.stringify(array));
                let food = names[0]["food"][i]["word"];
                localStorage.setItem(food, JSON.stringify(array));
                let number = names[0]["number"][i]["word"];
                localStorage.setItem(number, JSON.stringify(array));
                let size = names[0]["size"][i]["word"];
                localStorage.setItem(size, JSON.stringify(array));
            }
            table();
        }

        function wordfortable() {
            for (i = 0; i < 8; i++) {
                console.log("he");
                let actionA = names[0]["action (set a)"][i]["word"];
                if (localStorage.getItem(actionA) === null) {
                    localStorage.setItem(actionA, JSON.stringify(array));
                }
                let actionB = names[0]["action (set b)"][i]["word"];
                if (localStorage.getItem(actionB) === null) {
                    localStorage.setItem(actionB, JSON.stringify(array));
                }
                let actionC = names[0]["action (set c)"][i]["word"];
                if (localStorage.getItem(actionC) === null) {
                    localStorage.setItem(actionC, JSON.stringify(array));
                }
                let school = names[0]["school"][i]["word"];
                if (localStorage.getItem(school) === null) {
                    localStorage.setItem(school, JSON.stringify(array));
                }
                let animal = names[0]["animal"][i]["word"];
                if (localStorage.getItem(animal) === null) {
                    localStorage.setItem(animal, JSON.stringify(array));
                }
                let food = names[0]["food"][i]["word"];
                if (localStorage.getItem(food) === null) {
                    localStorage.setItem(food, JSON.stringify(array));
                }
                let number = names[0]["number"][i]["word"];
                if (localStorage.getItem(number) === null) {
                    localStorage.setItem(number, JSON.stringify(array));
                }
                let size = names[0]["size"][i]["word"];
                if (localStorage.getItem(size) === null) {
                    localStorage.setItem(size, JSON.stringify(array));
                }
            }
        }
    };
});
