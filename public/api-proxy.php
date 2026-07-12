<?php
/**
 * Same-origin proxy: https://tfdf.ru/api/v1/* → https://api.tfdf.ru/api/v1/*
 * Beget static hosting often cannot use Apache ProxyPass; PHP+cURL works reliably.
 */
declare(strict_types=1);

$path = (string) ($_GET['__path'] ?? '');
unset($_GET['__path']);

if ($path === '' || str_contains($path, '..') || !preg_match('#^[A-Za-z0-9_./\-]*$#', $path)) {
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Bad request']);
    exit;
}

$query = http_build_query($_GET);
$url = 'https://api.tfdf.ru/api/v1/' . $path;
if ($query !== '') {
    $url .= '?' . $query;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$forwardHeaders = [];

if (function_exists('getallheaders')) {
    foreach (getallheaders() as $name => $value) {
        $lower = strtolower((string) $name);
        if (in_array($lower, ['host', 'connection', 'content-length', 'accept-encoding'], true)) {
            continue;
        }
        $forwardHeaders[] = $name . ': ' . $value;
    }
}

$body = file_get_contents('php://input');
$ch = curl_init($url);
$opts = [
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER => true,
    CURLOPT_HTTPHEADER => $forwardHeaders,
    CURLOPT_TIMEOUT => 60,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_ENCODING => '',
];

if ($body !== false && $body !== '' && !in_array($method, ['GET', 'HEAD'], true)) {
    $opts[CURLOPT_POSTFIELDS] = $body;
}

curl_setopt_array($ch, $opts);
$response = curl_exec($ch);

if ($response === false) {
    http_response_code(502);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Bad gateway', 'detail' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

$rawHeaders = substr($response, 0, $headerSize);
$respBody = substr($response, $headerSize);

http_response_code($status > 0 ? $status : 502);

$skipHeaders = [
    'transfer-encoding',
    'connection',
    'keep-alive',
    'content-encoding',
    'content-length',
];

foreach (explode("\r\n", $rawHeaders) as $line) {
    if ($line === '' || str_starts_with(strtolower($line), 'http/')) {
        continue;
    }
    $pos = strpos($line, ':');
    if ($pos === false) {
        continue;
    }
    $name = substr($line, 0, $pos);
    $value = trim(substr($line, $pos + 1));
    $lower = strtolower($name);
    if (in_array($lower, $skipHeaders, true) || str_starts_with($lower, 'access-control-')) {
        continue;
    }
    header($name . ': ' . $value, false);
}

echo $respBody;
