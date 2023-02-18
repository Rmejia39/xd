Vue.component('component-alumno',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            docentes: [],
            docente:{
                idDocente : '',
                codigo : '',
                nombre : '',
            }
        }
    },
    methods:{
        guardarAlumno(){
            this.listarAlumnos();
            if(this.accion==='nuevo'){
                this.alumno.idAlumno = new Date().getTime().toString(16);
                this.alumnos.push( JSON.parse( JSON.stringify(this.alumno) ) );
            }else if(this.accion==='modificar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos[index] = JSON.parse( JSON.stringify(this.alumno) );
            }else if(this.accion==='borrar'){
                let index = this.alumnos.findIndex(alumno=>alumno.idAlumno==this.alumno.idAlumno);
                this.alumnos.splice(index,1);
            }
            localStorage.setItem("alumnos", JSON.stringify(this.alumnos) );
            this.nuevoAlumno();
        },
        eliminarAlumno(alumno){
            if( confirm(`Esta seguro de eliminar a ${alumno.nombre}?`) ){
                this.accion='eliminar';
                this.alumno=alumno;
                this.guardarAlumno();
            }
        },
        nuevoAlumno(){
            this.accion = 'nuevo';
            this.alumno.idAlumno = '';
            this.alumno.codigo = '';
            this.alumno.nombre = '';
        },
        modificarAlumno(alumno){
            this.accion = 'modificar';
            this.alumno = alumno;
        },
        listarAlumnos(){
            this.alumnos = JSON.parse( localStorage.getItem('alumnos') || "[]" )
                .filter(alumno=>alumno.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE ALUMNO</div>
                    <div class="card-body">
                        <form id="frmAlumno" @reset.prevent="nuevoAlumno" v-on:submit.prevent="guardarAlumno">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoAlumno">CODIGO:</label>
                                </div>
                                <div class="col-3 col-md-3">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de alumno de 3 digitos"
                                            v-model="alumno.codigo" type="text" class="form-control" name="txtCodigoAlumno" id="txtCodigoAlumno">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtNombreAlumno">NOMBRE:</label>
                                </div>
                                <div class="col-9 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="alumno.nombre" type="text" class="form-control" name="txtNombreAlumno" id="txtNombreAlumno">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">LISTADO DE ALUMNOS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listarAlumnos()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>CODIGO</th>
                                    <th colspan="2">NOMBRE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="alumno in alumnos" :key="alumno.idAlumno" @click="modificarAlumno(alumno)" >
                                    <td>{{ alumno.codigo }}</td>
                                    <td>{{ alumno.nombre }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarAlumno(alumno)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});