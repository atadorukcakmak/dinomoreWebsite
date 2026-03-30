$content = Get-Content 'c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html' -Raw -Encoding UTF8
# Check specific lines for Turkish characters
$lines = $content -split "`n"
Write-Host "Line 372: $($lines[371].Trim().Substring(0, [Math]::Min(80, $lines[371].Trim().Length)))"
Write-Host "Line 704: $($lines[703].Trim().Substring(0, [Math]::Min(80, $lines[703].Trim().Length)))"
Write-Host "Line 728: $($lines[727].Trim().Substring(0, [Math]::Min(80, $lines[727].Trim().Length)))"
Write-Host "---"
# Check if file contains mojibake patterns
if ($content -match 'Ã¶') { Write-Host "FOUND: mojibake o-umlaut" }
if ($content -match 'Ã¼') { Write-Host "FOUND: mojibake u-umlaut" }
if ($content -match 'Ä±') { Write-Host "FOUND: mojibake dotless-i" }
# Check if file contains correct Turkish
if ($content -match 'ö') { Write-Host "FOUND: correct o-umlaut" }
if ($content -match 'ü') { Write-Host "FOUND: correct u-umlaut" }
if ($content -match 'ş') { Write-Host "FOUND: correct s-cedilla" }
if ($content -match 'ğ') { Write-Host "FOUND: correct g-breve" }
if ($content -match 'ı') { Write-Host "FOUND: correct dotless-i" }
if ($content -match 'ç') { Write-Host "FOUND: correct c-cedilla" }
if ($content -match 'İ') { Write-Host "FOUND: correct capital I-dot" }
