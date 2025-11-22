# CloudContacts (Agenda de Contactos en la Nube)

Paso 1:Creación y configuración de la instancia EC2 en AWS
Primero vamos a crear dos instancia EC2 en AWS utilizando una imagen de Ubuntu, que será el sistema operativo donde trabajaremos.
Luego configuramos el grupo de seguridad para permitir el acceso por los puertos 80 (HTTP), que se usa para las páginas web, y 22 (SSH), que nos servirá para conectarnos desde la terminal.
Después descargamos y asignamos un par de claves SSH, que nos permitirá ingresar de forma segura a la instancia.

Una vez creada las dos instancias nos dirigimos al panel  izquierdo a la seccion de Red y Seguridad; buscamos la opción  “Direcciones de IP estática”, ingresamos y nos deberá aparecer un botón naranja que nos dirá asociar ip estática. Nos dará la opción de elegir cualquier instancia, le daremos a la del proyecto que estamos creando. Automáticamente la ip cambiará.


Finalmente, nos conectamos a la instancia mediante SSH, utilizando el archivo de clave privada que descargamos anteriormente. Para el caso de la la instancia que está asociada con la ip elástica, se le configuración la conexión de la siguiente manera: 
ssh -i "CloudContacts-wp.pem" ubuntu@100.30.62.47


Paso 4:Creación del proyecto cloudContacts
En este paso abriremos visual y empezaremos a crear nuestro entorno y estructura de carpetas para el proyecto. Procedimiento importante crear dos archivos uno para la configuración de  conexión a la base de datos y el otro de archivos de requerimientos para descargar más rápido dependencias y paquetes que usemos en el proyecto.

También instalamos tailwind versión 4 que utiliza la carpeta output:

Paso 3:Instalación del entorno y Clonación del proyecto Flask
Luego actualizamos el sistema para asegurarnos de tener todo al día y evitar errores; clonamos nuestro repo en donde ya tenemos el proyecto creado y aquí ya empezaremos a crear nuestro entorno venv.
Comandos utilizados:
sudo apt update && sudo apt full-upgrade -y
sudo apt update && sudo apt install -y git python3 python3-venv python3-pip
git clone https://<TOKEN>@github.com/<tu-usuario>/<tu-repo>.git
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
Paso 4:Verifica que el puerto 5200 esté abierto en AWS
Para que el proyecto corra desde una instancia hay que configurar sus reglas de entrada, así que abrimos todo el tráfico y creamos una personalizada.


En nuestro app.py tambien tenga nos aseguraremos de que tengas:
app.run(host='0.0.0.0', port=5000, debug=True)

Paso 5: Actualizar el sistema (en la instancia que será servidor MySQL)
Primero empezaremos instando la nuevas actualizaciones para poder ejecutar comandos sin errores , y procederemos a instalar mysql.
sudo apt update
sudo apt upgrade -y
sudo apt install mysql-server -y
sudo systemctl status mysql --no-pager

1) Configurar MySQL para permitir conexiones remotas (editar bind-address)
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
En ese archivo que se nos abrira buscaremos la linea bind-address = 127.0.0.1  y la remplazaremos por esta bind-address = 0.0.0.0
sudo systemctl restart mysql

2) Crear base de datos y usuario dedicado (desde el servidor MySQL)
sudo mysql -u root -p
CREATE DATABASE cloudcontacts_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'appuser'@'172.31.67.153' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON cloudcontacts_db.* TO 'appuser'@'172.31.67.153';
FLUSH PRIVILEGES;
EXIT
sudo apt install python3-dev default-libmysqlclient-dev build-essential -y
pip install mysqlclient
Paso 6: Creación de tabla y  Configuracion de .env en Flask
En este paso procederemos a crear nuestra tabla, con los datos que estamos pidiendo desde nuestro formulario. Primero ejecutaremos este comando para conectarse a un servidor MySQL remoto. 
mysql -h 172.31.73.58 -u appuser -p

Ingresamos a nuestra base de datos y crearemos nuestra tabla de la siguiente manera:
mysql> USE cloudcontacts_db;
Database changed
mysql> SHOW TABLES;
Empty set (0.01 sec)

mysql> CREATE TABLE contacts (
    ->     id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100),
    ->     email VARCHAR(100),
    ->     phone VARCHAR(50),
    ->     address TEXT,
TIMESTAMP
);
    ->     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -> );
Query OK, 0 rows affected (0.08 sec)

Visualizamos nuestra tabla creada, para corroborar que se haya creado bien.
mysql> SHOW TABLES;
+----------------------------+
| Tables_in_cloudcontacts_db |
+----------------------------+
| contacts                   |
+----------------------------+
1 row in set (0.00 sec)

Ahora ingresamos a nuestro archivo .env con el nano y lo configuraremos con las credenciales que usamos para crear nuestra base de datos.

Guardamos y cerramos todo con un ctrl o, enter y ctrl x; y ejecutamos el siguiente comando para que corra nuestro proyecto flask.
sudo systemctl status flask

Hacemos la consulta de la tabla contacts para visualizar que los datos si se están guardando.

mysql> SHOW TABLES;
+----------------------------+
| Tables_in_cloudcontacts_db |
+----------------------------+
| contacts                   |
+----------------------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM contacts;
+----+----------------------------------+----------------------------------+-----------+---------+---------------------+
| id | name                             | email                            | phone     | address | created_at          |
+----+----------------------------------+----------------------------------+-----------+---------+---------------------+
|  1 | Lucia del Carmen Sanchez Miranda | lucia.sanchez@vallegrande.edu.pe | 910497027 | NULL    | 2025-11-22 05:05:05 |
|  2 | Juana Perez                      | juana@vallegrande                | 910497027 | NULL    | 2025-11-22 05:14:29 |
+----+----------------------------------+----------------------------------+-----------+---------+---------------------+
2 rows in set (0.00 sec)

mysql>




