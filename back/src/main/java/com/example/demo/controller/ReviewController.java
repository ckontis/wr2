package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Product;
import com.example.demo.model.Review;
import com.example.demo.model.UserAccount;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserAccountRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/reviews")
public class ReviewController {

        @Autowired
        private UserAccountRepository userRepository;

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private ReviewRepository reviewRepository;

        @GetMapping("/product/{id}")
        public ResponseEntity<?> getReviews(@PathVariable Long id) {
                return productRepository.findById(id)
                                .map(product -> ResponseEntity.ok(product.getReviews()))
                                .orElse(ResponseEntity.notFound().build());
        }

        @PostMapping("/add-review")
        public ResponseEntity<?> addReview(@RequestBody Map<String, String> review,
                        @CookieValue(value = "userId") Long userId) {

                Long productId = Long.parseLong(review.get("id"));
                String comments = review.get("comments");
                double stars = Double.parseDouble(review.get("review"));

                UserAccount user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));
                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new RuntimeException("Product not found"));
                Review newReview = new Review();
                newReview.setUser(user);
                newReview.setProduct(product);
                newReview.setComments(comments);
                newReview.setStars(stars);
                reviewRepository.save(newReview);

                return ResponseEntity.ok("Review added");
        }
}
