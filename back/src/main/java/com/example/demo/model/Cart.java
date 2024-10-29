package com.example.demo.model;

import java.util.Set;

import jakarta.persistence.*;
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    

    @OneToOne
    @JoinColumn(name = "user_account_id")
    private UserAccount userAccount;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "cart_products", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> products;

    public Cart() {
    }

    public Cart(Long id, UserAccount userAccount, Set<Product> products) {
        this.id = id;
        this.userAccount = userAccount;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public double getTotalPrice(Set<Product> products){
        return products.stream().mapToDouble(product -> {
            if (product.getSalePrice()>0 ){
                return product.getPrice() - (product.getSalePrice()*product.getPrice() / 100); 
            } else {
                return product.getPrice();
            }
        }).sum();
    }
}
