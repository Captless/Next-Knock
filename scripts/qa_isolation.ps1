$base = "http://localhost:8788"

function Req($method, $path, $body, $cookie) {
  $h = @{ "Content-Type" = "application/json" }
  if ($cookie) { $h["Cookie"] = $cookie }
  $opt = @{ Method = $method; Uri = "$base$path"; Headers = $h; UseBasicParsing = $true }
  if ($body) { $opt.Body = $body }
  try {
    $r = Invoke-WebRequest @opt -ErrorAction Stop
    $sc = $r.Headers["Set-Cookie"]
    return [pscustomobject]@{ Status = [int]$r.StatusCode; Body = $r.Content; SetCookie = $sc }
  } catch [System.Net.WebException] {
    $resp = $_.Exception.Response
    $sr = [System.IO.StreamReader]::new($resp.GetResponseStream()); $txt = $sr.ReadToEnd()
    $sc = if ($resp.Headers) { $resp.Headers["Set-Cookie"] } else { $null }
    return [pscustomobject]@{ Status = [int]$resp.StatusCode; Body = $txt; SetCookie = $sc }
  }
}

function CookieVal($setCookie) {
  if (-not $setCookie) { return $null }
  $parts = $setCookie -split ";"
  return $parts[0]
}

$sa = Req POST "/api/auth/signup" '{"email":"a1787249099@test.com","password":"pw123456","businessName":"AcmeA"}' $null
$cA = CookieVal $sa.SetCookie
Write-Host "signup A: $($sa.Status) cookie=$($cA -ne $null) $($sa.Body)"
$ca = Req POST "/api/quotes" '{"clientName":"ClientX","amount":100,"status":"draft"}' $cA
Write-Host "A create quote: $($ca.Status) $($ca.Body)"
$la = Req GET "/api/quotes" $null $cA
Write-Host "A list: $($la.Status) $($la.Body)"

$sb = Req POST "/api/auth/signup" '{"email":"b1787249099@test.com","password":"pw123456","businessName":"AcmeB"}' $null
$cB = CookieVal $sb.SetCookie
Write-Host "signup B: $($sb.Status) cookie=$($cB -ne $null) $($sb.Body)"
$lb = Req GET "/api/quotes" $null $cB
Write-Host "B list (expect empty): $($lb.Status) $($lb.Body)"

$na = Req GET "/api/quotes" $null $null
Write-Host "no-auth list (expect 401): $($na.Status) $($na.Body)"

$lo = Req POST "/api/auth/logout" $null $cA
Write-Host "A logout: $($lo.Status)"
$lb2 = Req GET "/api/quotes" $null $cB
Write-Host "B list after A logout (expect empty): $($lb2.Status) $($lb2.Body)"
