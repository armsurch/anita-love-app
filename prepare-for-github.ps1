# PowerShell script to prepare files for GitHub deployment

Write-Host "🚀 Preparing Anita PA for GitHub deployment..." -ForegroundColor Cyan

# Create deployment folder
$deployFolder = "c:\Users\armst\OneDrive\Desktop\Anita-PA-Deploy"
if (Test-Path $deployFolder) {
    Remove-Item $deployFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $deployFolder -Force | Out-Null

Write-Host "📁 Created deployment folder: $deployFolder" -ForegroundColor Green

# Copy required files
$sourceFolder = "c:\Users\armst\OneDrive\Desktop\Anita PA"

# Root files to copy
$filesToCopy = @(
    "Anita.html",
    "index.html", 
    "anita-ultimate.js",
    "README.md",
    ".gitignore",
    "netlify.toml",
    "package.json"
)

Write-Host "📄 Copying root files..." -ForegroundColor Yellow

foreach ($file in $filesToCopy) {
    $sourcePath = Join-Path $sourceFolder $file
    $destPath = Join-Path $deployFolder $file
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath
        Write-Host "  ✅ Copied: $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Missing: $file" -ForegroundColor Red
    }
}

# Copy Anita folder
Write-Host "📁 Copying Anita folder..." -ForegroundColor Yellow
$anitaSource = Join-Path $sourceFolder "Anita"
$anitaDest = Join-Path $deployFolder "Anita"

if (Test-Path $anitaSource) {
    Copy-Item $anitaSource $anitaDest -Recurse
    Write-Host "  ✅ Copied: Anita folder with all photos and CSS" -ForegroundColor Green
    
    # List contents
    $anitaContents = Get-ChildItem $anitaDest
    Write-Host "  📋 Anita folder contains:" -ForegroundColor Cyan
    foreach ($item in $anitaContents) {
        Write-Host "    - $($item.Name)" -ForegroundColor White
    }
} else {
    Write-Host "  ❌ Missing: Anita folder" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Deployment files ready!" -ForegroundColor Green
Write-Host "📁 Location: $deployFolder" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to github.com and create new repository" -ForegroundColor White
Write-Host "2. Upload all files from: $deployFolder" -ForegroundColor White
Write-Host "3. Connect to Netlify for automatic deployment" -ForegroundColor White
Write-Host ""
Write-Host "💕 Your romantic app will be live soon! ✨" -ForegroundColor Magenta

# Open the deployment folder
Start-Process explorer.exe -ArgumentList $deployFolder