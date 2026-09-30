$dst = "d:\v my fair saloon\public\reels"
$headers = @("-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36", "-H", "Referer: https://www.instagram.com/", "--max-time", "300", "-L")

$downloads = @(
    @{ file = "reel-1.mp4";        url = "https://scontent-yyz1-1.cdninstagram.com/o1/v/t2/f2/m367/AQMTExdSby2Nd0c514EWVneQ9I6fPVwM9Z0zN7m5pXebXWIJ5Mh6b6LzAuRWJMRdNAQ49Pz3BMch_kqu2hERM3TWtC_RG7T1SURuH7eFpy7jqA.mp4" }
    @{ file = "reel-1-poster.jpg"; url = "https://scontent-yyz1-1.cdninstagram.com/v/t51.71878-15/725233106_1743937296615056_7393152633192440893_n.jpg" }
    @{ file = "reel-2.mp4";        url = "https://instagram.fyxe2-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQO6xiKUu1kFk7I0oMqF2tdszAldP68EidHQBINcdtBA0dd50yLaJjOrKZHb9FzQJgmLy8XlC6HyLtniVzYKo-iGoSJhwXlnqmoIkUQ.mp4" }
    @{ file = "reel-2-poster.jpg"; url = "https://instagram.fyxe2-1.fna.fbcdn.net/v/t51.71878-15/628101075_1801647717180999_6762295697496276835_n.jpg" }
    @{ file = "reel-3.mp4";        url = "https://scontent-waw2-2.cdninstagram.com/o1/v/t2/f2/m86/AQMSBvxdnlj0R60HRe40mzF_cOvYqpkQu9eG6igMv7cbA7c1t_jVKBVh5ahw1NRo348IBhv2VFcq60vRwnhMJol-qzbcTZ_o6-THSuo.mp4" }
    @{ file = "reel-3-poster.jpg"; url = "https://scontent-waw2-1.cdninstagram.com/v/t51.71878-15/764976314_1569476951255071_1417626719278788280_n.jpg" }
    @{ file = "reel-4.mp4";        url = "https://scontent-fra3-1.cdninstagram.com/o1/v/t2/f2/m367/AQOhFC7aVLd8fSItuz8ZpMRFMmgagWaj4XoDfDZ0HMsvSCtrtTG0TWWdWeSYDKkZpkIkvFv_1Dmz1Y0swVCNqTrrVAVzsKBslYqsMPg.mp4" }
    @{ file = "reel-4-poster.jpg"; url = "https://scontent-fra5-2.cdninstagram.com/v/t51.82787-15/582087305_17882113932410989_6754770028995575643_n.jpg" }
    @{ file = "reel-5.mp4";        url = "https://instagram.fvlc10-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQPOuLv2xdFCgXrxPvJYoLCrTqPdgACWGJHaaP2EqpPLOq53Ks-4ZpKTag_VH1adsWGf0ld33PHlDr0TKxvTXsNlQwJTWhoBHzyUQy4.mp4" }
    @{ file = "reel-5-poster.jpg"; url = "https://instagram.fvlc9-1.fna.fbcdn.net/v/t51.75761-15/498278550_17859949998410989_756326989120971330_n.jpg" }
    @{ file = "reel-6.mp4";        url = "https://instagram.ffab1-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQOuQskneig3UAn2H22Jv88BuYrSr9tXWQedT_NlrnYBivTteTBLLsXRyGEJvYpbUMZoG1wAZSEDmRkWepaeIqZbs6LAoYRbGvCeMwA.mp4" }
    @{ file = "reel-6-poster.jpg"; url = "https://instagram.ffab1-2.fna.fbcdn.net/v/t51.75761-15/487456136_17854525974410989_623722870519450360_n.jpg" }
    @{ file = "reel-8.mp4";        url = "https://instagram.fmad24-1.fna.fbcdn.net/o1/v/t2/f2/m367/AQPA6C0fsVbqCO7EMUUioX-82tQV2MpobEBoCLALRmlB69DmQsMidcGNpRTeD12k2-wotLWfIHfwqvAWmNt79QBpAlFwzDQZqJMAPqM.mp4" }
)

foreach ($item in $downloads) {
    $out = "$dst\$($item.file)"
    Write-Host "Downloading $($item.file)..."
    $result = & curl.exe @headers -o $out $item.url
    if ($LASTEXITCODE -eq 0) {
        $size = (Get-Item $out).Length
        Write-Host "  OK: $size bytes"
    } else {
        Write-Host "  FAILED (exit $LASTEXITCODE)"
    }
}

Write-Host ""
Write-Host "=== File sizes ==="
Get-ChildItem "$dst\*.mp4" | Sort-Object Name | Select-Object Name, @{N="SizeMB";E={[math]::Round($_.Length/1MB,2)}} | Format-Table

Write-Host "=== MD5 hashes ==="
Get-ChildItem "$dst\*.mp4" | Sort-Object Name | ForEach-Object {
    $hash = (Get-FileHash $_.FullName -Algorithm MD5).Hash
    Write-Host "$hash  $($_.Name)"
}
