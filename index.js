const readline = require('readline');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const createExtractorFromFile = require('node-unrar-js').createExtractorFromFile

process.setMaxListeners(0)


/**
 * Private functions
 */
async function decompressZip(filePath, outputDir) {
  return fs.createReadStream(filePath)
    .pipe(unzipper.Extract({ path: outputDir }))
    .on('close', () => {
      console.log('Zip file decompressed successfully.');
    });
}

async function decompressRar(file, destination) {
  try {
    // Create the extractor with the file information (returns a promise)
    const extractor = await createExtractorFromFile({
      filepath: file,
      targetPath: destination
    });

    // Extract the files
    [...extractor.extract().files];
  } catch (err) {
    // May throw UnrarError, see docs
    console.error(err);
  }
}

/**
 * CLI interface
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


/**
 * Main recursive function
 */

rl.question('inserisci il path completo da cui copiare i file ', (sourceDir) => {
  rl.question('inserisci il path competo su cui incollare i file ', async (destinationDir) => {
    
    if (!fs.existsSync(sourceDir)) {
        console.error('La directory da cui copiare i file non esiste')
        rl.close()
    }

    if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir);
    }

    function copyFiles(sourceDir, destinationDir, originalDestinationDir) {
      const files = fs.readdirSync(sourceDir);

      files.forEach(async (file) => {
        const filePath = path.join(sourceDir, file);

        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) {
          const newDestinationDir = path.join(destinationDir, file);
          copyFiles(filePath, newDestinationDir, originalDestinationDir);
        } else {
          const ext = path.extname(file);

          // decompress compressed files if any
          if (ext === '.rar') {
            await decompressRar(filePath, sourceDir, file)
          }

          if (ext === '.zip') {
            await decompressZip(filePath, sourceDir)
          }
          
          // copy the ebooks to the destination folder
          if (ext === '.mobi' || ext === '.epub' || ext === '.pdf' || ext === '.docx') {
            const destinationPath = path.join(originalDestinationDir, file);
            fs.copyFileSync(filePath, destinationPath);
          }
        }
      });
    }
  
    await copyFiles(sourceDir, destinationDir, destinationDir);
    rl.close();
  });
});