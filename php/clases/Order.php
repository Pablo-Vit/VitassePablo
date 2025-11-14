<?php
require_once "Database.php";
require_once "Product.php";
class Order
{
    private $db;
    public function __construct()
    {
        $this->db = (new Database())->connect();
    }
    public function add($userid, $products){
        $sql = "INSERT INTO `orders`(`user_id`, `state`, `created_at`) VALUES (:user, 'pending', NOW())";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':user' => $userid]);
        $order_id = $this->db->lastInsertId();
        foreach($products as $product){
            $sql = "INSERT INTO `items_orders`(`product_id`, `order_id`, `cant`, `price`) VALUES (:product, :order, :quantity, (SELECT price FROM products WHERE id = :product))";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':order' => $order_id, ':product' => $product['id'], ':quantity' => $product['quantity']]);
        }
    }
    public function updateState($id, $state){
        $sql = "UPDATE orders SET state = :state WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':state' => $state, ':id' => $id]);
        if ($state === "approved") {
            $prods = $this->getProducts($id);
            $product = new Product();
            foreach ($prods as $prod) {
                $sql_item = "UPDATE items_orders SET real_quant = :quant WHERE order_id = :o_id AND product_id = :p_id";
                $stmt_item = $this->db->prepare($sql_item);
                $sql_stock = "UPDATE products SET stock = :stock WHERE id = :id";
                $stmt_stock = $this->db->prepare($sql_stock);
                $stock = $product->getStock($prod["id"])["stock"];
                if ($stock-$prod["cant"] <= 0) {
                    $stmt_item->execute([':quant' => $stock, ':o_id' => $id, ':p_id' => $prod["id"]]);
                    $stmt_stock->execute([':stock' => 0, ':id' => $prod["id"]]);
                } else if ($stock-$prod["cant"] >= 1) {
                    $stmt_item->execute([':quant' => $prod["cant"], ':o_id' => $id, ':p_id' => $prod["id"]]);
                    $stmt_stock->execute([':stock' => $stock-$prod["cant"], ':id' => $prod["id"]]);
                }
            }
        }
    }
    public function getPrice($id){
        $sql = "SELECT SUM(price * cant) as total FROM items_orders WHERE order_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["total"];
    }
    public function getInfo($id)
    {
        $sql = 'SELECT * FROM orders WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getAll(){
        $sql = 'SELECT * FROM orders';
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getAllByUser($id){
        $sql = 'SELECT id, state, created_at, user_id FROM orders WHERE user_id = :id ORDER BY created_at DESC';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id'=> $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getAllByState($state){
        $sql = 'SELECT id, state, created_at, user_id FROM orders WHERE state = :state ORDER BY created_at ASC';
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':state'=> $state]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function getProducts($id){
        $sql = "SELECT p.id, p.name, p.descr, p.image_url, io.cant, io.real_quant, io.price FROM products p JOIN items_orders io ON p.id = io.product_id WHERE io.order_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':id' => $id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
