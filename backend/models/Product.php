<?php
require_once '../config/database.php';

class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $description;
    public $price;
    public $image;
    public $category;
    public $featured;
    public $active;
    public $rating;
    public $reviews_count;
    public $created_at;
    public $updated_at;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // Buscar todos os produtos
    public function getAll($limit = null, $offset = null) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE active = 1 ORDER BY created_at DESC";
        
        if ($limit) {
            $query .= " LIMIT " . $limit;
            if ($offset) {
                $query .= " OFFSET " . $offset;
            }
        }

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    // Buscar produto por ID
    public function getById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id AND active = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        return $stmt->fetch();
    }

    // Buscar produtos por categoria
    public function getByCategory($category) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE category = :category AND active = 1 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":category", $category);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    // Buscar produtos em destaque
    public function getFeatured() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE featured = 1 AND active = 1 ORDER BY created_at DESC LIMIT 6";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    // Buscar produtos por termo de pesquisa
    public function search($term) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE (name LIKE :term OR description LIKE :term) AND active = 1 
                  ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $searchTerm = "%" . $term . "%";
        $stmt->bindParam(":term", $searchTerm);
        $stmt->execute();

        return $stmt->fetchAll();
    }

    // Criar novo produto
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (name, description, price, image, category, featured, active, rating, reviews_count) 
                  VALUES (:name, :description, :price, :image, :category, :featured, :active, :rating, :reviews_count)";

        $stmt = $this->conn->prepare($query);

        // Limpar e sanitizar dados
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->price = floatval($this->price);
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->featured = intval($this->featured);
        $this->active = intval($this->active);
        $this->rating = floatval($this->rating);
        $this->reviews_count = intval($this->reviews_count);

        // Bind dos parâmetros
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":featured", $this->featured);
        $stmt->bindParam(":active", $this->active);
        $stmt->bindParam(":rating", $this->rating);
        $stmt->bindParam(":reviews_count", $this->reviews_count);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }

        return false;
    }

    // Atualizar produto
    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET name = :name, description = :description, price = :price, 
                      image = :image, category = :category, featured = :featured, 
                      active = :active, rating = :rating, reviews_count = :reviews_count,
                      updated_at = NOW()
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Limpar e sanitizar dados
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->price = floatval($this->price);
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->featured = intval($this->featured);
        $this->active = intval($this->active);
        $this->rating = floatval($this->rating);
        $this->reviews_count = intval($this->reviews_count);

        // Bind dos parâmetros
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":image", $this->image);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":featured", $this->featured);
        $stmt->bindParam(":active", $this->active);
        $stmt->bindParam(":rating", $this->rating);
        $stmt->bindParam(":reviews_count", $this->reviews_count);

        return $stmt->execute();
    }

    // Deletar produto (soft delete)
    public function delete($id) {
        $query = "UPDATE " . $this->table_name . " SET active = 0 WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    // Atualizar rating do produto
    public function updateRating($id, $rating, $reviews_count) {
        $query = "UPDATE " . $this->table_name . " 
                  SET rating = :rating, reviews_count = :reviews_count, updated_at = NOW()
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":rating", $rating);
        $stmt->bindParam(":reviews_count", $reviews_count);

        return $stmt->execute();
    }
}
?>












