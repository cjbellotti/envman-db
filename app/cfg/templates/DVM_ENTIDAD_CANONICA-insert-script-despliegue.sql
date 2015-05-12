	{{ ADD('entidad'  + VALORES.ID + ' DTVLA.DVM_ENTIDAD_CANONICA.ID%type;', 'DECLARACIONES') }}
	select nvl(max(id),0)+1 into entidad{{ VALORES.ID }} from DTVLA.DVM_ENTIDAD_CANONICA;
	insert into {{ TABLA }} (ID, NOMBRE, DESCRIPCION) values  (entidad{{ VALORES.ID }} , {{ VALORES.NOMBRE }}, {{ VALORES.DESCRIPCION }});