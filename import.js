var gsjson = require('google-spreadsheet-to-json');
var beautify = require('js-beautify');
var fs = require('fs');

// Evolutionary Characteristics
var import_evolutionary_characteristics = function(data){
  console.log('evolutionary characteristics called!');
  gsjson({
    spreadsheetId: '1iUjZTCCv1KsgQ5VNohtU1c3BpW7pwh7N_FDgJimjHF8',
    worksheet: 'Evolutionary Characteristics'
  })
  .then(function(result) {
    // console.log(result.length);
    // console.log(result);
    var evolutionary_characteristics = [];
    result.forEach(function(element){

      index = evolutionary_characteristics.findIndex(function(subelement){ return subelement['category_name'] == element['category'] });
      if(index == -1){
        index = evolutionary_characteristics.push({category_name: element['category'], items: []}) - 1;
      }
      evolutionary_characteristics[index]['items'].push({
        name: element['name'],
        genesis: element['genesis'],
        custom: element['custom'],
        product_rental: element['product(+rental)'],
        commodity_utility: element['commodity(+utility)']
      });
    });
    data['evolutionary_characteristics'] = evolutionary_characteristics;
    var json = beautify(JSON.stringify(evolutionary_characteristics), { indent_size: 2, space_in_empty_paren: true });
    fs.writeFileSync('data/evolutionary_characteristics.json', json);
    // Next
    import_climatic_patterns(data);
  })
  .catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
  });
}

// Climatic Patterns
var import_climatic_patterns = function(data){
  console.log('climatic patterns called!');
  // console.log(data);
  gsjson({
    spreadsheetId: '1iUjZTCCv1KsgQ5VNohtU1c3BpW7pwh7N_FDgJimjHF8',
    worksheet: 'Climatic Patterns'
  })
  .then(function(result) {
      // console.log(result.length);
      // console.log(result);
      var climatic_patterns = [];
      result.forEach(function(element){
        index = climatic_patterns.findIndex(function(subelement){ return subelement['category_name'] == element['category']});
        if(index == -1){
          index = climatic_patterns.push({category_name: element['category'], items: []}) - 1;
        }
        climatic_patterns[index]['items'].push({
          name: element['name'],
          chapter_described: element['chapterDescribed'],
          description: element['description']
        });
      });
      data['climatic_patterns'] = climatic_patterns;
      var json = beautify(JSON.stringify(climatic_patterns), { indent_size: 2, space_in_empty_paren: true });
      fs.writeFileSync('data/climatic_patterns.json', json);

      // // Next
      combine(data);
  })
  .catch(function(err) {
      console.log(err.message);
      console.log(err.stack);
  });
}

var combine = function(data) {
  console.log('combine called!');
  var json = beautify(JSON.stringify(data), { indent_size: 2, space_in_empty_paren: true });
  fs.writeFileSync('data/combined.json', json);
}

var run = function() {
  import_evolutionary_characteristics({});
}

run();