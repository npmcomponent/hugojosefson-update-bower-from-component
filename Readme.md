
# update-bower-from-component

  Updates or creates `bower.json` based on `repo`, `version` and `main` in `component.json`.

  This is so that you can maintain your [component](https://github.com/component/component) configuration in the
  `component.json` file, and also easily make it available for Bower consumption.

  Note that this is probably only useful for projects where the following are true:

  * You want your Bower package to be *githubUsername-githubRepo*.
  * The `main` entry in your `component.json` should be the `main` entry of your `bower.json`.
  * The `main` entry file is useful for inclusion in HTML with a simple `<script/>` tag.

  Typically this would be a AngularJS module, where the `main` entry file registers the AngularJS module.

  See [image-url-for-angular](https://github.com/hugojosefson/image-url-for-angular) for an example of this setup.

## Installation

    $ component install hugojosefson/update-bower-from-component

## Example usage in Makefile

This is from [image-url-for-angular](https://github.com/hugojosefson/image-url-for-angular)'s `Makefile`.

    all: build bower.json

    build: components index.js
      @component build --dev

    components: component.json
      @component install --dev

    bower.json: components component.json
      @node components/hugojosefson-update-bower-from-component/bin/update-bower-from-component

    clean:
      rm -fr build components

    .PHONY: clean components build

Required `development` dependency declaration in `component.json` for the above to work:

    "development": {
      "hugojosefson/update-bower-from-component": "0.1.0"
    }

## API

Updates or creates `bower.json` based on what's in `component.json`:

    require("update-bower-from-component")();

## License

  MIT
