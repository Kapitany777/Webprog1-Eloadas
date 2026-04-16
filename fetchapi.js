function printCinemas() {
    const cinemas = readCinemas();
    
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

function readCinemas() {
    return new Array();
}

function saveCinema() {

}

function editCinema() {
    
}

function deleteCinema() {
    
}
