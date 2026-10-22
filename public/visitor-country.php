<?php
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

$country = "";
if (!empty($_SERVER["HTTP_CF_IPCOUNTRY"])) {
  $country = $_SERVER["HTTP_CF_IPCOUNTRY"];
} elseif (!empty($_SERVER["HTTP_CLOUDFRONT_VIEWER_COUNTRY"])) {
  $country = $_SERVER["HTTP_CLOUDFRONT_VIEWER_COUNTRY"];
}

$country = strtoupper(trim($country));
if (!preg_match("/^[A-Z]{2}$/", $country) || $country === "XX" || $country === "T1") {
  $country = "";
}

echo json_encode(array("country" => $country));
