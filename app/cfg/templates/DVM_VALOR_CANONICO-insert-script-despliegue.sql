	{{ ADD('valorcanonico' + VALORES.ID + ' DTVLA.DVM_VALOR_CANONICO.ID%type;', 'DECLARACIONES') }}
	select nvl(max(id),0)+1 into valorcanonico{{ VALORES.ID }} from DTVLA.DVM_VALOR_CANONICO;
	insert into {{ TABLA }} (ID, ID_ENTIDAD_CANONICA, VALOR_CANONICO, DESCRIPCION) values (valorcanonico{{ VALORES.ID }}, 
																							{% if EXIST(DECLARACIONES, 'entidad' + VALORES.ID_ENTIDAD_CANONICA) %} entidad{{ VALORES.ID_ENTIDAD_CANONICA}} {% else %} {{ VALORES.ID_ENTIDAD_CANONICA }} {% endif %},
																							{{ VALORES.VALOR_CANONICO }},
																							{{ VALORES.DESCRIPCION }});