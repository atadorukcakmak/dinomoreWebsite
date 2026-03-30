$path = "c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\index.html"
$encoding = [System.Text.Encoding]::UTF8
$lines = [System.IO.File]::ReadAllLines($path, $encoding)

Function Write-Fixed($index, $expected, $newStr) {
    if ($lines[$index] -match $expected) {
        $lines[$index] = $newStr
        Write-Host "Fixed line $index"
    } else {
        Write-Host "Line $index doesn't match expected. Was: $($lines[$index])"
    }
}

Write-Fixed 381 "label-pass" '                    <label id="label-pass">Şifre</label>'
Write-Fixed 384 "loginPass" '                        <input type="password" id="loginPass" placeholder="Şifrenizi Girin" required autocomplete="off">'
Write-Fixed 714 "Yeni" '                                <label>Yeni Şifre</label>'
Write-Fixed 717 "updatePass" '                                    <input type="password" id="updatePass" placeholder="Yeni Şifre" required>'
Write-Fixed 738 "Yeni" '                                <label>Yeni Yönetici Şifresi</label>'
Write-Fixed 741 "newAdminPass" '                                    <input type="password" id="newAdminPass" placeholder="Şifre" required>'
Write-Fixed 746 "fa-user-plus" '                                <i class="fas fa-user-plus"></i> Hesap Oluştur'
Write-Fixed 798 "bağlı" '                            <span id="ghStatus" class="gh-status gh-disconnected"><i class="fas fa-circle" style="font-size:0.5rem;"></i> Bağlı Değil</span>'

[System.IO.File]::WriteAllLines($path, $lines, $encoding)
Write-Host "Saved!"
