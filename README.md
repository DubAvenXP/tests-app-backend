Añadir carpeta data en /src/database/postgres/data
No dar seguimiento a los archivos .env

Instrucciones para ejecutar migraciones:

    ## Generar Migraciones
        - npm run migrations:generate migration-name
    
    ## Ejecutar migración en desarrollo (docker)
        - docker-compose exec app npm run migrations:run:dev
    
    ## Ejecutar migración en staging
        - docker-compose exec app npm run migrations:run:stag

    ## Ejecutar migración en produccion
        - docker-compose exec app npm run migrations:run:prod

    ## Notas:
        1. El orden de creacion y eleminación de las tablas importa debido a sus relaciones.
