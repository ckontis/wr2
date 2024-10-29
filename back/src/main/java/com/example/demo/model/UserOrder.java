package com.example.demo.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class UserOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double totalPrice;
    private Double salePrice;
    private String comments;
    private Boolean sent;

    @ManyToOne
    @JoinColumn(name = "user_account_id", nullable = true)
    private UserAccount userAccount;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "order_products", joinColumns = @JoinColumn(name = "user_order_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> products;

    public UserOrder() {
    }

    public UserOrder(Long id, Double totalPrice, Double salePrice, String comments, Boolean sent,
            UserAccount userAccount, Set<Product> products) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.salePrice = salePrice;
        this.comments = comments;
        this.sent = sent;
        this.userAccount = userAccount;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Double salePrice) {
        this.salePrice = salePrice;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Boolean getSent() {
        return sent;
    }

    public void setSent(Boolean sent) {
        this.sent = sent;
    }

    public String getUserAccount() {
        return userAccount.getUsername();
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

}
