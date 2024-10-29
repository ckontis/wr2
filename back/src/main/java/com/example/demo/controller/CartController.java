package com.example.demo.controller;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Cart;
import com.example.demo.model.Product;
import com.example.demo.model.UserAccount;
import com.example.demo.model.UserOrder;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserOrderRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/cart")
public class CartController {

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private UserOrderRepository orderRepository;

        @Autowired
        private CartRepository cartRepository;

        // @GetMapping
        // public ResponseEntity<?> getCartByUser(@CookieValue(value = "userId") Long
        // userId) {
        // return cartRepository.findById(userId)
        // .map(cart -> ResponseEntity.ok(cart.getProducts()))
        // .orElse(ResponseEntity.notFound().build());
        // }

        @GetMapping
        public ResponseEntity<?> getCartByUserId(@CookieValue(value = "userId") Long userId) {
                Cart cart = cartRepository.findByUserAccountId(userId);
                return ResponseEntity.ok(cart.getProducts());
        }

        @PostMapping("/add/{productId}")
        public ResponseEntity<Cart> addProductToCart(@PathVariable Long productId,
                        @CookieValue(value = "userId") Long userId) {

                Cart cart = cartRepository.findByUserAccountId(userId);
                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new RuntimeException("Product not found"));

                cart.getProducts().add(product);
                cartRepository.save(cart);
                return ResponseEntity.ok().build();
        }

        @DeleteMapping("/remove/{productId}")
        public ResponseEntity<UserAccount> removeFavorite(@CookieValue(value = "userId") Long userId,
                        @PathVariable Long productId) {
                Cart cart = cartRepository.findByUserAccountId(userId);
                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new RuntimeException("Product not found"));

                cart.getProducts().remove(product);
                cartRepository.save(cart);
                return ResponseEntity.ok().build();

        }

        @PostMapping("/checkout")
        public ResponseEntity<Cart> checkout(@CookieValue(value = "userId") Long userId) {
                Cart cart = cartRepository.findByUserAccountId(userId);
                UserOrder order = new UserOrder();

                order.setUserAccount(cart.getUserAccount());

                order.setTotalPrice(cart.getTotalPrice(cart.getProducts()));
                order.setProducts(new HashSet<>(cart.getProducts()));

                cart.getProducts().stream().forEach((product) -> product.setStock(product.getStock() - 1));

                orderRepository.save(order);
                cart.getProducts().clear();
                cartRepository.save(cart);

                return ResponseEntity.ok().build();
        }

}
