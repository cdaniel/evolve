var gsjson = require('google-spreadsheet-to-json');
var beautify = require('js-beautify');
var fs = require('fs');

// Evolutionary Characteristics
gsjson({
  spreadsheetId: '1iUjZTCCv1KsgQ5VNohtU1c3BpW7pwh7N_FDgJimjHF8',
  worksheet: 'Evolutionary Characteristics'
})
.then(function(result) {
  // console.log(result.length);
  // console.log(result);
  var evolutionary_characteristics = {};
  result.forEach(function(element){
    if(!(element['category'] in evolutionary_characteristics)) {
      evolutionary_characteristics[element['category']] = [];
    }
    evolutionary_characteristics[element['category']].push({
      name: element['name'],
      genesis: element['genesis'],
      custom: element['custom'],
      'product(+rental)': element['product(+rental)'],
      'commodity(+utility)': element['commodity(+utility)']
    });
  });
  var json = beautify(JSON.stringify(evolutionary_characteristics), { indent_size: 2, space_in_empty_paren: true });
  fs.writeFileSync('data/evolutionary_characteristics.json', json);
})
.catch(function(err) {
  console.log(err.message);
  console.log(err.stack);
});

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