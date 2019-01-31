# evolutionary-characteristics
A simple tool to help with identifying the evolutionary stage of an activity. See it live at [evolve.hiredthought.com](https://evolve.hiredthought.com).

This work is adapted from [Finding a Path](https://medium.com/wardleymaps/finding-a-path-cdb1249078c0) by Simon Wardley, and thereby licensed [Creative Commons Attribution-Share Alike 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Editing

A rewrite to Bootstrap 4 with templating via Mustache has resulted in a new render pipeline for dev:

1. `npm install`
2. `npm run watch`
3. Make changes to `.json` or `.mustache` files
4. See changes reflected in `index.html`

## Data
A data pipeline also exists, pulling in information from [Tasshin Fogleman](https://twitter.com/tasshinfogleman)'s [Wardley Maps Strategy Cycle Spreadsheet](https://docs.google.com/spreadsheets/d/1iUjZTCCv1KsgQ5VNohtU1c3BpW7pwh7N_FDgJimjHF8/edit#gid=1150470337).

The resulting json data is committed to the repository. If it is out of date, a fresh set can be imported with: `npm run import`.