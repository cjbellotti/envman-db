	{{ %ADD(valorcanonico{{ %ID% }} DTVLA.DVM_VALOR_CANONICO.ID%type;, DECLARACIONES)% }}
	select nvl(max(id),0)+1 into valorcanonico{{ %ID% }} from DTVLA.DVM_VALOR_CANONICO;
	insert into {{ %TABLA% }} (ID, ID_ENTIDAD_CANONICA, VALOR_CANONICO, DESCRIPCION) values  (valorcanonico{{ %ID% }}, {{ %(entidad10.*:=) ? entidad10 : {{ %ID_ENTIDAD_CANONICA% }}% }}, {{ %VALOR_CANONICO% }}, {{ %DESCRIPCION% }});