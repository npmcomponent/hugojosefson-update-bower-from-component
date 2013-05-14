
# update-bower-from-component

  Updates or creates `bower.json` based on `name`, `repo` and `version` in `component.json`.

  This is so that you can maintain your [component](https://github.com/component/component) configuration in the
  `component.json` file, and also easily make it available for Bower consumption.

  Note that this is probably only useful for projects where the following are true:

  * You want your Bower package to be *githubUsername-githubRepo*.
  * There is a single `.js` file in the root of the project, named like the component.
  * The single `.js` file is what should be the primary endpoint of the Bower package.
  * The single `.js` file is useful for inclusion in HTML with a simple `<script/>` tag.

  Typically this would be a AngularJS module, where the single `.js` file registers the AngularJS module. Then there
  might also be an `index.js` generated from the single `.js` file, using
  [uncomponent-wrapper](https://github.com/hugojosefson/uncomponent-wrapper).
  See [image-url-for-angular](https://github.com/hugojosefson/image-url-for-angular) for an example of
  this setup.

## Installation

    $ component install hugojosefson/update-bower-from-component

## Example usage in Makefile

This is from [image-url-for-angular](https://github.com/hugojosefson/image-url-for-angular)'s `Makefile`.

    all: build bower.json

    build: components index.js
      @component build --dev

    components: component.json
      @component install --dev

    index.js: components image-url-for-angular.js
      @node components/hugojosefson-uncomponent-wrapper/bin/uncomponent-wrapper image-url-for-angular.js index.js

    bower.json: components component.json
      @node components/hugojosefson-update-bower-from-component/bin/update-bower-from-component

    clean:
      rm -fr build components index.js

    .PHONY: clean components build

Required `development` dependency declaration in `component.json` for the above to work:

    "development": {
      "hugojosefson/uncomponent-wrapper": "0.0.2",
      "hugojosefson/update-bower-from-component": "0.0.2"
    }

## API

Updates or creates `bower.json` based on what's in `component.json`:

    require("update-bower-from-component")();

## License

  MIT
