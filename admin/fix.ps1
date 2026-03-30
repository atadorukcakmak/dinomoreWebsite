# Düzeltme betiği - encoding problemini aşmak için doğrudan char dizisi olarak tanım
$htmlPath = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$bytes = [System.IO.File]::ReadAllBytes($htmlPath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

# Çift UTF-8 kodlanmış baytların karakter karşılıkları ('Ã¶' -> 195,182 vb.)
$replacements = @(
    @([char]195+[char]182, "ö"),
    @([char]195+[char]188, "ü"),
    @([char]197+[char]159, "ş"),
    @([char]197+[char]158, "Ş"),
    @([char]196+[char]177, "ı"),
    @([char]196+[char]176, "İ"),
    @([char]195+[char]167, "ç"),
    @([char]195+[char]135, "Ç"),
    @([char]196+[char]159, "ğ"),
    @([char]196+[char]158, "Ğ"),
    @([char]195+[char]150, "Ö"),
    @([char]195+[char]156, "Ü")
)

foreach ($pair in $replacements) {
    if ($text -match [regex]::Escape($pair[0])) {
        Write-Host "Bulundu ve düzeltildi: $($pair[0]) -> $($pair[1])"
        $text = $text.Replace($pair[0], $pair[1])
    }
}

# Ve ekstra bozuk karakter olan ÅŸ (Capital A ring, Y diaeresis)
$extra_s_small = [char]197+[char]159 
$extra_s_large = [char]197+[char]158
$extra_o_small = [char]195+[char]182
# Write it explicitly just in case:
[System.IO.File]::WriteAllText($htmlPath, $text, [System.Text.Encoding]::UTF8)
Write-Host "Bitti."
