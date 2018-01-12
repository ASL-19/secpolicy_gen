# Security Policy Generator JSON file Specifications

The Security Policy Generator JSON file contains all the information required to create the template for Security Policy generation. In order to facilitate the usage and ease of modification we used of JSON file format. JSON is both readable/writable by non-tech savvies and tech savvies as well as easy to integrate into the code. The file represents a template for a general security policy with place holders for variables that change based on the use case. The structure of the file is based on the following assumptions:

The hierarchy of the sections is limited to two (2) layers, namely sections and subsections.
Content text contains limited number of variables to substitute, which are provided by the JSON file or by the user.
Each section will be represented as a page with subsections in collapsible paragraphs.

The JSON object includes the following properties/objects:
* "org_name" : string : default name of the organization
* "sections" : list : contains a list of section objects for the policy
  * "order" : number : order to show this section on the page
  * "id" : string : ID to distinguish this section from other sections, shall be a unique name
  * "title" : string : Title of the section
  * "subsections" : list : list of subsections for this section
    * "order" : number : order to show this subsection on the page
    * "id" : string : ID to distinguish this subsection from other subsections, shall be a unique name
    * "title" : string : Title of the subsection
    * "heading" : string : Heading for the whole subsection contents
    * "include" : string : Whether to include this subsection in the generated policy or not. It contains the ID of the field that dictates the inclusion, and if empty it includes it anyway
    * "inputs" : list : List of inputs to present to user
      * "id" : string : ID to distinguish this input from other inputs, shall be a unique name
      * "type" : string : Different type of supported inputs "[text|radios|checkboxes]"
      * "value" : string : The default value for the input
      * "heading" : string : Heading to be shown on the input
      * "options" : list : List of options for radio buttons or checkboxes
        * "id" : string : ID to distinguish this input option, shall be a unique name
        * "title" : string : Title for this option
        * "value" : number : value for this option
    * "content" : list : List of content objects for each subsection
      * "text" : string : text of the security policy template
      * "variables" : list : list of the variables in the text
        * "name" : string : name of the variable as it shows up in the text
        * "type" : string : type of the variable being string, number, etc.
