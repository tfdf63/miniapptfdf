<?php
/**
 * Same-origin proxy: https://tfdf.ru/api/v1/* → https://api.tfdf.ru/api/v1/*
 * Compatible with Beget PHP 7.4.
 */
$path = isset($_GET['__path']) ? (string) $_GET['__path'] : '';
unset($_GET['__path']);

if ($path === '' || strpos($path, '..') !== false || !preg_match('#^[A-Za-z0-9_./\-]*$#', $path)) {
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('error' => 'Bad request'));
    exit;
}

$query = http_build_query($_GET);
$url = 'https://api.tfdf.ru/api/v1/' . $path;
if ($query !== '') {
    $url .= '?' . $query;
}

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
$forwardHeaders = array();

if (function_exists('getallheaders')) {
    foreach (getallheaders() as $name => $value) {
        $lower = strtolower((string) $name);
        if (in_array($lower, array('host', 'connection', 'content-length', 'accept-encoding'), true)) {
            continue;
        }
        $forwardHeaders[] = $name . ': ' . $value;
    }
}

$body = file_get_contents('php://input');
$ch = curl_init($url);
$opts = array(
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER => true,
    CURLOPT_HTTPHEADER => $forwardHeaders,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_ENCODING => '',
    CURLOPT_SSL_VERIFYPEER => true,
);

if ($body !== false && $body !== '' && !in_array($method, array('GET', 'HEAD'), true)) {
    $opts[CURLOPT_POSTFIELDS] = $body;
}

curl_setopt_array($ch, $opts);
$response = curl_exec($ch);

if ($response === false) {
    $detail = curl_error($ch);
    curl_close($ch);
    http_response_code(502);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array('error' => 'Bad gateway', 'detail' => $detail, 'url' => $url));
    exit;
}

$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

$rawHeaders = substr($response, 0, $headerSize);
$respBody = substr($response, $headerSize);

http_response_code($status > 0 ? $status : 502);

$skipHeaders = array(
    'transfer-encoding',
    'connection',
    'keep-alive',
    'content-encoding',
    'content-length',
);

foreach (explode("\r\n", $rawHeaders) as $line) {
    if ($line === '' || stripos($line, 'HTTP/') === 0) {
        continue;
    }
    $pos = strpos($line, ':');
    if ($pos === false) {
        continue;
    }
    $name = substr($line, 0, $pos);
    $value = trim(substr($line, $pos + 1));
    $lower = strtolower($name);
    if (in_array($lower, $skipHeaders, true) || strpos($lower, 'access-control-') === 0) {
        continue;
    }
    header($name . ': ' . $value, false);
}

echo $respBody;
