$(function () {
    $('#filter-natpis').click(function () {
        $('#filter-opcije').toggle(500);
        $(this).find('img').toggleClass('flip-hor');
    })

    $('.jos-podataka').click(function () {
        $(this.parentNode).find('.sakriveni-podaci').fadeToggle();
        $(this).find('img').toggleClass('flip-hor');
    })

})

//Automobili
const automobiliContainer = document.querySelector('#automobili-container');

const automobili = document.querySelectorAll('.automobil-kartica');
const prikazaniAutomobili = [].slice.call(automobili);
const nemaRezultataDiv = document.querySelector("#nemaRezultataDiv");

//Elementi filtera
const selectMarka = document.querySelector('#select-marka');
const selectKaroserija = document.querySelector('#select-karoserija');
const selectGorivo = document.querySelector('#select-gorivo');
const cenaInputOd = document.querySelector('#cenaInputOd');
const cenaInputDo = document.querySelector('#cenaInputDo');
const kilometrazaInputOd = document.querySelector('#kilometrazaInputOd');
const kilometrazaInputDo = document.querySelector('#kilometrazaInputDo');
const godisteOdSelect = document.querySelector('#select-godiste.od');
const godisteDoSelect = document.querySelector('#select-godiste.do');
const search = document.querySelector('#search-input');

var filterObject = {
    marka: null,
    karoserija: null,
    gorivo: null,
    godisteOd: null,
    godisteDo: null,
    cenaOd: null,
    cenaDo: null,
    kilometrazaOd: null,
    kilometrazaDo: null,
    polovan: null,
    search: null
}

//Metoda koja puni filter objekat sa izabranim opcijama
function getFilterObject() {
    marka = getSelectedValue(selectMarka);
    if (marka !== 'Sve') {
        filterObject.marka = marka;
    } else {
        filterObject.marka = null;
    }

    karoserija = getSelectedValue(selectKaroserija);
    if (karoserija !== 'Sve') {
        filterObject.karoserija = karoserija;
    } else {
        filterObject.karoserija = null;
    }

    gorivo = getSelectedValue(selectGorivo);
    if (gorivo !== 'Sve') {
        filterObject.gorivo = gorivo;
    } else {
        filterObject.gorivo = null;
    }

    cenaOd = cenaInputOd.value;
    cenaDo = cenaInputDo.value;
    if (cenaOd !== '') filterObject.cenaOd = parseInt(cenaOd)
    else filterObject.cenaOd = null;
    if (cenaDo !== '') filterObject.cenaDo = parseInt(cenaDo)
    else filterObject.cenaDo = null;

    if (kilometrazaInputDo !== null) {
        kilometrazaOd = kilometrazaInputOd.value;
        kilometrazaDo = kilometrazaInputDo.value;
        if (kilometrazaOd !== '') filterObject.kilometrazaOd = parseInt(kilometrazaOd);
        else filterObject.kilometrazaOd = null;
        if (kilometrazaDo !== '') filterObject.kilometrazaDo = parseInt(kilometrazaDo);
        else filterObject.kilometrazaDo = null;

        filterObject.polovan = true;
    } else {
        filterObject.polovan = false;
    }

    if (godisteDoSelect !== null) {
        filterObject.godisteOd = parseInt(getSelectedValue(godisteOdSelect));
        filterObject.godisteDo = parseInt(getSelectedValue(godisteDoSelect));
    }

    if (search != null) {
        if (search.value == '') filterObject.search = null;
        else filterObject.search = search.value;
    }
}

function filter() {
    getFilterObject();
    
    zahtev = new XMLHttpRequest();
    zahtev.open('POST', 'db_connection.php', true)
    zahtev.setRequestHeader("Content-Type", "application/json");
    zahtev.onload = function () {
        if (zahtev.status == 200) {
            // console.log(zahtev.responseText);
            automobiliContainer.innerHTML='';
            ubaciAutomobiliUDOM(JSON.parse(zahtev.responseText));
            console.log(JSON.parse(zahtev.responseText));
        }
    }
    // console.log(filterObject)
    zahtev.send(JSON.stringify(filterObject));
}

function ubaciAutomobiliUDOM(automobili) {
    automobili.forEach(auto => {
        element = document.createElement("div");
        element.classList.add('automobil-kartica');
        element.innerHTML =
            '<div class="automobil-img-div">' +
            '<img src="slike/automobili/'+auto.Naziv+'.png" alt="">' +
            '</div>' +

            '<div class="automobil-podaci">' +
            '<div class="podaci-naziv">'+auto.Naziv+'</div>' +
            '<div class="ostali-podaci">' +
            '<div class="prikazani-podaci">' +
            '<div class="podaci motor">Motor: '+auto.Motor+'</div>' +
            '<div class="podaci vrata">Vrata: '+auto.Vrata+'</div>' +
            '<div class="podaci karoserija">Karoserija: '+auto.Karoserija+'</div>' +
            '<div class="podaci menjac">Menjač: '+auto.Menjač+'</div>' +
            '<div class="podaci cena">Cena: '+auto.Cena+'€</div>' +
            '</div>' +
            '<div class="sakriveni-podaci">' +
            '<div class="podaci snaga">Snaga: '+auto.Snaga+'</div>' +
            '<div class="podaci gorivo">Gorivo: '+auto.Gorivo+'</div>' +
            '<div class="podaci pogon">Pogon: '+auto.Pogon+'</div>' +
            (auto.Kilometraža==undefined ? '' : '<div class="podaci kilometraza">Kilometraža: '+auto.Kilometraža+'</div>')+
            (auto.Godište==undefined ? '' : '<div class="podaci godiste">Godište: '+auto.Godište+'</div>') +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="jos-podataka" onclick="prikaziSkrivenePodatke(this)">' +
            'jos info<img class="jos-podataka-ikonica" src="slike/ikonice/jos_podataka_ikonica.png" alt="">' +
            '</div>';

        // josPodatak = document.createElement('div');
        // josPodatak.innerHTML = 'jos info<img class="jos-podataka-ikonica" src="slike/ikonice/jos_podataka_ikonica.png" alt="">';
        // josPodatak.classList.add('jos-podataka');
        // element.append(josPodatak);

        automobiliContainer.append(element);
    });
}


//vraca vrednost iz select elementa
function getSelectedValue(select) {
    return select == null ? null : select.querySelector(':checked').innerText.trim();
}


function prikaziSkrivenePodatke(target) {
    $(target.parentNode).find('.sakriveni-podaci').fadeToggle();
    $(this).find('img').toggleClass('flip-hor');
}

filter();//Prvi poziv metode filter koja ce da vrati sve automobile

