function debug(log) {
  return (files, metalsmith, callback) => {
    if (log) {
      console.log('\nMetaData:');
      console.log(metalsmith.metadata());
      const contents = Object.entries(files);
      contents.forEach((content) => {
        console.log('\nFile:');
        console.log(content[1]);
      });
    }
    callback();
  };
}

module.exports = debug;
