<?php
require_once "Database.php";
class Product
{
    private $db;
    public function __construct()
    {
        $this->db = (new Database())->connect();
    }
    public function add($data)
    {
        $sql = "INSERT INTO `products`( `name`, `descr`, `image_url`, `stock`, `price`, `created_at`, `category_id`) VALUES (:name, :descr, :path, :stock, :price, NOW(), :category)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':name' => $data["name"], ':descr' => $data["descr"], ':path' => $data["path"], ':stock' => $data["stock"], ':price' => $data["price"], ':category' => $data["category"]]);
    }
    public function getAll()
    {
        $sql = "SELECT * FROM products";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getAllByPage($page)
    {
        $sql = "SELECT * FROM products WHERE id >= :mini AND id <= :maxi AND active = 1 AND stock >= 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':mini' => ($page-1)*50, ':maxi' => ($page)*50] );
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getQuant()
    {
        $sql = "SELECT COUNT(1) AS quant FROM products";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["quant"];
    }

    public function getAllRandom()
    {
        $sql = "SELECT * FROM products WHERE active = 1 AND stock >= 1 ORDER BY rand()";
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getInfo($id)
    {
        $sql = 'SELECT name, descr, image_url, stock, price FROM products WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getStock($id)
    {
        $sql = 'SELECT stock FROM products WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
    }

    public function updatename($id, $name)
    {
        $sql = "UPDATE products SET name = :name WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':name' => $name, ':id' => $id]);
    }
    public function updatedescr($id, $descr)
    {
        $sql = 'UPDATE products SET descr = :descr WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':descr'=> $descr, ':id'=> $id]);
    }
    public function updateprice($id, $price){
        $sql = 'UPDATE products SET price = :price WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':price'=> $price, ':id'=> $id]);
    }
    public function updatestock($id, $stock){
        $sql = 'UPDATE products SET stock = :stock WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':stock'=> $stock, ':id'=> $id]);
    }
    public function updatecategory($id, $category_id){
        $sql = 'UPDATE products SET category_id = :category_id WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':category_id'=> $category_id, ':id'=> $id]);
    }
    public function updateimage($id, $path)
    {
        $sql = "UPDATE products SET image_url = :path WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':path' => $path, ':id' => $id]);
    }
    public function deactivate($id)
    {
        $sql = "UPDATE products SET active = 0 WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
    }
    public function activate($id)
    {
        $sql = "UPDATE products SET active = 1 WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
    }
    public function delete($id, $porsilasdudas = false)
    {
        if ($porsilasdudas) {
            $sql2 = "SELECT product_id FROM items_orders WHERE product_id = :id";
            $stmt2 = $this->db->prepare($sql2);
            $stmt2->execute([':id' => $id]);
            $quant = $stmt2->fetchAll(PDO::FETCH_ASSOC);
            if (count($quant) == 0) {
                $sql = "DELETE FROM products WHERE id = :id";
                $stmt = $this->db->prepare($sql);
                $stmt->execute([':id' => $id]);
                return 'success';
            } else {
                $this->deactivate($id);
                return 'using';
            }
        }
    }
}
