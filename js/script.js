const $d = document;
const $selectProvincias = $d.getElementById("selectProvincias");
const $selectMunicipios = $d.getElementById("selectMunicipios");
const $selectLocalidades = $d.getElementById("selectLocalidades");
const $btnElegir = $d.getElementById("btnElegir");

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

        if(json.municipios.length === 0) {
            $options = `<option value="${provincia}">No hay municipios disponibles</option>`;
        }

        $selectMunicipios.innerHTML = $options;
        $selectLocalidades.innerHTML = `<option value="Elige una localidad">Elige una localidad</option>`;
        verificarSeleccion();
    })
}

$selectProvincias.addEventListener("change", e => {
    municipio(e.target.value);
    $selectMunicipios.innerHTML = `<option value="Elige un municipio">Cargando...</option>`;
    $selectLocalidades.innerHTML = `<option value="Elige una localidad">Elige una localidad</option>`;
    verificarSeleccion();
})

function localidad(municipio) {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${municipio}&max=30`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let $options = `<option value="Elige una localidad">Elige una localidad</option>`;

        json.localidades.sort((a, b) => a.nombre.localeCompare(b.nombre));
        json.localidades.forEach(item => $options += `<option value="${item.id}">${item.nombre}</option>`);
        
        $selectLocalidades.innerHTML = $options;
        verificarSeleccion();
    })
}

$selectMunicipios.addEventListener("change", e => {
    localidad(e.target.value);
    verificarSeleccion();
    console.log(e.target.value)
})

$selectLocalidades.addEventListener("change", verificarSeleccion);

function verificarSeleccion() {
    if ($selectMunicipios.value !== "Elige un municipio" && $selectMunicipios.value !== "No hay municipios disponibles" && $selectLocalidades.value !== "Elige una localidad") {
        $btnElegir.disabled = false;
    } else {
        $btnElegir.disabled = true;
    }
}

$btnElegir.addEventListener("click", () => {
    const provincia = $selectProvincias.options[$selectProvincias.selectedIndex].text;
    const municipio = $selectMunicipios.options[$selectMunicipios.selectedIndex].text;
    const localidad = $selectLocalidades.options[$selectLocalidades.selectedIndex].text;

    const url = `result.html?provincia=${provincia}&municipio=${municipio}&localidad=${localidad}`;
    window.location.href = url;
});
