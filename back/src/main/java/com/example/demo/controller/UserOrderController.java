package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.example.demo.model.UserOrder;
import com.example.demo.repository.UserOrderRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/orders")
public class UserOrderController {

    @Autowired
    private UserOrderRepository orderRepository;

    @GetMapping
    public List<UserOrder> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserOrder> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(order -> ResponseEntity.ok(order))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/account")
    public ResponseEntity<List<UserOrder>> getOrderByUserId(@CookieValue(value = "userId") Long userId) {
        List<UserOrder> orders =  orderRepository.findByUserAccountId(userId);
        return ResponseEntity.ok(orders);
    }

    @PostMapping
    public ResponseEntity<UserOrder> createOrder(@RequestBody UserOrder order) {
        try {
            UserOrder savedOrder = orderRepository.save(order);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserOrder> updateOrder(@PathVariable Long id, @RequestBody UserOrder orderDetails) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setComments(orderDetails.getComments());
                    order.setSent(orderDetails.getSent());
                    UserOrder updateOrder = orderRepository.save(order);
                    return ResponseEntity.ok(updateOrder);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteOrder(@PathVariable Long id) {
        return orderRepository.findById(id).map(order -> {
            orderRepository.delete(order);
            return ResponseEntity.noContent().build();
        }).orElse(ResponseEntity.notFound().build());
    }

}
