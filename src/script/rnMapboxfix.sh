const fs = require('fs');
const path = require('path');

// Path to the file to update
const filePath = 'node_modules/@rnmapbox/maps/android/build.gradle';

// The line to replace
const targetLine = `def defaultMapboxMapsVersion = "10.18.4"`;

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.log(`File ${filePath} not found`);
  process.exit(1);
}

// Read the file contents
let fileContents = fs.readFileSync(filePath, 'utf8');

// Comment the specific line if it exists
if (fileContents.includes(targetLine)) {
  const updatedContents = fileContents.replace(
    targetLine,
    `def defaultMapboxMapsVersion = "10.18.0"`
  );

  // Write the updated content back to the file
  fs.writeFileSync(filePath, updatedContents, 'utf8');

  console.log(`Successfully replaced out "${targetLine}" in "${filePath}"`);
} else {
  console.log(`Target line "${targetLine}" not found in "${filePath}"`);
}
