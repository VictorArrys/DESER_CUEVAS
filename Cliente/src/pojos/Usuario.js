class Usuario{
    //constructor
    constructor(idUsuario, nombreCompleto, estatus, tipo, contraseña, correo, telefono){
        this._idUsuario = idUsuario
        this._nombreCompleto = nombreCompleto
        this._estatus = estatus
        this._tipo = tipo
        this._contraseña = contraseña
        this._correo = correo
        this._telefono = telefono
    }

    //setters
    set idUsuario(idUsuario){
        this._idUsuario = idUsuario
    }
    set nombreCompleto(nombreCompleto){
        this._nombreCompleto = nombreCompleto
    }
    set estatus(estatus){
        this._estatus = estatus
    }
    set tipo(tipo){
        this._tipo = tipo
    }
    set contraseña(contraseña){
        this._contraseña = contraseña
    }
    set correo(correo){
        this._correo = correo
    }
    set telefono(telefono){
        this._telefono = telefono
    }

    //getters
    get idUsuario(){
        return this.idUsuario
    }
    get nombreCompleto(){
        return this.nombreCompleto
    }
    get estatus(){
        return this.estatus
    }
    get tipo(){
        return this.tipo
    }
    get contraseña(){
        return this._contraseña
    }
    get correo(){
        return this.correo
    }
    get telefono(){
        return this._telefono
    }
}