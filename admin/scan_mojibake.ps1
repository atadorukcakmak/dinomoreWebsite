$path = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$bytes = [IO.File]::ReadAllBytes($path)
$text = [Text.Encoding]::UTF8.GetString($bytes)
$lines = $text.Split("`n")

$found = @()
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    # Check for double-encoded UTF-8 patterns: Latin chars 0xC3-0xC5 followed by 0x80-0xBF  
    $chars = $line.ToCharArray()
    for ($j = 0; $j -lt $chars.Count - 1; $j++) {
        $c1 = [int]$chars[$j]
        $c2 = [int]$chars[$j+1]
        if (($c1 -ge 0xC3 -and $c1 -le 0xC5) -and ($c2 -ge 0x80 -and $c2 -le 0xBF)) {
            $ctx = $line.Trim()
            if ($ctx.Length -gt 100) { $ctx = $ctx.Substring(0, 100) }
            $found += "Line $($i+1): chars=[$c1,$c2] context=$ctx"
        }
    }
}

if ($found.Count -eq 0) {
    Write-Host "NO double-encoded mojibake found!"
} else {
    Write-Host "Found $($found.Count) occurrences:"
    $found | ForEach-Object { Write-Host $_ }
}
