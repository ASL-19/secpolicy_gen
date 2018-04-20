# Security Policy Generator JSON file Specifications

The Security Policy Generator JSON file contains all the information required to create the template for Security Policy generation. In order to facilitate the usage and ease of modification we used of JSON file format. JSON is both readable/writable by non-tech savvies and tech savvies as well as easy to integrate into the code. The file represents a template for a general security policy with place holders for variables that change based on the use case. The structure of the file is based on the following assumptions:

The hierarchy of the sections is limited to two (2) layers, namely sections and subsections.
Content text contains limited number of variables to substitute, which are provided by the JSON file or by the user.
Each section will be represented as a page with subsections in collapsible paragraphs.

## JSON object
The JSON object includes the following properties/objects:
* List of properties (key, value) that are variables in the templates, for example *org_name*, *org_execdir*, *org_opsdir*, *staff_secpol*
* List of inputs (radio buttons, checkbox inputs, textboxes and textareas), which represent inputs that asks the user for their inputs to replace the corresponsing variables in the templates
* "sections" : list : contains a list of section objects for the policy

## Input object:
* "id" : string : ID to distinguish this input from other inputs, shall be a unique name
* "type" : string : Different type of supported inputs "[text|radio|checkbox]"
* "value" : string : The default value for the input
* "heading" : string : Heading to be shown on the input
* "options" : list : List of option objects for radio buttons or checkboxes

### Option object:
* "id" : string : ID to distinguish this input option, shall be a unique name
* "title" : string : Title for this option
* "value" : number : value for this option

## Section object:
* "order" : number : order to show this section on the page
* "id" : string : ID to distinguish this section from other sections, shall be a unique name
* "name" : string : Name of the section
* "subsections" : list : list of subsection objects for this section

### Subsection object:
* "order" : number : order to show this subsection on the page
* "id" : string : ID to distinguish this subsection from other subsections, shall be a unique name
* "title" : string : Title of the subsection
* "heading" : string : Heading for the whole subsection contents
* "include" : string : Whether to include this subsection in the generated policy or not. It contains the ID of the field that dictates the inclusion. In case it is empty the subsection is included regardless. In order to remove the subsection the field's value should be "false".
* "inputs" : list : List of inputs to present to user
* "content" : list : List of content objects for each subsection

#### Content object:
* "text" : string : text of the security policy template
* "variables" : list : list of the variable objects in the text
* "include": string : Whether to include this text in the generated policy or not. It contains the ID of the field that dictates the inclusion. In case it is empty the subsection is included regardless. In order to remove the subsection the field's value should be "false".

##### Variable object:
  * "name" : string : name of the variable as it shows up in the text
  * "type" : string : type of the variable being string, number, etc.

```json
{
    "org_name": "",
    "org_execdir": "",
    "org_opsdir": "",
    "staff_secpol": "",
    "inputs":
        [
            {
            "id": "operating_systems",
            "type": "checkbox",
            "value": "",
            "heading": "What operating systems exist?",
            "options" :
                [
                    {
                    "id": "",
                    "title": "Mac OS",
                    "value": "mac_os"
                    },
                    {
                    "id": "",
                    "title": "Windows",
                    "value": "windows"
                    },
                    {
                    "id": "",
                    "title": "Linux",
                    "value": "linux"
                    },
                    {
                    "id": "",
                    "title": "iOS",
                    "value": "ios"
                    },
                    {
                    "id": "",
                    "title": "Android",
                    "value": "android"
                    }
                ]
            },
            {
            "id": "services",
            "type": "checkbox",
            "value": "",
            "heading": "What Services are being used in your company?",
            "options" :
                [
                    {
                    "id": "",
                    "title": "Service A",
                    "value": "service_a"
                    },
                    {
                    "id": "",
                    "title": "Service B",
                    "value": "service_b"
                    },
                    {
                    "id": "",
                    "title": "Service C",
                    "value": "service_c"
                    },
                    {
                    "id": "",
                    "title": "Service D",
                    "value": "service_d"
                    },
                    {
                    "id": "",
                    "title": "Service E",
                    "value": "service_e"
                    },
                    {
                    "id": "",
                    "title": "Service F",
                    "value": "service_f"
                    }
                ]
            }
        ],
    "operating_systems": [],
    "sections" : [
        {
        "order": 1,
        "id" : "security_policy",
        "name" : "Create Security Policy",
        "subsections" :
            [
                {
                "order" : 1,
                "id": "purpose",
                "title" : "Purpose",
                "heading": "The purpose",
                "include" : "",
                "inputs": [],
                "content" :
                    [
                        {
                        "text":"This document outlines [org_name]’s Security Policy and Strategy and it is meant to ensure the Digital and Physical security of [org_name] and its members.",
                        "variables":
                            [
                                {
                                "name": "org_name",
                                "type": "text"
                                }
                            ]
                        },
                        {
                        "text":"Our intention for [org_name]’s Security Policy and Strategy is not to impose restrictions that are contrary to our established culture of openness, trust and integrity. We are committed to protecting [org_name]’s employees, partners and the company.",
                        "variables":
                            [
                                {
                                "name": "org_name",
                                "type": "text"
                                }
                            ]
                        },
                        {
                        "text":"Effective security is a team effort involving the participation and support of every employee and affiliate who deals with information and/or information systems. It is the responsibility of every individual to know these guidelines, and to conduct their activities accordingly.",
                        "variables": []
                        },
                        {
                        "text":"In short, the primary purpose of this policy is: to preserve [org_name]’s security, i.e. the preservation of confidentiality, integrity and availability of [org_name]’s information assets, to ensure that [org_name] complies with contractual and legal requirements, and to prevent damage to [org_name]’s reputation",
                        "variables":
                            [
                                {
                                "name": "org_name",
                                "type": "text"
                                }
                            ]
                        }
                    ]
                },
                {
                "order" : 2,
                "id": "staff_relevance",
                "title" : "Staff Relevance",
                "heading": "",
                "include" : "apply_to_staff",
                "inputs":
                    [
                        {
                        "id" : "apply_to_staff",
                        "type" : "radios",
                        "value" : "",
                        "heading" : "Does this apply to all staff?",
                        "options" :
                            [
                                {
                                "id" : 1,
                                "title" : "Yes",
                                "value" : 1
                                },
                                {
                                "id" : 2,
                                "title" : "No",
                                "value" : 2
                                }
                          ],
                        }
                    ], 
                "content" :
                    [
                        {
                        "text" : "The policy applies to all staff, whether directly or indirectly employed or otherwise under the control of [org_name].",
                        "variables":
                            [
                                {
                                "name": "org_name",
                                "type": "text"
                                }
                            ]
                        },
                        {
                        "text" : "All employees, contractors, consultants, temporary, and other workers are responsible for exercising good judgment regarding appropriate use of information, electronic devices, and network resources in accordance with policies and standards, and local laws and regulation.",
                        "variables": []
                        },
                        {
                        "text": "This section should appear if the user is using Service A",
                        "include": "services.service_a"
                        },
                        {
                        "text": "This section should appear if the user is using Service B",
                        "include": "services.service_b"
                        },
                        {
                        "text": "This section should appear if the user is using Service C",
                        "include": "services.service_c"
                        },
                        {
                        "text": "This section should appear if the user is using Service D",
                        "include": "services.service_d"
                        },
                        {
                        "text": "This section should appear if the user is using Service E",
                        "include": "services.service_e"
                        },
                        {
                        "text": "This section should appear if the user is using Service F",
                        "include": "services.service_f"
                        }
                    },

                    ]
                }
            ]
        }
    ]
}
```
