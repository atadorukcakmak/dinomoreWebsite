$path = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$bytes = [IO.File]::ReadAllBytes($path)
$text = [Text.Encoding]::UTF8.GetString($bytes)
$lines = $text.Split("`n")

# Check line 747 (0-indexed: 746)
$line747 = $lines[746]
Write-Host "Line 747 content:"
Write-Host $line747
Write-Host ""
Write-Host "Hex dump of interesting part:"
$idx = $line747.IndexOf("Olu")
if ($idx -ge 0) {
    $segment = $line747.Substring($idx, [Math]::Min(20, $line747.Length - $idx))
    $segBytes = [Text.Encoding]::UTF8.GetBytes($segment)
    $hex = ($segBytes | ForEach-Object { $_.ToString("X2") }) -join " "
    Write-Host "Text: $segment"
    Write-Host "Hex:  $hex"
}

# Also check for any remaining non-ASCII suspicious chars
Write-Host ""
Write-Host "Lines with potential issues (char codes 0x100+):"
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $chars = $line.ToCharArray()
    foreach ($c in $chars) {
        $code = [int]$c
        # These are the mojibake indicator chars: Å (0x00C5), Ã (0x00C3), Ä (0x00C4)
        if ($code -eq 0xC5 -or $code -eq 0xC3 -or $code -eq 0xC4) {
            $ctx = $line.Trim()
            if ($ctx.Length -gt 120) { $ctx = $ctx.Substring(0, 120) }
            Write-Host "Line $($i+1): Found char 0x$($code.ToString('X4')) - $ctx"
            break
        }
    }
}
