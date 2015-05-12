	{{ ADD('valorsistema' + VALORES.ID + ' DTVLA.DVM_VALOR_SISTEMA.ID%type;', 'DECLARACIONES') }}
	select nvl(max(id),0)+1 into valorsistema{{ VALORES.ID }} from DTVLA.DVM_VALOR_SISTEMA;
	insert into DTVLA.DVM_VALOR_SISTEMA (ID, ID_SISTEMA, ID_ENTIDAD_CANONICA, ID_VALOR_CANONICO, VALOR_SISTEMA)
			values (valorsistema{{ VALORES.ID }},
					{% if EXIST(DECLARACIONES, 'sistema' + VALORES.ID_SISTEMA) %} sistema{{ VALORES.ID_SISTEMA}} {% else %} {{ VALORES.ID_SISTEMA }} {% endif %},
					{% if EXIST(DECLARACIONES, 'entidad' + VALORES.ID_ENTIDAD_CANONICA) %} entidad{{ VALORES.ID_ENTIDAD_CANONICA}} {% else %} {{ VALORES.ID_ENTIDAD_CANONICA }} {% endif %},
					{% if EXIST(DECLARACIONES, 'valorcanonico' + VALORES.ID_VALOR_CANONICO) %} valorcanonico{{ VALORES.ID_VALOR_CANONICO}} {% else %} {{ VALORES.ID_VALOR_CANONICO }} {% endif %},
					{{ VALORES.VALOR_SISTEMA }});