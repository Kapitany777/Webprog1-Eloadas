let selectedIndex = null;

let cinemas = new Array();

cinemas.push({ mozinev: "A38 Hajó", irszam: "1113", cim: "Petőfi híd budai hídfő", telefon: "4643940" });
cinemas.push({ mozinev: "Bárka Kikötő a Ráday utcában", irszam: "1092", cim: "Ráday utca", telefon: "" });

function printCinemas() {
    const table = document.getElementById("cinemalist").getElementsByTagName('tbody')[0];

    table.innerHTML="";
    
    for (i = 0; i < cinemas.length; i++) {
        let newRow = table.insertRow(table.length);

        cell1 = newRow.insertCell(0);
        cell1.innerHTML = cinemas[i].mozinev;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = cinemas[i].irszam;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = cinemas[i].cim;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = cinemas[i].telefon;
        cell4 = newRow.insertCell(4);

        cell4.innerHTML = '<a onClick="onEdit(' + i + ')">Edit</a>' + '<a onClick="onDelete(' + i + ')">Delete</a>';
    }
}

function onFormSubmit() {
    if (validate()) {
        let formData = readFormData();

        if (selectedIndex == null) {
            insertNewRecord(formData);
        }
        else {
            updateRecord(formData);
        }

        resetForm();
    }
}

function validate() {
    isValid = true;

    if (document.getElementById("mozinev").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    }
    else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide")) {
            document.getElementById("nameValidationError").classList.add("hide");
        }
    }

    return isValid;
}

function resetForm() {
    document.getElementById("mozinev").value = "";
    document.getElementById("irszam").value = "";
    document.getElementById("cim").value = "";
    document.getElementById("telefon").value = "";

    selectedIndex = null;
}

function readFormData() {
    let formData = {};

    formData["mozinev"] = document.getElementById("mozinev").value;
    formData["irszam"] = document.getElementById("irszam").value;
    formData["cim"] = document.getElementById("cim").value;
    formData["telefon"] = document.getElementById("telefon").value;

    return formData;
}

function insertNewRecord(data) {
    cinemas.push({ "mozinev": data.mozinev, "irszam": data.irszam, "cim": data.cim, "telefon": data.telefon });
    
    printCinemas();
}

function onEdit(index) {
    document.getElementById("mozinev").value = cinemas[index].mozinev;
    document.getElementById("irszam").value = cinemas[index].irszam;
    document.getElementById("cim").value = cinemas[index].cim;
    document.getElementById("telefon").value = cinemas[index].telefon;

    selectedIndex = index;
}

function updateRecord(formData) {
    cinemas[selectedIndex].mozinev = formData.mozinev;
    cinemas[selectedIndex].irszam = formData.irszam;
    cinemas[selectedIndex].cim = formData.cim;
    cinemas[selectedIndex].telefon = formData.telefon;

    printCinemas();
}

function onDelete(index) {
    if (confirm('Biztosan törli ezt a rekordot?')) {
        cinemas.splice(index, 1);
        resetForm();
        printCinemas();
    }
}
