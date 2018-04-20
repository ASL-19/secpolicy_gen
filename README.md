# Security Policy Generator
================================================================================

## SETUP:
  * You need to provide Security Policy template as a json file in */data/template.json*.
    For more information check TEMPLATE.md 
    
### Installation
  * Install [npm](https://www.npmjs.com/get-npm)
  * Install npm dependencies

    ```bash
    npm install
    ```
  * Install code dependencies using *bower*
    ```bash
    bower install
    ```
  * Run gulp to create the artifacts
    ```bash
    gulp build
    ```
  * Copy the artifacts files from *web* directory to your destination
    

### Development:
  * Install [npm](https://www.npmjs.com/get-npm)
  * Install development dependencies

    ```bash
    npm install --dev
    ```
  * Run gulp to create the artifacts
    ```bash
    gulp build
    ```
  * You can run gulp also to watch for changes in the source file and copy them to
    artifact directory *web*.
    ```bash
    gulp
    ```
  * You can run browser-sync in artifact directory *web* to see the changes live.
    ```bash
    browser-sync start --server --files "**/*"
    ```
