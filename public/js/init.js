var EnvMan = {};
EnvMan.Models = {};
EnvMan.Collections = {};
EnvMan.Views = {};

window.models = {};
window.collections = {};
window.views = {};
window.generales = {};

window.job = {
	"job" : 123456789,
	"target" : "PROD",
	"proyecto" : "Proyecto de Prueba",
	"descripcion" : "Descripcion del proyecto de prueba",
	"registros" : {
		sistema : [
			{
				ID : 1, 
				PAIS : "AR",
				NOMBRE : "MR23",
				DESCRIPCION : "Descripcion de MR23"
			}
		],
		entidadcanonica : [
			{
				ID : 1,
				NOMBRE : "Entidad Canonica 1",
				DESCRIPCION : "Descripcion de entidad canonica 1"
			}
		],
		valorcanonico : [
			{
				ID : 1,
				"ID_ENTIDAD_CANONICA" : 1,
				DESCRIPCION : "Descripcion de Valor Canonico X",
				"VALOR_CANONICO" : "X"
			}
		],
		valorsistema : [
			{
				ID : 1,
				"ID_SISTEMA" : 1,
				"ID_VALOR_CANONICO" : 1,
				"ID_ENTIDAD_CANONICA" : 1,
				"VALOR_SISTEMA" : "Z"
			}
		]
	}
};

// Tablas

// pantallas

