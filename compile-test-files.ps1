# Define the source and output directories
$sourceDirectory = Join-Path $PWD "e2e/src"
$outputDirectory = Join-Path $PWD "e2e/out"

# Define the steps and pages directories in the source folder
$stepsSourceDirectory = Join-Path $sourceDirectory "steps"
$pagesSourceDirectory = Join-Path $sourceDirectory "pages"
$hooksSourceDirectory = Join-Path $sourceDirectory "hooks"

# Define the steps and pages directories in the output folder
$stepsOutputDirectory = Join-Path $outputDirectory "steps"
$pagesOutputDirectory = Join-Path $outputDirectory "pages"
$hooksOutputDirectory = Join-Path $outputDirectory "hooks"

# Create arrays to hold the steps and pages file paths
$stepsFilePaths = @()
$pagesFilePaths = @()
$hooksFilePaths = @()

# Get all the .ts files in the source directories and their subdirectories
$stepsTsFiles = Get-ChildItem -Path $stepsSourceDirectory -Recurse -Filter "*.steps.ts" -File
$pagesTsFiles = Get-ChildItem -Path $pagesSourceDirectory -Recurse -Filter "*.page.ts" -File
$hooksTsFiles = Get-ChildItem -Path $hooksSourceDirectory -Recurse -Filter "*.hooks.ts" -File

# Fill the arrays with the relative filePath + fileName of each .ts file
foreach ($file in $stepsTsFiles) {
    $filePath = $file.FullName.Replace($stepsSourceDirectory, "").TrimStart("\")
    $stepsFilePaths += $filePath
}

foreach ($file in $pagesTsFiles) {
    $filePath = $file.FullName.Replace($pagesSourceDirectory, "").TrimStart("\")
    $pagesFilePaths += $filePath
}

foreach ($file in $hooksTsFiles) {
    $filePath = $file.FullName.Replace($hooksSourceDirectory, "").TrimStart("\")
    $hooksFilePaths += $filePath
}

# Create the steps and pages directories if they don't exist
if (-not (Test-Path $stepsOutputDirectory)) {
    New-Item -ItemType Directory -Path $stepsOutputDirectory | Out-Null
}

if (-not (Test-Path $pagesOutputDirectory)) {
    New-Item -ItemType Directory -Path $pagesOutputDirectory | Out-Null
}

if (-not (Test-Path $hooksOutputDirectory)) {
    New-Item -ItemType Directory -Path $hooksOutputDirectory | Out-Null
}

# Compile and move TypeScript files to the output directories
function CompileAndMoveTypeScript {
    param(
        [string]$source,
        [string]$destination
    )

    # Run 'tsc' for each file with the '--outDir' parameter
    tsc $source

    # Move the resulting .js file to the output directory with the -Force parameter
    $jsFilePath = $source -replace "\.ts$", ".js"
    $jsFileName = Split-Path $jsFilePath -Leaf
    $destinationPath = Join-Path $destination $jsFileName
    Move-Item -Force $jsFilePath $destinationPath
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

# Compile and move TypeScript files for pages
foreach ($path in $hooksFilePaths) {
    $absolutePath = Join-Path $hooksSourceDirectory $path
    CompileAndMoveTypeScript -source $absolutePath -destination $hooksOutputDirectory
}

