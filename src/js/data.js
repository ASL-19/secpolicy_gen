function findAll(obj, key) {
    var output = {};
    if(obj.hasOwnProperty(key) && typeof obj[key] !== "undefined") {
        output["[" + key + "]"] = obj[key];
    } else {
        $.each(obj, function(index, prop) {
            if(prop !== null && typeof prop === "object") {
                output = findAll(prop, key);
            }
        });
    }
    return output;
}

function createTextInput(obj) {
    var output = "";
    $.each(obj.options, function(index, value) {
        var id = null;
        if(value.hasOwnProperty("id") && typeof value.id !== "undefined") {
            id = value.id;
        }
        if(id === null) {
            id = Math.random().toString(36).substring(7);
        }
        var title = "";
        if(value.hasOwnProperty("title") && typeof value.title !== "undefined") {
            title = value.title;
        }
        output += "<label for='" + 
            id + 
            "'>" + 
            title +
            "</label>" + 
            "<input type='text' class='form-control' required='true' id='" +
            id + 
            "'>" + 
            "</div>";
    }); 
    return output;
}

function createTextareaInput(obj) {
    var output = "";
    var title = "";
    if(obj.hasOwnProperty("title") && typeof obj.title !== "undefined") {
        title = obj.title;
    }
    output += "<label for='" + 
        obj.id + 
        "'>" + 
        title +
        "</label>" + 
        "<textarea class='form-control' required='true' rows='3' onchange='storeTextareaValue(this);' id='" +
        obj.id + 
        "' name='" +
        obj.id +
        "'></textarea>" + 
        "</div>";
    return output;
}

function createCheckboxInput(obj) {
    var output = "";
    $.each(obj.options, function(index, value) {
        output += "<div class='checkbox'>" +
            "<label><input type='checkbox' class='form-check' onclick='storeCheckboxValue(this);' name='" + 
            obj.id + 
            "' id='" + 
            value.id + 
            "' value='" + 
            value.value + 
            "'> " + 
            value.title + 
            "</label></div>";
    });
    return output;
}

function createRadioInput(obj) {
    var output = "";
    $.each(obj.options, function(index, value) {
        output += 
            "<div class='radio'><label>" +
            "<input type='radio' class='form-check' required='true' onclick='storeRadioValue(this);' name='" +
            obj.id + 
            "' id='" + 
            obj.id + 
            "' value='" + 
            value.value + 
            "'> " + 
            value.title + 
            "</label></div>";
    });
    return output;
}

function makeText(text) {
    return "<article>" + text + "</article>";
}

function makeInput(value) {
    var inputs = "";
    var input = "";
    $.each(value.inputs, function(index, value) {
        if(!value.hasOwnProperty('id') || value.id === "") {
            console.log("Input {" + value + "} does not have ID set");
            return null;
        }
        switch(value.type) {
        case "radio":
            input = "<div class='form-group'>";
            input += "<label>" + value.heading + "</label>";
            input += createRadioInput(value);
            input += "</div>";
            break;
        case "checkbox":
            input = "<div class='form-group'>";
            input += "<label>" + value.heading + "</label>";
            input += createCheckboxInput(value);
            input += "</div>";
            break;
        case "text":
            input = "<div class='form-group'>";
            input += "<label>" + value.heading + "</label>";
            input += createTextInput(value);
            input += "</div>";
            break;
        case "textarea":
            input = "<div class='form-group'>";
            input += "<label>" + value.heading + "</label>";
            input += createTextareaInput(value);
            input += "</div>";
            break;
        default:
            input = "";
            console.log("Input " + value.type + " is not defined!");
        }
        inputs += input;
        if(!window.secpol_inputs.hasOwnProperty(value.type)) {
            window.secpol_inputs[value.type] = "";
        }
        window.secpol_inputs[value.type] += input;
    });

    return inputs;
}

function createTextHTML(obj, title) {
    if(!obj.hasOwnProperty("text")) {
        console.log("Content object doesn't have text property");
        return;
    }
    var text = makeText(obj.text);

    fullText = "";
    if(text.length > 0) {
        fullText = "<div class='col-sm-10'>" +
                   text +
                   "</div>";
    } 
        
    var finalText = "<div class='container-fluid'>" +
            "<div class='row'>" +
                fullText +
            "</div>" +
        "</div>";

    return finalText;
}

function checkVariable(variable) {
    if(!window.hasOwnProperty("secpol_vars")) {
        return false;
    }

    if(window.secpol_vars.hasOwnProperty(variable) &&
       window.secpol_vars[variable] === true) {
        return true;
    }
    return false;
}

