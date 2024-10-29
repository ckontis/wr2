package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.*;
import com.example.demo.repository.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/products")
public class ProductController {

    // @Autowired
    // private UserOrderRepository orderRepository;

    // @Autowired
    // private ReviewRepository reviewRepository;
    // @Autowired
    // private UserAccountRepository userAccountRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/genre/{genre}")
    public List<Product> getProductByGenre(@PathVariable String genre) {
        return productRepository.findByGenre(genre);
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> ResponseEntity.ok(product))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Map<String, String> productDetails) {
        try {
            Product product = new Product();
            product.setProductName(productDetails.get("productName"));
            product.setPrice(Double.parseDouble(productDetails.get("price")));
            product.setSalePrice(Integer.parseInt(productDetails.get("salePrice")));
            product.setStock(Integer.parseInt(productDetails.get("stock")));
            product.setCategory(productDetails.get("category"));
            product.setImage(productDetails.get("image"));
            product.setGenre(productDetails.get("genre"));
            product.setDescription(productDetails.get("description"));
            productRepository.save(product);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setProductName(productDetails.getProductName());
                    product.setPrice(productDetails.getPrice());
                    product.setSalePrice(productDetails.getSalePrice());
                    product.setStock(productDetails.getStock());
                    product.setDescription(productDetails.getDescription());
                    Product updateProduct = productRepository.save(product);
                    return ResponseEntity.ok(updateProduct);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Object> deleteProduct(@PathVariable Long id) {
    // return productRepository.findById(id).map(product -> {

    // for (Review review : product.getReviews()) {
    // reviewRepository.delete(review);
    // }
    // for (UserOrder order : product.getUserOrders()) {
    // order.getProducts().removeAll(getAllProducts());
    // orderRepository.save(order);
    // orderRepository.delete(order);
    // }
    // for (UserAccount user : product.getUserAccount()) {
    // user.getFavorites().remove(product);
    // // user.getCart().remove(product);
    // userAccountRepository.save(user);
    // }

    // productRepository.save(product);
    // productRepository.delete(product);
    // return ResponseEntity.noContent().build();
    // }).orElse(ResponseEntity.notFound().build());
    // }
}
