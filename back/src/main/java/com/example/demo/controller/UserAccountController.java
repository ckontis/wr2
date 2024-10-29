package com.example.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/users")
public class UserAccountController {

    @Autowired
    private UserAccountRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // @Autowired
    // private ReviewRepository reviewRepository;

    // @Autowired
    // private UserOrderRepository orderRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CartRepository cartRepository;

    @GetMapping
    public List<UserAccount> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAccount> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public ResponseEntity<UserAccount> createUser(@RequestBody UserAccount user) {
        try {
            UserAccount savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAccount> updateUser(@PathVariable Long id, @RequestBody UserAccount userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(userDetails.getUsername());
                    user.setFirstName(userDetails.getFirstName());
                    user.setLastName(userDetails.getLastName());
                    user.setFavorites(userDetails.getFavorites());
                    UserAccount updatedUser = userRepository.save(user);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
    // return userRepository.findById(id).map(user -> {

    // for (Review review : user.getReviews()) {
    // review.setUser(null);
    // reviewRepository.save(review);
    // }
    // for (UserOrder order : user.getOrders()) {
    // order.setUserAccount(null);
    // orderRepository.save(order);
    // }

    // Cart cart = user.getCart();
    // cart.setProducts(null);
    // cartRepository.delete(cart);
    // user.setFavorites(null);

    // userRepository.save(user);
    // userRepository.delete(user);
    // return ResponseEntity.noContent().build();
    // }).orElse(ResponseEntity.notFound().build());
    // }

    // Favorites

    @GetMapping("/favorites")
    public ResponseEntity<?> getFavoritesByUser(@CookieValue(value = "userId") Long userId) {
        return userRepository.findById(userId)
                .map(user -> ResponseEntity.ok(user.getFavorites()))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/favorites/add/{productId}")
    public ResponseEntity<?> addFavorite(@PathVariable Long productId,
            @CookieValue(value = "userId") Long userId) {

        UserAccount user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        user.getFavorites().add(product);
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/favorites/remove/{productId}")
    public ResponseEntity<?> removeFavorite(@CookieValue(value = "userId") Long userId,
            @PathVariable Long productId) {
        UserAccount user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        user.getFavorites().remove(product);
        userRepository.save(user);
        return ResponseEntity.ok().build();

    }

    // Login & Register

    @PostMapping("/register")
    public ResponseEntity<UserAccount> registerUser(@RequestBody Map<String, String> userData) {

        String username = userData.get("username");
        String password = userData.get("password");
        String email = userData.get("email");
        String firstName = userData.get("firstName");
        String lastName = userData.get("lastName");

        // if (userRepository.findByUsername(username).isPresent()) {
        // return ResponseEntity.status(400).body("User already exists");
        // }

        UserAccount newUser = new UserAccount();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEmail(email);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setRole("user");
        userRepository.save(newUser);

        Cart newCart = new Cart();
        newCart.setUserAccount(newUser);
        cartRepository.save(newCart);

        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> userData, HttpServletResponse response) {

        String username = userData.get("username");
        String password = userData.get("password");

        Optional<UserAccount> user = userRepository.findByUsername(username);

        if (user.isPresent() && passwordEncoder.matches(password,
                user.get().getPassword())) {
            Cookie authCookie = new Cookie("userId", user.get().getId().toString());
            authCookie.setPath("/");
            authCookie.setMaxAge(3600);
            response.addCookie(authCookie);

            return ResponseEntity.ok(user.get().getId().toString());
        } else {
            return ResponseEntity.status(401).body("Something went wrong");
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutrUser(HttpServletResponse response) {

        Cookie authCookie = new Cookie("userId", null);
        authCookie.setPath("/");
        authCookie.setMaxAge(0);
        response.addCookie(authCookie);

        return ResponseEntity.ok("Logout Successfull");

    }

}
