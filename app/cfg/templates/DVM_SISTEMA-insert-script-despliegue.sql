	sistema{{ %ID% }} := (select nvl(max(id),0)+1 from DTVLA.DVM_SISTEMA);
	insert into {{ %TABLA% }} (ID, NOMBRE, DESCRIPCION, PAIS) values  (sistema{{ %ID% }} , {{ %NOMBRE% }}, {{ %DESCRIPCION% }});