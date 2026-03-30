$file = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$lines = Get-Content $file
$newLines = @()
for ($i = 0; $i -lt $lines.Count; $i++) {
    # Lines 1178-1196 are 0-indexed 1177-1195 (showHashPanel function)
    if ($i -ge 1177 -and $i -le 1195) { continue }
    $newLines += $lines[$i]
}
[System.IO.File]::WriteAllLines($file, $newLines)
Write-Host "Removed lines 1178-1196 (showHashPanel). New line count: $($newLines.Count)"
