# Read original file
$originalBytes = [System.IO.File]::ReadAllBytes('c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html')
$content = [System.Text.Encoding]::UTF8.GetString($originalBytes)

# Show some Turkish text lines to verify
$lines = $content -split "`r?`n"
Write-Host "Total lines: $($lines.Length)"
Write-Host ""

# Check specific lines with Turkish text
$checkLines = @(372, 375, 382, 385, 389, 704, 705, 708, 711, 715, 718, 722, 728, 729, 732, 735, 739, 742, 747, 754, 755, 759, 764, 765, 766, 776, 781, 782, 783, 798, 799, 801, 820, 821, 832, 835, 836)

foreach ($lineNum in $checkLines) {
    $idx = $lineNum - 1
    if ($idx -lt $lines.Length) {
        $line = $lines[$idx].Trim()
        if ($line.Length -gt 120) { $line = $line.Substring(0, 120) + "..." }
        Write-Host "L${lineNum}: $line"
    }
}
