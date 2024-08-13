const $d = document;
const $selectProvincias = $d.getElementById("selectProvincias");
const $selectMunicipios = $d.getElementById("selectMunicipios");
const $selectLocalidades = $d.getElementById("selectLocalidades");

function provincia() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Elige una provincia">Elige una provincia</option>`;

        json.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
        json.provincias.forEach(item => $options += `<option value="${item.id}">${item.nombre}</option>`);
        

        $selectProvincias.innerHTML = $options;
    })
}

$d.addEventListener("DOMContentLoaded", provincia)

function municipio(provincia) {
    fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&max=135`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Elige un municipio">Elige un municipio</option>`;

        json.municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));
        json.municipios.forEach(item => $options += `<option value="${item.id}">${item.nombre}</option>`);
        

        $selectMunicipios.innerHTML = $options;
    })
}

$selectProvincias.addEventListener("change", e => {
    municipio(e.target.value);
    console.log(e.target.value)
})

function localidad(municipio) {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}&max=30`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Elige una localidad">Elige una localidad</option>`;

        json.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
        json.localidades.forEach(item => $options += `<option value="${item.id}">${item.nombre}</option>`);
        
        $selectLocalidades.innerHTML = $options;
    })
}

$selectMunicipios.addEventListener("change", e => {
    localidad(e.target.value);
    console.log(e.target.value)
})