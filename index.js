const pg = require('pg');

const config = {
    user: 'valeriafuentealba',
    host: 'localhost',
    password: '',
    database: 'amusica',
};

const cliente = new pg.Client(config);
const argumentos = process.argv.slice(2);
const [funcion, nombre, rut, curso, nivel] = argumentos;

const getEstudiantes = async() => {
    const res = await cliente.query('SELECT * FROM client');
    console.log('Registro actual', res.rows);
};


const consultaRut = async(numeroRut) => {
    const res = await cliente.query(
        `SELECT * FROM client WHERE rut='${numeroRut}'`
    );
    console.log(res.rows);
};



const nuevoEstudiante = async(nNombre, nRut, nCurso, nNivel) => {
    await cliente.query(
        `INSERT INTO client values ('${nNombre}', '${nRut}', '${nCurso}', '${nNivel}')`
    );
    console.log(`Estudiante ${nNombre} agregado con éxito`);
};

const editEstudiante = async(editNombre, editRut, editCurso, editNivel) => {
    await cliente.query(
        `UPDATE client  SET nombre = '${editNombre}', '${editRut}', '${editCurso}', '${editNivel}')`
    );
    console.log(`Estudiante ${editNombre} ha sido editado con éxito`);
};

const eliminarEstudiante = async(deleteRut) => {
    await cliente.query(`DELETE FROM client WHERE nombre = '${deleteRut}'`);
    console.log(`Registro de estudiantes con rut ${deleteRut} ha sido eliminado con éxito`)
};


const test = async() => {
    cliente.connect();

    switch (funcion) {
        case 'consulta':
            await getEstudiantes();
            break;
        case 'rut':
            await consultaRut(argumentos[1]);
            break;
        case 'nuevo':
            await nuevoEstudiante(nombre, rut, curso, nivel);
            break;
        case 'editar':
            await editEstudiante(nombre, rut, curso, nivel);
            break;
        case 'eliminar':
            await eliminarEstudiante(argumentos[1]);
            break;
        default:
            console.log('No se reconoce la funcion');
    }
    cliente.end();
};

test();