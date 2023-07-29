# Get the current working directory
$rootDir = Get-Location

# Define the path to the 'e2e' directory (you can modify this path if needed)
$e2eDir = Join-Path $rootDir "e2e"

# Check if the 'e2e' directory exists
if (Test-Path $e2eDir -PathType Container) {
    # Get all TypeScript files in the 'e2e' directory and its subdirectories
    $tsFiles = Get-ChildItem -Path $e2eDir -Filter "*.ts" -Recurse

    # Initialize a counter for the number of generated files
    $counter = 0

    # Display the initial message
    Write-Host "Compiling test files to JavaScript"

    # Loop through each TypeScript file and run 'tsc' on it
    foreach ($file in $tsFiles) {
        # Remove the existing '.js' file if it exists
        $jsFile = $file.FullName -replace '\.ts$', '.js'
        if (Test-Path $jsFile -PathType Leaf) {
            Remove-Item $jsFile
        }

        # Run the 'tsc' command on the TypeScript file
        & tsc $file.FullName

        # Increment the counter
        $counter++
    }

    # Display the final message
    Write-Host ("Done generating {0} files" -f $counter)
} else {
    Write-Host "The 'e2e' directory was not found in the current working directory."
}
