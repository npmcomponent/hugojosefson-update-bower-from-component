var fs = require("fs");

module.exports = updateBowerJsonFromComponentJson;

function readFile(filename) {
  return fs.readFileSync(filename, "utf8");
}

function readIfExists(filename) {
  if (fs.existsSync(filename)) {
    return readFile(filename);
  } else {
    return null;
  }
}

function updateBowerJsonFromComponentJson() {
  var BOWER_JSON = "bower.json";
  var COMPONENT_JSON = "component.json";

  var bower = JSON.parse(readIfExists(BOWER_JSON) || "{}");
  var component = JSON.parse(readFile(COMPONENT_JSON));

  bower.version = component.version;
  bower.name = component.repo.replace("/", "-");
  bower.main = component.name + ".js";

  if (!fs.existsSync(bower.main)) {
    throw new Error(bower.main + " does not exist!");
  }

  fs.writeFileSync(BOWER_JSON, JSON.stringify(bower, null, 2));
}
