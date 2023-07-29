# Get the current working directory
$source = Get-Location

# Define the path to the 'e2e' directory (you can modify this path if needed)
$sourceDirectory = Join-Path $source "e2e/src"

# Define the path to the 'build' directory (you can modify this path if needed)
$outputDirectory = Join-Path $source "e2e/out"

# Check if the 'e2e' directory exists
if (Test-Path $sourceDirectory -PathType Container) {
    # Get all TypeScript files in the 'e2e' directory and its subdirectories
    $tsFiles = Get-ChildItem -Path $sourceDirectory -Filter "*.ts" -Recurse

    # Create the 'build' directory if it doesn't exist
    if (-not (Test-Path $outputDirectory -PathType Container)) {
        New-Item -ItemType Directory -Path $outputDirectory | Out-Null
    }

    # Initialize a counter for the number of generated files
    $counter = 0

    # Display the initial message
    Write-Host "Compiling test files..."

    # Loop through each TypeScript file and run 'tsc' on it
    foreach ($file in $tsFiles) {
        # Display the current file being compiled
        Write-Host "Compiling file: $($file.FullName)"

        # Calculate the relative path of the TypeScript file to the 'src' directory
        $relativePath = $file.DirectoryName.SubString($sourceDirectory.Length)

        # Define the output directory for the TypeScript file
        $fileOutputDirectory = Join-Path $outputDirectory $relativePath

        # Create the output directory if it doesn't exist
        if (-not (Test-Path $fileOutputDirectory -PathType Container)) {
            New-Item -ItemType Directory -Path $fileOutputDirectory | Out-Null
        }

        # Run the 'tsc' command on the TypeScript file
        & tsc $file.FullName --outDir $fileOutputDirectory

        # Increment the counter
        $counter++
    }

    # Display the final message
    Write-Host ("Done generating and moving {0} files to the 'build' folder inside 'e2e'" -f $counter)
} else {
    Write-Host "The 'e2e' directory was not found in the current working directory."
}
