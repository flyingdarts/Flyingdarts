# Define the source and output directories
$sourceDirectory = Join-Path $PWD "e2e/src"
$outputDirectory = Join-Path $PWD "e2e/out"

# Define the steps and pages directories in the source folder
$stepsSourceDirectory = Join-Path $sourceDirectory "steps"
$pagesSourceDirectory = Join-Path $sourceDirectory "pages"

# Define the steps and pages directories in the output folder
$stepsOutputDirectory = Join-Path $outputDirectory "steps"
$pagesOutputDirectory = Join-Path $outputDirectory "pages"

# Create arrays to hold the steps and pages file paths
$stepsFilePaths = @()
$pagesFilePaths = @()

# Get all the .ts files in the source directories and their subdirectories
$stepsTsFiles = Get-ChildItem -Path $stepsSourceDirectory -Recurse -Filter "*.ts" -File
$pagesTsFiles = Get-ChildItem -Path $pagesSourceDirectory -Recurse -Filter "*.ts" -File

# Fill the arrays with the relative filePath + fileName of each .ts file
foreach ($file in $stepsTsFiles) {
    $filePath = $file.FullName.Replace($stepsSourceDirectory, "").TrimStart("\")
    $stepsFilePaths += $filePath
}

foreach ($file in $pagesTsFiles) {
    $filePath = $file.FullName.Replace($pagesSourceDirectory, "").TrimStart("\")
    $pagesFilePaths += $filePath
}

# Output every path in the console
foreach ($path in $stepsFilePaths) {
    Write-Host $path
}

foreach ($path in $pagesFilePaths) {
    Write-Host $path
}

# Create the steps and pages directories if they don't exist
if (-not (Test-Path $stepsOutputDirectory)) {
    New-Item -ItemType Directory -Path $stepsOutputDirectory | Out-Null
}

if (-not (Test-Path $pagesOutputDirectory)) {
    New-Item -ItemType Directory -Path $pagesOutputDirectory | Out-Null
}

# Compile and move TypeScript files to the output directories
function CompileAndMoveTypeScript {
    param(
        [string]$source,
        [string]$destination
    )

    # Run 'tsc' for each file with the '--outDir' parameter
    tsc $source

    # Move the resulting .js file to the output directory
    $jsFilePath = $source -replace "\.ts$", ".js"
    $jsFileName = Split-Path $jsFilePath -Leaf
    $destinationPath = Join-Path $destination $jsFileName
    Move-Item $jsFilePath $destinationPath
}

# Compile and move TypeScript files for steps
foreach ($path in $stepsFilePaths) {
    $absolutePath = Join-Path $stepsSourceDirectory $path
    CompileAndMoveTypeScript -source $absolutePath -destination $stepsOutputDirectory
}

# Compile and move TypeScript files for pages
foreach ($path in $pagesFilePaths) {
    $absolutePath = Join-Path $pagesSourceDirectory $path
    CompileAndMoveTypeScript -source $absolutePath -destination $pagesOutputDirectory
}
