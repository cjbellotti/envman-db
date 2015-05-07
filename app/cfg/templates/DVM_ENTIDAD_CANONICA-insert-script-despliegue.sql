	{{ %ADD(entidad{{ %ID% }} DTVLA.DVM_ENTIDAD_CANONICA.ID%type;, DECLARACIONES)% }}
	select nvl(max(id),0)+1 into entidad{{ %ID% }} from DTVLA.DVM_ENTIDAD_CANONICA;
	insert into {{ %TABLA% }} ({{ %CAMPOS% }}) values  (entidad{{ %ID% }} , {{ %NOMBRE% }}, {{ %DESCRIPCION% }});