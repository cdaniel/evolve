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

      // Next
      import_doctrine(data);
  })
  .catch(function(err) {
      console.log(err.message);
      console.log(err.stack);
  });
}

// Doctrine
var import_doctrine = function(data){
  console.log('doctrine called!');
  // console.log(data);
  gsjson({
    spreadsheetId: '1iUjZTCCv1KsgQ5VNohtU1c3BpW7pwh7N_FDgJimjHF8',
    worksheet: 'Doctrine'
  })
  .then(function(result) {
      // console.log(result.length);
      // console.log(result);
      var doctrine = {
        1: [],
        2: [],
        3: [],
        4: []
      };
      result.forEach(function(element){
        index = doctrine[element['phase']].findIndex(function(subelement){ return subelement['category_name'] == element['category']});
        if(index == -1){
          index = doctrine[element['phase']].push({category_name: element['category'], items: []}) - 1;
        }
        doctrine[element['phase']][index]['items'].push({
          name: element['name'],
          category: element['category'],
          chapter_described: element['chapterDescribed'],
          description: element['description']
        });
      });
      data['doctrine'] = doctrine;
      var json = beautify(JSON.stringify(doctrine), { indent_size: 2, space_in_empty_paren: true });
      fs.writeFileSync('data/doctrine.json', json);

      // Next
      import_gameplay(data);
  })
  .catch(function(err) {
      console.log(err.message);
      console.log(err.stack);
  });
}

// Gameplay
var import_gameplay = function(data){
  console.log('gameplay called!');
  // console.log(data);
  gsjson({
    spreadsheetId: '1iUjZTCCv1KsgQ5VNohtU1c3BpW7pwh7N_FDgJimjHF8',
    worksheet: 'Gameplay'
  })
  .then(function(result) {
      // console.log(result.length);
      // console.log(result);
      var gameplay = [];
      result.forEach(function(element){
        index = gameplay.findIndex(function(subelement){ return subelement['category_name'] == element['category']});
        if(index == -1){
          index = gameplay.push({category_name: element['category'], items: []}) - 1;
        }
        gameplay[index]['items'].push({
          name: element['name'],
          chapter_described: element['chapterDescribed'],
          description: element['description']
        });
      });
      data['gameplay'] = gameplay;
      var json = beautify(JSON.stringify(gameplay), { indent_size: 2, space_in_empty_paren: true });
      fs.writeFileSync('data/gameplay.json', json);

      // Next
      import_glossary(data);
  })
  .catch(function(err) {
      console.log(err.message);
      console.log(err.stack);
  });
}

// Glossary
var import_glossary = function(data){
  console.log('glossary called!');
  // console.log(data);
  gsjson({
    spreadsheetId: '1iUjZTCCv1KsgQ5VNohtU1c3BpW7pwh7N_FDgJimjHF8',
    worksheet: 'Glossary'
  })
  .then(function(result) {
      // console.log(result.length);
      // console.log(result);
      var glossary = [];
      result.forEach(function(element){
        glossary.push({
          name: element['name'],
          description: element['description']
        });
      });
      data['glossary'] = glossary;
      var json = beautify(JSON.stringify(glossary), { indent_size: 2, space_in_empty_paren: true });
      fs.writeFileSync('data/glossary.json', json);

      // Next
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