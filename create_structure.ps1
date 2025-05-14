# สคริปต์สำหรับสร้างโครงสร้างโฟลเดอร์และไฟล์
$basePath = "./src"

# รายการโฟลเดอร์และไฟล์ตามโครงสร้าง
$structure = @{
    "components" = @(
        "Navbar.jsx",
        "Footer.jsx",
        "TourCard.jsx",
        "SearchBar.jsx",
        "Hero.jsx",
        "ContactForm.jsx",
        "BookingForm.jsx",
        "common/Button.jsx",
        "common/SocialLinks.jsx",
        "common/Map.jsx"
    )
    "layouts" = @(
        "MainLayout.jsx"
    )
    "pages" = @(
        "home/Home.jsx",
        "home/components/FeaturedTours.jsx",
        "home/components/Testimonials.jsx",
        "home/components/Services.jsx",
        "home/Home.css",
        "krabi/Krabi.jsx",
        "krabi/components/KrabiPackages.jsx",
        "krabi/components/KrabiHighlights.jsx",
        "krabi/Krabi.css",
        "phuket/Phuket.jsx",
        "phuket/components/PhuketPackages.jsx",
        "phuket/components/PhuketHighlights.jsx",
        "phuket/Phuket.css",
        "phang-nga/PhangNga.jsx",
        "phang-nga/components/PhangNgaPackages.jsx",
        "phang-nga/components/PhangNgaHighlights.jsx",
        "phang-nga/PhangNga.css",
        "international/International.jsx",
        "international/components/PopularDestinations.jsx",
        "international/components/InternationalPackages.jsx",
        "international/International.css",
        "group-tour/GroupTour.jsx",
        "group-tour/components/GroupTourForm.jsx",
        "group-tour/GroupTour.css",
        "contact/Contact.jsx",
        "contact/components/ContactInfo.jsx",
        "contact/Contact.css"
    )
    "styles" = @(
        "globals.css",
        "colors.css",
        "typography.css"
    )
    "utils" = @(
        "supabase.js",
        "seo.js",
        "helpers.js"
    )
    "hooks" = @(
        "useTours.js"
    )
}

# ฟังก์ชันสำหรับสร้างโฟลเดอร์และไฟล์
function Create-FolderStructure {
    param (
        [string]$basePath,
        [hashtable]$structure
    )

    foreach ($folder in $structure.Keys) {
        $folderPath = Join-Path $basePath $folder
        Write-Host "Creating folder: $folderPath"
        New-Item -Path $folderPath -ItemType Directory -Force | Out-Null

        foreach ($file in $structure[$folder]) {
            $filePath = Join-Path $basePath $file
            $fileDir = Split-Path $filePath -Parent
            if (-not (Test-Path $fileDir)) {
                Write-Host "Creating subfolder: $fileDir"
                New-Item -Path $fileDir -ItemType Directory -Force | Out-Null
            }
            Write-Host "Creating file: $filePath"
            New-Item -Path $filePath -ItemType File -Force | Out-Null
        }
    }
}

# สร้างโครงสร้างโฟลเดอร์และไฟล์
Create-FolderStructure -basePath $basePath -structure $structure

Write-Host "Folder and file structure created successfully!" -ForegroundColor Green