function createSecurityPolicy(accBaseId) {
    if(!window.hasOwnProperty("template")) {
        console.log("Template JSON is not loaded!");
        return;
    }
    secpol_text = "";
    $.each(window.template.sections, function(secKey, sec) {
        if(sec.hasOwnProperty("include") && sec.include !== "") {
            if(!checkVariable(sec.include)) {
                return true;
            }
        }
        var subSections = sec.subsections;
        $.each(subSections, function(index, subsec) {
            if(subsec.hasOwnProperty("include") && subsec.include !== "") {
                if(!checkVariable(subsec.include)) {
                    return true;
                }
            }
            $.each(subsec.content, function(index, content) {
                if(!content.hasOwnProperty("text")) {
                    return true;
                }
                if(content.hasOwnProperty("include") && content.include !== "") {
                    if(!checkVariable(content.include)) {
                        return true;
                    }
                }
                if(content.hasOwnProperty("variables") && content.variables.length > 0) {
                    $.each(content.variables, function(index, variable) {
                        var replacements = {};
                        if(window.secpol_subs.hasOwnProperty(variable.name)) {
                            replacements["["+variable.name+"]"] = window.secpol_subs[variable.name];
                        } else {
                            replacements = findAll(window.template, variable.name);
                        }
                        for(var key in replacements) {
                            if(replacements.hasOwnProperty(key)) {
                                content.text = content.text.replace(key, replacements[key]);
                            }
                        }
                    });
                }
                secpol_text += createTextHTML(content, "");
            });
        });
    });

    localStorage.setItem("secpol_fulltext", secpol_text);
}

function findAllInputs() {
    if(!window.hasOwnProperty("template")) {
        console.log("Template JSON is not loaded!");
        return;
    }
    if(window.template.hasOwnProperty("inputs")) {
        makeInput(window.template);
    }
    $.each(window.template.sections, function(secKey, sec) {
        var subSections = sec.subsections;
        makeInput(sec);
        $.each(subSections, function(index, value) {
            makeInput(value);
        });
    });
    $("#survey-radios").append(window.secpol_inputs.radio);
    $("#survey-checkboxes").append(window.secpol_inputs.checkbox);
    $("#survey-texts").append(window.secpol_inputs.text);
    $("#survey-texts").append(window.secpol_inputs.textarea);
}


function buildTemplate() {
    var template = "/data/template.json";
    $.getJSON(template)
        .done(function (json) {
            window.template = json;
            findAllInputs("gen-box-content");
            retrieveValues();
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request failed: " + err);
        });
}

function storeText(elemId, selector, type) {
    var values = {};
    $(elemId).find(selector).each(function () {
        values[this.name] = this.value;
        window.secpol_subs[this.name] = this.value;
    });
    values_str = JSON.stringify(values);
    localStorage.setItem("secpolgen_" + type, values_str);
}

function storeInputs(elemId, selector, type) {
    var values = {};
    $(elemId).find(selector).each(function () {
        if(!values.hasOwnProperty(this.name)) {
            values[this.name] = [];
        }
        values[this.name].push(this.value);
        if(type === "radio") {
            window.secpol_vars[this.name] = (this.value == "true");
        } else if(type === "checkbox") {
            window.secpol_vars[this.name + "." + this.value] = this.checked;
        } else {
            console.log("Type " + type + " is not defined");
        }
    });
    values_str = JSON.stringify(values);
    localStorage.setItem("secpolgen_" + type, values_str);
}

function getJSONInput(item) {
    values_str = localStorage.getItem(item);
    if(values_str === null) {
        return null;
    }
    try {
        values = JSON.parse(values_str);
    }
    catch(err) {
        console.log("Error parsing json for " + type + " in " + elemId + " (error=" + err + ")");
        return null;
    }
    return values;
}

function retrieveInputs(type) {
    values = getJSONInput("secpolgen_" + type);
    if(values === null) {
        return;
    }
    $.each(values, function(key, value) {
        if(value instanceof Array) {
            $.each(value, function(idx, val) {
                $("input[name='" + key + "'][value='" + val + "']").prop("checked", true);
            });
        } else {
            $("input[name='" + key + "'][value='" + value + "']").prop("checked", true);
        }
    });
}

function retrieveText(type) {
    values = getJSONInput("secpolgen_" + type);
    if(values_str === null) {
        return;
    }
    $.each(values, function(key, value) {
        $("textarea#" + key).val(value);
    });
}

function retrieveValues() {
    retrieveInputs("radio");
    retrieveInputs("checkbox");
    retrieveInputs("text");
    retrieveText("textarea");
}

function storeValues() {
    storeInputs("#survey-radios", "input:radio:checked", "radio");
    storeInputs("#survey-checkboxes", "input:checkbox:checked", "checkbox");
    storeInputs("#survey-texts", "input:text", "text");
    storeText("#survey-texts", "textarea", "textarea");
    createSecurityPolicy();
}

function getParameterByName(name, url) {
    if(!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if(!results) {
        return null;
    }
    if(!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function shareContent(how) {
    if(how === "print") {
        var printWindow = window.open();
        qp = "?print=true";
        printWindow.location.href = "/review.html" + qp;
    } else if(how === "pdf") {
        html = localStorage.getItem("secpol_fulltext");
        if(html === null) {
            console.log("Unable to find Security Policy text");
            return;
        }
        html2pdf(html,
            {
                margin:         [30, 20],
                filename:       "SecurityPolicy.pdf",
                image:          { type: "jpeg", quality: 0.98 },
                html2canvas:    { dpi: 192, letterRendering: true },
                jsPDF:          { unit: "mm", format: "a4", orientation: "portrait", pagesplit: true }
            });
    }
}
