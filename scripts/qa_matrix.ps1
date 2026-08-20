$base = "http://localhost:8788"
$t = [DateTimeOffset]::Now.ToUnixTimeSeconds()
$cj = ".\.wrangler\cj"
$A = "$cj.A.$t"; $B = "$cj.B.$t"
$bf = ".\.wrangler\body_$t.json"

function Post($path, $jar, $json) {
  $json | Set-Content -NoNewline $bf
  curl.exe -s -c "$jar.txt" -b "$jar.txt" -X POST "$base$path" -H "Content-Type: application/json" --data-binary "@$bf"
}
function GetQ($path, $jar) {
  if ($jar) { curl.exe -s -b "$jar.txt" "$base$path" } else { curl.exe -s "$base$path" }
}

$qA = "{`"customerName`":`"ClientX`",`"phone`":`"555`",`"serviceType`":`"house`",`"amountCents`":10000,`"status`":`"draft`"}"
$qB = "{`"customerName`":`"ClientY`",`"phone`":`"556`",`"serviceType`":`"office`",`"amountCents`":20000,`"status`":`"sent`"}"

$sa = "{`"email`":`"a$t@test.com`",`"password`":`"pw123456`",`"businessName`":`"AcmeA`"}"
$sb = "{`"email`":`"b$t@test.com`",`"password`":`"pw123456`",`"businessName`":`"AcmeB`"}"
Write-Host "signup A: $(Post '/api/auth/signup' $A $sa)"
Write-Host "A create quote: $(Post '/api/quotes' $A $qA)"
Write-Host "A list (expect 1): $(GetQ '/api/quotes' $A)"
Write-Host "signup B: $(Post '/api/auth/signup' $B $sb)"
Write-Host "B list (expect EMPTY - isolation): $(GetQ '/api/quotes' $B)"
Write-Host "no-auth list (expect 401): $(GetQ '/api/quotes' $null)"
Write-Host "B create quote: $(Post '/api/quotes' $B $qB)"
Write-Host "B list (expect 1): $(GetQ '/api/quotes' $B)"
Write-Host "A list (expect 1, NOT 2): $(GetQ '/api/quotes' $A)"
Write-Host "A logout: $(Post '/api/auth/logout' $A '{}')"
Write-Host "B list after A logout (expect 1): $(GetQ '/api/quotes' $B)"
Write-Host "A list after logout (expect 401): $(GetQ '/api/quotes' $A)"
$bad = "{`"amountCents`":-5}"
Write-Host "B bad quote (expect 422): $(Post '/api/quotes' $B $bad)"
