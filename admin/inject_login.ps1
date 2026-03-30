$html = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$logic = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\login_logic.txt"

$lines = [IO.File]::ReadAllLines($html, [Text.Encoding]::UTF8)
$insertLines = [IO.File]::ReadAllLines($logic, [Text.Encoding]::UTF8)

$idx = [array]::IndexOf($lines, "        window.addEventListener('load', () => window.AuthManager.migrateOldFormat());")

if ($idx -ge 0) {
    $before = $lines[0..($idx-1)]
    $after = $lines[$idx..($lines.Length-1)]
    
    $newLines = $before + $insertLines + $after
    [IO.File]::WriteAllLines($html, $newLines, [Text.Encoding]::UTF8)
    Write-Host "Injected missing login logic at line $idx!"
} else {
    Write-Host "Target line not found."
}
