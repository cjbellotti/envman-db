ALTER SESSION SET CURRENT_SCHEMA=DTVLA;

DECLARE

BEGIN

	{{ %ACCIONES% }}
	
	COMMIT;
		DBMS_OUTPUT.Put_line ('Termino OK');
	EXCEPTION
   WHEN OTHERS
   THEN
      DBMS_OUTPUT.Put_line ('No se realizo ningun Insert.Error: ' || SQLERRM);

END;