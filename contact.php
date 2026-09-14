<?php
// Global GES enquiry handler for Hostinger shared hosting (PHP mail()).
// Receives the contact form, sends it to info@globalges.net, and redirects to contact-thanks.html.
declare(strict_types=1);

$to      = 'info@globalges.net';
// Sender is the company's own existing address, so no extra mailbox is needed.
// The visitor's address goes in Reply-To, so replying in the inbox goes straight to them.
$from    = 'info@globalges.net';
$subject = 'Website enquiry';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: contact.html'); exit; }
// Honeypot: real visitors never fill this field.
if (!empty($_POST['company_website'])) { header('Location: contact-thanks.html'); exit; }

$clean = static function (string $key, int $max = 500): string {
    $v = trim((string)($_POST[$key] ?? ''));
    $v = str_replace(["\r", "\n"], ' ', $v);
    return mb_substr(strip_tags($v), 0, $max);
};
$name    = $clean('name', 120);
$company = $clean('company', 160);
$email   = filter_var($clean('email', 200), FILTER_VALIDATE_EMAIL) ?: '';
$phone   = $clean('phone', 60);
$country = $clean('country', 80);
$area    = $clean('area_of_interest', 120);
$message = mb_substr(strip_tags(trim((string)($_POST['body'] ?? ''))), 0, 4000);

if ($name === '' || $email === '') { header('Location: contact.html?error=required#form'); exit; }

$body = "New enquiry from the Global GES website\n\n"
      . "Name:             $name\n"
      . "Company:          $company\n"
      . "Business email:   $email\n"
      . "Phone:            $phone\n"
      . "Country:          $country\n"
      . "Area of interest: $area\n\n"
      . "Message:\n$message\n\n"
      . "Sent " . gmdate('Y-m-d H:i') . " UTC from " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers = "From: Global GES website <$from>\r\n"
         . "Reply-To: $name <$email>\r\n"
         . "MIME-Version: 1.0\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($to, '=?UTF-8?B?' . base64_encode("$subject · $area · $company") . '?=', $body, $headers);
header('Location: ' . ($ok ? 'contact-thanks.html' : 'contact.html?error=send#form'));
exit;
