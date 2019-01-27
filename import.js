var gsjson = require('google-spreadsheet-to-json');
var beautify = require('js-beautify');
var fs = require('fs');

// Climatic Patterns
gsjson({
    spreadsheetId: '1iUjZTCCv1KsgQ5VNohtU1c3BpW7pwh7N_FDgJimjHF8',
    worksheet: 'Climatic Patterns'
})
.then(function(result) {
    // console.log(result.length);
    // console.log(result);
    var climatic_patterns = {};
    result.forEach(function(element){
      if(!(element['category'] in climatic_patterns)) {
        climatic_patterns[element['category']] = [];
      }
      climatic_patterns[element['category']].push({
        name: element['name'],
        chapter_described: element['chapterDescribed'],
        description: element['description']
      });
    });
    var json = beautify(JSON.stringify(climatic_patterns), { indent_size: 2, space_in_empty_paren: true });
    fs.writeFileSync('data/climatic_patterns.json', json);
})
.catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
});