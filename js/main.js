function parseFormReturnObject() {
	var inputs = Array.prototype.slice.call(document.body.getElementsByTagName('input'));
    return inputs
    .filter(function(input) {
        return input.type === 'radio';
    })
    .reduce(function(collection, input, index) {
    	if (!input.name) throw new Error('Input field must be named');
      if (input.checked) {
        var name = input.name;
        var value = input.value;
        collection[name] = value;
      }
      return collection;
    }, {});
}

function makeBlobJSON(json) {
  if (arguments.length < 1) return null;
  return new Blob([JSON.stringify(json)], {type: 'application/json;charset=utf-8'});
}

function submitForm() {
  var json = parseFormReturnObject();
  console.log(json);
  var blob = makeBlobJSON(json);
  saveAs(blob, 'results.txt');
}

document.getElementById('submit').addEventListener('click', function (event) {
  event.preventDefault();
  submitForm();
});