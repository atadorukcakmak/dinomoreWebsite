$path = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$bytes = [IO.File]::ReadAllBytes($path)

# We need to find byte sequence: 4F 6C 75 C3 85 C5 B8 74 75 72
# and replace the C3 85 C5 B8 part with C5 9F (which is proper UTF-8 for ş)
# 
# C3 85 = UTF-8 for Å (U+00C5)
# C5 B8 = UTF-8 for Ÿ (U+0178)  
# Together they are a double-encoded ş: the correct UTF-8 is C5 9F

$badSeq = @(0xC3, 0x85, 0xC5, 0xB8)  # Å + Ÿ (double-encoded ş)
$goodSeq = @(0xC5, 0x9F)              # ş (correct UTF-8)

# Convert bytes to list for manipulation
$byteList = [System.Collections.Generic.List[byte]]::new($bytes)

$replacements = 0
$i = 0
while ($i -lt $byteList.Count - 3) {
    if ($byteList[$i] -eq $badSeq[0] -and $byteList[$i+1] -eq $badSeq[1] -and 
        $byteList[$i+2] -eq $badSeq[2] -and $byteList[$i+3] -eq $badSeq[3]) {
        # Remove 4 bad bytes
        $byteList.RemoveRange($i, 4)
        # Insert 2 good bytes
        $byteList.InsertRange($i, [byte[]]$goodSeq)
        $replacements++
        Write-Host "Replaced at byte offset $i"
    }
    $i++
}

# Also scan for other triple-encoding patterns
# Ã (C3 83) + ¼ (C2 BC) = triple-encoded ü -> should be C3 BC
# Ã (C3 83) + ¶ (C2 B6) = triple-encoded ö -> should be C3 B6  
# etc.

# Pattern: C3 84 C5 9F = Ä + ğ = double-encoded-differently ğ -> should be C4 9F
$patterns = @(
    @{ bad = @(0xC3, 0x84, 0xC5, 0x9F); good = @(0xC4, 0x9F); name = "g-breve" },
    @{ bad = @(0xC3, 0x84, 0xC2, 0xB1); good = @(0xC4, 0xB1); name = "dotless-i" },
    @{ bad = @(0xC3, 0x84, 0xC2, 0xB0); good = @(0xC4, 0xB0); name = "dotted-I" },
    @{ bad = @(0xC3, 0x84, 0xC5, 0x9E); good = @(0xC4, 0x9E); name = "G-breve" },
    @{ bad = @(0xC3, 0x85, 0xC5, 0x9F); good = @(0xC5, 0x9F); name = "s-cedilla" },
    @{ bad = @(0xC3, 0x85, 0xC5, 0x9E); good = @(0xC5, 0x9E); name = "S-cedilla" },
    @{ bad = @(0xC3, 0x83, 0xC2, 0xBC); good = @(0xC3, 0xBC); name = "u-umlaut" },
    @{ bad = @(0xC3, 0x83, 0xC2, 0xB6); good = @(0xC3, 0xB6); name = "o-umlaut" },
    @{ bad = @(0xC3, 0x83, 0xC2, 0xA7); good = @(0xC3, 0xA7); name = "c-cedilla" },
    @{ bad = @(0xC3, 0x83, 0xC2, 0x87); good = @(0xC3, 0x87); name = "C-cedilla" },
    @{ bad = @(0xC3, 0x83, 0xC2, 0x96); good = @(0xC3, 0x96); name = "O-umlaut" },
    @{ bad = @(0xC3, 0x83, 0xC2, 0x9C); good = @(0xC3, 0x9C); name = "U-umlaut" }
)

foreach ($p in $patterns) {
    $bad = $p.bad
    $good = $p.good
    $i = 0
    while ($i -lt $byteList.Count - ($bad.Count - 1)) {
        $match = $true
        for ($j = 0; $j -lt $bad.Count; $j++) {
            if ($byteList[$i + $j] -ne $bad[$j]) { $match = $false; break }
        }
        if ($match) {
            $byteList.RemoveRange($i, $bad.Count)
            $byteList.InsertRange($i, [byte[]]$good)
            $replacements++
            Write-Host "Replaced $($p.name) at byte offset $i"
        }
        $i++
    }
}

Write-Host ""
Write-Host "Total replacements: $replacements"

[IO.File]::WriteAllBytes($path, $byteList.ToArray())
Write-Host "File saved!"
