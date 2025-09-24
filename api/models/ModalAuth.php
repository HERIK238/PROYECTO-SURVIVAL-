<?php
// Requiere la conexión a la base de datos
require_once __DIR__ . '/../core/DBConfig.php';

// Clase UserAuth
class User {
    private $db;

    // Crea una nueva instancia
    public function __construct() {
        $dbConfig = new DBConfig();
        $this->db = $dbConfig->getConnection();
    }

    // Busca un usuario por credenciales    
    public function findByCredentials($input) {
        try {
            if (filter_var($input, FILTER_VALIDATE_EMAIL)) {
                $sql = "SELECT * FROM users WHERE email = :input";
            } elseif (is_numeric($input)) {
                $sql = "SELECT * FROM users WHERE phone = :input";
            } else {
                $sql = "SELECT * FROM users WHERE username = :input";
            }

            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':input', $input, PDO::PARAM_STR);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Exception("Error al buscar usuario: " . $e->getMessage());
        }
    }

    // Inserta un nuevo usuario en la base de datos
    public function insertUser($data) {
        try {
            $sql = "INSERT INTO users 
                    (username, email, estado, password, rol, documento)
                    VALUES (:username, :email, :estado, :password, :rol, :documento)";

            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':username', $data['username'], PDO::PARAM_STR);
            $stmt->bindParam(':documento', $data['documento'], PDO::PARAM_STR);
            $stmt->bindParam(':email',    $data['email'],    PDO::PARAM_STR);
            $stmt->bindParam(':estado',   $data['estado'],   PDO::PARAM_STR);
            $stmt->bindParam(':password', $data['password'], PDO::PARAM_STR);
            $stmt->bindParam(':rol',      $data['rol'],      PDO::PARAM_STR);

            $stmt->execute();

            // Devuelve el id del nuevo registro insertado
            return $this->db->lastInsertId();

        } catch (PDOException $e) {
            throw new Exception("Error al insertar usuario: " . $e->getMessage());
        }
    }
}
?>
