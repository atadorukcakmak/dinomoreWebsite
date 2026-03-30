$bytes = [System.IO.File]::ReadAllBytes('c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html')
Write-Host "File size: $($bytes.Length) bytes"
Write-Host "First 10 bytes (hex): $(($bytes[0..9] | ForEach-Object { $_.ToString('X2') }) -join ' ')"

# Check if it's UTF-16
if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) {
    Write-Host "ENCODING: UTF-16 LE (with BOM)"
} elseif ($bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF) {
    Write-Host "ENCODING: UTF-16 BE (with BOM)"
} elseif ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "ENCODING: UTF-8 with BOM"
} else {
    Write-Host "ENCODING: No BOM detected (likely UTF-8 or ASCII)"
}

# Check for null bytes (indicator of UTF-16)
$nullCount = ($bytes | Where-Object { $_ -eq 0 }).Count
Write-Host "Null bytes count: $nullCount"

# Try reading as UTF-16
$utf16content = [System.Text.Encoding]::Unicode.GetString($bytes)
$line1 = $utf16content.Split("`n")[0]
Write-Host "As UTF-16: $($line1.Substring(0, [Math]::Min(60, $line1.Length)))"

# Try reading as UTF-8
$utf8content = [System.Text.Encoding]::UTF8.GetString($bytes)
$line1_utf8 = $utf8content.Split("`n")[0]
Write-Host "As UTF-8: $($line1_utf8.Substring(0, [Math]::Min(60, $line1_utf8.Length)))"
