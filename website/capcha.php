<?php
include_once("sql.php");
include_once("mons.php");
header("Access-Control-Allow-Origin: *");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$HERO = getHero();
if (isset($_GET["id"]) and ctype_digit($_GET["id"])) {
    $res = $sql->query("SELECT `data` FROM `capcha` WHERE `id` = " . $_GET["id"] . " LIMIT 1");
    if ($row=$res->fetch_assoc()) {
        $scale = 2;
        $data = json_decode($row["data"],true);
        $img = imagecreatetruecolor(450/$scale,500/$scale);
        imagealphablending($img, true);

        $transparent = imagecolorallocatealpha( $img, 0, 0, 0, 127 );
        imagefill( $img, 0, 0, $transparent );
        // Set the background to be white
        #imagefilledrectangle($img, 0, 0, 449, 499, $white);
        // Allocate A Color For The Text
        $tcolor = imagecolorallocate($img, 0, 0, 0);

        // Set Path to Font File
        $font_path = './Roboto-Black.ttf';

        // Set Text to Be Printed On Image
        $text = $data["question"]?"Select all FIRE Heroes:":"Select all WATER Heroes:";
        $box = imagettfbbox ( 25/$scale , 0 , $font_path, $text );
        $bw = $box[2]-$box[0];
        // Print Text On Image
        imagettftext($img, 25/$scale, 0, 40/$scale, 225/$scale-$bw/2, $tcolor, $font_path, $text);
        // save the alpha
       
        $x = 0;
        $y = 50/$scale;
        for ($i=0; $i<count($data["all"]); ++$i) {
            $src = imagecreatefrompng("img/".$HERO[$data["all"][$i]]["img"].".png");
            imagealphablending($src, false);
            imagesavealpha($src, true);
            $rotang = (rand()/getrandmax()-0.5)*25;
            $rotation = imagerotate($src, $rotang, imageColorAllocateAlpha($src, 0, 0, 0, 127));
            imagealphablending($rotation, false);
            imagesavealpha($rotation, true);
            imagecopyresampled($img, $rotation, $x, $y, 0,0, 150/$scale, 150/$scale,imagesx($rotation),imagesy($rotation));
            $x+=150/$scale;
            if ($x==450/$scale) {
                $x=0;
                $y+=150/$scale;
            }
        }
        imagealphablending($img, false);
        $line_color = imagecolorallocate($img, 64,64,64); 
        for($i=0;$i<10;$i++) {
            imageline($img,0,(50+rand()%450)/$scale,500/$scale,(50+rand()%450)/$scale,$line_color);
        }
        imagesavealpha($img,true);
        header('Content-Type: image/png');
        imagepng($img);
        imagedestroy($img);
    }
} 

?>