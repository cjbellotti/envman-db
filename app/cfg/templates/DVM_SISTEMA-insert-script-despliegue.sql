	{{ ADD('sistema'  + VALORES.ID + ' DTVLA.DVM_ENTIDAD_CANONICA.ID%type;', 'DECLARACIONES') }}
	select nvl(max(id),0)+1 into sistema{{ VALORES.ID }} from DTVLA.DVM_SISTEMA;
	insert into {{ TABLA }} (ID, NOMBRE, DESCRIPCION, PAIS) values  ({{ VALORES.ID }}, {{ VALORES.NOMBRE }}, {{ VALORES.DESCRIPCION }});