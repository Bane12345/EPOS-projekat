
const getData = () => {
    let jsonNizPodataka = new Array();
    automobili.forEach(automobil => {
        let naziv_podatak = automobil.querySelector('.podaci-naziv');
        let motor_podatak = automobil.querySelector('.motor');
        let vrata_podatak = automobil.querySelector('.vrata');
        let karoserija_podatak = automobil.querySelector('.karoserija');
        let menjac_podatak = automobil.querySelector('.menjac');
        let cena_podatak = automobil.querySelector('.cena');
        let snaga_podatak = automobil.querySelector('.snaga');
        let gorivo_podatak = automobil.querySelector('.gorivo');
        let pogon_podatak = automobil.querySelector('.pogon');
        let kilometraza_podatak = automobil.querySelector('.kilometraza');
        let godiste_podatak = automobil.querySelector('.godiste');

        let auto = {};

        if (naziv_podatak != null) {
            naziv_podatak = naziv_podatak.innerText.trim();
            auto['Naziv'] = naziv_podatak;
        }
        if (motor_podatak != null) {
            motor_podatak = motor_podatak.innerText.split('Motor:')[1].trim();
            auto['Motor'] = motor_podatak;
        }
        if (vrata_podatak != null) {
            vrata_podatak = parseInt(vrata_podatak.innerText.split('Vrata:')[1].trim());
            auto['Vrata'] = vrata_podatak;
        }
        if (karoserija_podatak != null) {
            karoserija_podatak = karoserija_podatak.innerText.split('Karoserija:')[1].trim();
            auto['Karoserija:'] = karoserija_podatak;
        }
        if (menjac_podatak != null) {
            menjac_podatak = menjac_podatak.innerText.split('Menjač:')[1].trim();
            auto['Menjač'] = menjac_podatak;
        }
        if (cena_podatak != null) {
            cena_podatak = parseInt(cena_podatak.innerText.split('Cena:')[1].split('€')[0].trim().replace(' ', ''));
            auto['Cena'] = cena_podatak;
        }
        if (snaga_podatak != null) {
            snaga_podatak = snaga_podatak.innerText.split('Snaga:')[1].trim();
            auto['Snaga'] = snaga_podatak;
        }
        if (gorivo_podatak != null) {
            gorivo_podatak = gorivo_podatak.innerText.split("Gorivo:")[1].trim();
            auto['Gorivo'] = gorivo_podatak;
        }
        if (pogon_podatak != null) {
            pogon_podatak = pogon_podatak.innerText.split('Pogon:')[1].trim();
            auto['Pogon'] = pogon_podatak;
        }
        if (godiste_podatak != null) {
            godiste_podatak = parseInt(godiste_podatak.innerText.split('Godiste:')[1]);
            auto['Godište'] = godiste_podatak;
        }
        if (kilometraza_podatak != null) {
            kilometraza_podatak = parseInt(kilometraza_podatak.innerText.split("Kilometraža:")[1].split('km')[0].trim().replace(' ', ''));
            auto['Kilometraža'] = kilometraza_podatak
            auto['Polovan']=true//dodaj atribut da je polova ako ima kilometrazu
        }else {
            auto['Polovan']=false;
        }

        jsonNizPodataka.push(auto);
    })

    var zahtev = new XMLHttpRequest();
    zahtev.open('POST', 'db_connection.php', true);
    zahtev.setRequestHeader( "Content-Type", "application/json" );
    zahtev.onload = function () {
        if (zahtev.status == 200) {
            console.log(zahtev.responseText);
        }
    }
    zahtev.send(JSON.stringify(jsonNizPodataka));
}


getData();