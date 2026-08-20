$base = "http://localhost:8788"
$t = [DateTimeOffset]::Now.ToUnixTimeSeconds()
$cj = ".\.wrangler\hcj_$t.txt"
$bf = ".\.wrangler\hbody_$t.json"
$today = (Get-Date).ToString("yyyy-MM-dd")

function Post($path, $jar, $json) {
  $json | Set-Content -NoNewline $bf
  curl.exe -s -c "$jar.txt" -b "$jar.txt" -X POST "$base$path" -H "Content-Type: application/json" --data-binary "@$bf"
}
function Patch($path, $jar, $json) {
  $json | Set-Content -NoNewline $bf
  curl.exe -s -c "$jar.txt" -b "$jar.txt" -X PATCH "$base$path" -H "Content-Type: application/json" --data-binary "@$bf"
}
function GetJ($path, $jar) { curl.exe -s -b "$jar.txt" "$base$path" }

$sa = "{`"email`":`"hc$t@test.com`",`"password`":`"pw123456`",`"businessName`":`"HC Co`"}"
Write-Host "signup: $(Post '/api/auth/signup' $cj $sa)"

$q = "{`"customerName`":`"Jane`",`"phone`":`"5551234`",`"serviceType`":`"house`",`"amountCents`":9000,`"status`":`"sent`",`"followUpDate`":`"$today`"}"
$cr = Post '/api/quotes' $cj $q
Write-Host "create: $cr"
$qid = ($cr | ConvertFrom-Json).quote.id
Write-Host "get detail: $(GetJ "/api/quotes/$qid" $cj)"
Write-Host "--- patch lost + reason ---"
$lost = "{`"status`":`"closed`",`"closedOutcome`":`"lost`",`"lostReason`":`"no_response`"}"
Write-Host "patch lost: $(Patch "/api/quotes/$qid" $cj $lost)"
Write-Host "get after lost: $(GetJ "/api/quotes/$qid" $cj)"
Write-Host "--- change password ---"
$cp = "{`"currentPassword`":`"pw123456`",`"newPassword`":`"newpass99`"}"
Write-Host "change ok: $(Post '/api/auth/change-password' $cj $cp)"
$bad = "{`"currentPassword`":`"wrong`",`"newPassword`":`"x`"}"
Write-Host "change bad: $(Post '/api/auth/change-password' $cj $bad)"
Write-Host "--- delete account ---"
Write-Host "delete: $(curl.exe -s -o $null -w '%{http_code}' -b "$cj.txt" -X POST "$base/api/auth/delete")"
Write-Host "quotes after delete (expect 401): $(GetJ '/api/quotes' $cj)"
