<?php
require_once "Database.php";
class User
{
    private $db;
    public function __construct()
    {
        $this->db = (new Database())->connect();
    }
    public function add($data)
    {
        $sql = "INSERT INTO `users`(`firstname`, `lastname`, `email`, `password`, `created_at`) VALUES (:firstname,:lastname,:email,:password, NOW())";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':firstname' => $data["firstname"], ':lastname' => $data["lastname"], ':email' => $data["email"], ':password' => $data["password"]]);
    }
    public function getAll()
    {
        $sql = "SELECT * FROM users";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getInfo($id)
    {
        $sql = 'SELECT * FROM users WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getInfoForAdmin($id)
    {
        $sql = 'SELECT id, firstname, lastname, email FROM users WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function update($data, $bools = ["firstname" => false, "lastname" => false, "email" => false])
    { //$bools para indicar que modificar y no crear un metodo para cada campo (seguro lo cambio despues)
        $sql = "UPDATE users SET firstname = :firstname, lastname = :lastname, email = :email WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':firstname' => ($bools['firstname'] ? $data['firstname'] : 'firstname'),
            ':lastname' => ($bools['lastname'] ? $data['lastname'] : 'lastname'),
            ':email' => ($bools['email'] ? $data['email'] : 'email'),
            ':id' => $data['id']
        ]);
    }
    public function delete($id, $porsilasdudas = false)
    {
        if ($porsilasdudas) {
            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);
        }
    }
}
