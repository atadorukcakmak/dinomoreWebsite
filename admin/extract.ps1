$lines = [IO.File]::ReadAllLines('c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\orig_index.html', [Text.Encoding]::Unicode)
$s = [array]::IndexOf($lines, '        window.AuthManager = {')
$e = [array]::IndexOf($lines, '        AuthManager.migrateOldFormat();')
if ($s -ge 0 -and $e -ge 0) {
    [IO.File]::WriteAllLines('c:\Users\ASUS\Documents\GitHub\dinomoreWebsite\admin\extracted.txt', $lines[$s..$e], [Text.Encoding]::UTF8)
}
