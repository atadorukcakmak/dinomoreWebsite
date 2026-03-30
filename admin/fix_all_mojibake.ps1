$path = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$text = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)

# Lowercase mappings
$text = $text.Replace("Ã§", "ç")
$text = $text.Replace("ÄŸ", "ğ")
$text = $text.Replace("Ä±", "ı")
$text = $text.Replace("Ã¶", "ö")
$text = $text.Replace("ÅŸ", "ş")
$text = $text.Replace("Ã¼", "ü")

# Uppercase mappings
$text = $text.Replace("Ã‡", "Ç")
$text = $text.Replace("Äž", "Ğ")
$text = $text.Replace("Ä°", "İ")
$text = $text.Replace("Ã–", "Ö")
$text = $text.Replace("Åž", "Ş")
$text = $text.Replace("Ãœ", "Ü")

# Additional edge cases often found
$text = $text.Replace("â€“", "–")
$text = $text.Replace("â€”", "—")
$text = $text.Replace("â€˜", "‘")
$text = $text.Replace("â€™", "’")
$text = $text.Replace("â€œ", "“")
$text = $text.Replace("â€", "”")
$text = $text.Replace("âœ…", "✅")
$text = $text.Replace("â Œ", "❌")
$text = $text.Replace("â†’", "→")

[IO.File]::WriteAllText($path, $text, [Text.Encoding]::UTF8)
Write-Host "Completed full mojibake string replacement on index.html"
