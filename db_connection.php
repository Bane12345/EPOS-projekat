<?php require "vendor/autoload.php";



    $konekcija = new MongoDB\Client("mongodb://localhost:27017");
    $baza = $konekcija->eposProjekatDB;
    $kolekcija = $baza->kolekcija;

    // $all = $kolekcija->find();
    // echo json_encode(iterator_to_array($all));


    if(isset($_POST)){
        $data = file_get_contents("php://input");
        $data = json_decode( $data );
        
        echo json_encode(iterator_to_array(vratiRezultatUpita($data,$kolekcija)));
    }

    function vratiRezultatUpita($data,$kolekcija){
        $upit = ['Polovan'=>$data->polovan];
        if($data->marka!==NULL){
            $upit['Marka']=strtoupper($data->marka);
        }

        if($data->karoserija!==NULL){
            $upit['Karoserija']=$data->karoserija;
        }

        if($data->gorivo!==NULL){
            $upit['Gorivo']=$data->gorivo;
        }

        if($data->cenaOd!==NULL){
            $upit['Cena']['$gte']=$data->cenaOd;
        }

        if($data->cenaDo!==NULL){
            $upit['Cena']['$lte']=$data->cenaDo;
        }

        if($data->kilometrazaOd!==NULL){
            $upit['Kilometraža']['$gte']=$data->kilometrazaOd;
        }

        if($data->kilometrazaDo!==NULL){
            $upit['Kilometraža']['$lte']=$data->kilometrazaDo;
        }

        if($data->godisteOd!==NULL){
            $upit['Godište']['$gte']=$data->godisteOd;
        }

        if($data->godisteDo!==NULL){
            $upit['Godište']['$lte']=$data->godisteDo;
        }

        if($data->search!==NULL){
            $upit['$or']=[
                array('Marka'=>new MongoDB\BSON\Regex($data->search, 'i')),
                array('Naziv'=>new MongoDB\BSON\Regex($data->search, 'i')),
                array('Karoserija'=>new MongoDB\BSON\Regex($data->search, 'i')),
                array('Menjač'=>new MongoDB\BSON\Regex($data->search, 'i')),
                array('Gorivo'=>new MongoDB\BSON\Regex($data->search, 'i')),
                array('Motor'=>new MongoDB\BSON\Regex($data->search, 'i')),
            ];
        }

        // print_r($upit);
        return $kolekcija->find(
            $upit
        );
    }
?>