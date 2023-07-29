# Define the sourceDirectory and outputDirectory variables
$sourceDirectory = Join-Path $PWD "e2e/src"
$outputDirectory = Join-Path $PWD "e2e/out"

# Create an array to hold the file paths
$filePaths = @()

# Get all the .ts files in the source directory and its subdirectories
$tsFiles = Get-ChildItem -Path $sourceDirectory -Recurse -Filter "*.ts" -File

# Fill the array with the filePath + fileName of each .ts file
foreach ($file in $tsFiles) {
    $filePath = $file.FullName
    $filePaths += $filePath
}

# Output every path in the console
foreach ($path in $filePaths) {
    Write-Host $path
}

# Run 'tsc' for each file with the '--outDir' parameter
foreach ($path in $filePaths) {
    tsc $path
}