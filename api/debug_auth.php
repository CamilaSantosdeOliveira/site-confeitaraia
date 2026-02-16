<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$debug = [];

// Capturar headers
if (function_exists('getallheaders')) {
    $debug['all_headers'] = getallheaders();
}

$debug['server_auth'] = $_SERVER['HTTP_AUTHORIZATION'] ?? 'not set';
$debug['server_redirect_auth'] = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 'not set';

// Tentar extrair token
$authHeader = '';
if (function_exists('getallheaders')) {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
}

if (empty($authHeader) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
}

$debug['auth_header'] = $authHeader;

if (!empty($authHeader)) {
    $token = str_replace('Bearer ', '', $authHeader);
    $debug['token'] = substr($token, 0, 50) . '...';

    $parts = explode('.', $token);
    $debug['token_parts_count'] = count($parts);

    if (count($parts) === 3) {
        $base64Payload = str_replace(['-', '_'], ['+', '/'], $parts[1]);
        $padding = strlen($base64Payload) % 4;
        if ($padding > 0) {
            $base64Payload .= str_repeat('=', 4 - $padding);
        }

        $payload = json_decode(base64_decode($base64Payload), true);
        $debug['decoded_payload'] = $payload;
        $debug['user_id'] = $payload['user_id'] ?? 'not found';
    }
}

echo json_encode($debug, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
