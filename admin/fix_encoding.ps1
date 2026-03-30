$filePath = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$text = [IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Replacement pairs
$replacements = @{
    "Ã¶" = "ö"
    "Ã¼" = "ü"
    "ÅŸ" = "ş"
    "Åž" = "Ş"
    "Ä±" = "ı"
    "Ä°" = "İ"
    "Ã§" = "ç"
    "Ã‡" = "Ç"
    "ÄŸ" = "ğ"
    "Äž" = "Ğ"
    "Ã–" = "Ö"
    "Ãœ" = "Ü"
}

foreach ($key in $replacements.Keys) {
    $text = $text.Replace($key, $replacements[$key])
}

[IO.File]::WriteAllText($filePath, $text, [System.Text.Encoding]::UTF8)
Write-Host "Replaced all double-encoded utf-8 chars in $filePath"
