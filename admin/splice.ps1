$htmlPath = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$newJsPath = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\new_js.txt"

$lines = [System.IO.File]::ReadAllLines($htmlPath, [System.Text.Encoding]::UTF8)
$newJs = [System.IO.File]::ReadAllText($newJsPath, [System.Text.Encoding]::UTF8)

$startIndex = -1
$endIndex = -1

for ($i=0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '^\s*window\.AuthManager = \{') {
        $startIndex = $i
        break
    }
}

for ($i=$startIndex; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '^\s*AuthManager\.migrateOldFormat\(\);') {
        $endIndex = $i
        break
    }
}

Write-Host "Found bounds: $startIndex to $endIndex"

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    # rebuild content
    $before = $lines[0..($startIndex-1)] -join "`r`n"
    $after = $lines[($endIndex+1)..($lines.Length-1)] -join "`r`n"
    
    $finalContent = $before + "`r`n" + $newJs + "`r`n" + $after
    [System.IO.File]::WriteAllText($htmlPath, $finalContent, [System.Text.Encoding]::UTF8)
    Write-Host "Successfully spliced new JS block!"
} else {
    Write-Host "Failed to find bounds."
}
